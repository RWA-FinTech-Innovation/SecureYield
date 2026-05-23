import { STAGES } from '../data/quests.js';

export default function GatePanel({
  stage,
  cleared,
  nearGate,
  busy,
  lastProof,
  onInteract,
  onGateFocus,
  gatePositions,
}) {
  const current = STAGES[stage];

  return (
    <div className="quest-panel quest-panel--gate">
      <h2 className="quest-panel__title">Current Gate</h2>
      {current && (
        <div className="quest-gate-card" style={{ borderColor: current.color }}>
          <h3>{current.title}</h3>
          <p>{current.business}</p>
          <button type="button" className="quest-btn quest-btn--primary quest-btn--wide" onClick={onInteract} disabled={busy}>
            {busy ? 'Processing…' : current.action}
          </button>
        </div>
      )}

      <h3 className="quest-panel__subtitle">Quest sites (maze)</h3>
      <p className="quest-panel__hint">Glowing labels = quest buildings on grass. Brown cottages are decoys.</p>
      <ul className="quest-gate-list">
        {Object.entries(gatePositions)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([id, pos]) => {
            const sid = Number(id);
            const s = STAGES[sid];
            const done = cleared.includes(sid);
            const active = stage === sid;
            const locked = sid > stage && !done;
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`quest-gate-link ${active ? 'quest-gate-link--active' : ''} ${done ? 'quest-gate-link--done' : ''}`}
                  onClick={() => !locked && onGateFocus(sid)}
                  disabled={locked}
                >
                  <span style={{ color: s.color }}>{pos.label}</span>
                  {s.short}
                  {nearGate === sid && <em>near</em>}
                </button>
              </li>
            );
          })}
      </ul>

      {lastProof?.tx_hash && (
        <div className="quest-proof">
          <span>tx</span>
          <code>{truncate(lastProof.tx_hash)}</code>
        </div>
      )}
      {lastProof?.evidence_hash && (
        <div className="quest-proof">
          <span>evidence</span>
          <code>{truncate(lastProof.evidence_hash)}</code>
        </div>
      )}
    </div>
  );
}

function truncate(h) {
  if (!h || h.length < 16) return h;
  return `${h.slice(0, 10)}…${h.slice(-6)}`;
}
