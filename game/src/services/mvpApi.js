const DEFAULT_MVP = 'http://127.0.0.1:8080';

let snapshotCache = null;

export async function loadSnapshot() {
  if (snapshotCache) return snapshotCache;
  const res = await fetch('./snapshots/demo-run.json');
  snapshotCache = await res.json();
  return snapshotCache;
}

export function getMvpBase() {
  if (typeof window === 'undefined') return DEFAULT_MVP;
  const params = new URLSearchParams(window.location.search);
  return params.get('mvp') || DEFAULT_MVP;
}

export async function detectMode() {
  const base = getMvpBase();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1200);
    const res = await fetch(`${base}/health`, { signal: ctrl.signal });
    clearTimeout(t);
    if (res.ok) return { mode: 'live-local', base };
  } catch {
    /* static fallback */
  }
  return { mode: 'static-demo', base: null };
}

async function tryFetch(path, options) {
  const { mode, base } = await detectMode();
  if (mode !== 'live-local' || !base) return null;
  try {
    const res = await fetch(`${base}${path}`, options);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function runStageAction(stageKey) {
  const snap = await loadSnapshot();

  switch (stageKey) {
    case 'wallet':
      return { proof: { type: 'identity', status: 'connected' } };
    case 'green':
      return {
        proof: {
          mwh: 12.5,
          rec: 'REC-HK-2026-0042',
          iot_hash: '0x' + 'a'.repeat(64),
        },
      };
    case 'compute':
      return { proof: { kwh_in: 12500, gpu_hours: 48, ratio: '260.4 kWh/GPU-h' } };
    case 'token': {
      const live = await tryFetch('/agent/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_name: 'record_compute_revenue',
          parameters: { asset_id: 'compute-token-aicomp-001', amount: 500 },
        }),
      });
      const task = live ?? snap.compute_revenue_task;
      return {
        proof: task,
        tx_hash: task?.related_tx_hashes?.[0] ?? snap.compute_power_asset?.chain_tx_hash,
        evidence_hash: task?.evidence_hash,
      };
    }
    case 'vault': {
      const oracle = await tryFetch('/oracle/attestations');
      const custody = await tryFetch('/custody/wallets');
      return {
        proof: {
          layers: ['audit', 'oracle', 'custody', 'legal', 'chain'],
          oracle_count: oracle?.length ?? snap.institutional_controls.oracle_attestations,
          custody_wallets: custody?.length ?? snap.institutional_controls.custody_wallets,
          evidence_hash: snap.compute_revenue_task.evidence_hash,
        },
      };
    }
    case 'legal':
      return {
        proof: {
          jurisdiction: 'Hong Kong',
          licensed_institutions: snap.institutional_controls.licensed_institutions,
          kyc_profiles: snap.institutional_controls.kyc_aml_profiles,
          status: 'approved',
        },
      };
    case 'finance': {
      const sub = await tryFetch('/agent/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_name: 'subscribe_fund_share',
          parameters: { fund_id: 'esg-fund-001', amount: 1000 },
        }),
      });
      const inv = await tryFetch('/agent/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_name: 'invest_portfolio_equity',
          parameters: { portfolio_id: 'green-reit-001', amount: 500 },
        }),
      });
      return {
        proof: {
          fund_task: sub ?? snap.fund_subscribe_task,
          portfolio_task: inv ?? snap.portfolio_invest_task,
        },
        tx_hash: sub?.related_tx_hashes?.[0] ?? snap.fund_subscribe_task?.related_tx_hashes?.[0],
      };
    }
    case 'badge':
      return {
        proof: {
          badge: 'SecureYield RWA Passport',
          receipt_id: `SY-${Date.now().toString(36).toUpperCase()}`,
        },
      };
    default:
      return { proof: {} };
  }
}
