import { useCallback, useEffect, useRef, useState } from 'react';
import { STAGES, INITIAL_ASSETS, STAGE_ASSET_DELTAS } from '../data/quests.js';
import { connectWallet, signIntent } from '../services/wallet.js';
import { detectMode, runStageAction } from '../services/mvpApi.js';

export function useQuestState() {
  const [stage, setStage] = useState(0);
  const [cleared, setCleared] = useState([]);
  const [assets, setAssets] = useState({ ...INITIAL_ASSETS });
  const [wallet, setWallet] = useState({ address: null, connected: false });
  const [mode, setMode] = useState('static-demo');
  const [busy, setBusy] = useState(false);
  const [lastProof, setLastProof] = useState(null);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // 'clear' | 'badge' | null
  const [lastClearedStageId, setLastClearedStageId] = useState(null);
  const autoRef = useRef(null);

  useEffect(() => {
    detectMode().then(({ mode: m }) => setMode(m));
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, []);

  const applyAssetDelta = useCallback((stageId) => {
    const delta = STAGE_ASSET_DELTAS[stageId];
    if (!delta) return;
    setAssets((a) => {
      const next = { ...a };
      for (const [k, v] of Object.entries(delta)) {
        next[k] = (next[k] ?? 0) + v;
      }
      return next;
    });
  }, []);

  const completeStage = useCallback(
    async (stageId, opts = {}) => {
      const s = STAGES[stageId];
      if (!s || busy) return false;
      if (stageId > stage && !opts.force) return false;

      setBusy(true);
      try {
        if (stageId === 0) {
          const res = await connectWallet();
          if (res.ok) {
            setWallet({ address: res.address, connected: true });
            await signIntent(`SecureYield Quest — Connect Wallet\nStage: 0`);
          } else if (!opts.silent) {
            showToast(res.error);
            setWallet({ address: '0xDemo…Player', connected: false });
          }
        } else {
          const msg = `SecureYield Quest — ${s.title}\nStage: ${stageId}`;
          await signIntent(msg);
        }

        const result = await runStageAction(s.key);
        setLastProof(result);
        applyAssetDelta(stageId);

        setCleared((c) => (c.includes(stageId) ? c : [...c, stageId]));
        setLastClearedStageId(stageId);
        const next = Math.min(stageId + 1, STAGES.length - 1);
        setStage(next);

        if (stageId === STAGES.length - 1) {
          setModal('badge');
        } else {
          setModal('clear');
        }
        return true;
      } finally {
        setBusy(false);
      }
    },
    [stage, busy, applyAssetDelta, showToast],
  );

  const interact = useCallback(
    async (gateStageId) => {
      const target = gateStageId ?? stage;
      if (target !== stage) {
        if (target > stage) showToast('Complete earlier gates first.');
        else showToast('This gate is already cleared.');
        return false;
      }
      return completeStage(target);
    },
    [stage, completeStage, showToast],
  );

  const runAutoDemo = useCallback(async () => {
    if (autoRef.current) return;
    autoRef.current = true;
    showToast('Auto demo started (~90s)');
    const teleport = window.__questTeleport;
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      teleport?.(i);
      await new Promise((r) => setTimeout(r, 400));
      await completeStage(i, { force: true, silent: true });
      setModal(null);
      await new Promise((r) => setTimeout(r, 1100));
    }
    setModal('badge');
    autoRef.current = false;
    showToast('Quest complete — RWA Passport issued!');
  }, [completeStage, showToast]);

  const dismissModal = useCallback(() => setModal(null), []);

  const stopAutoDemo = useCallback(() => {
    autoRef.current = false;
  }, []);

  const resetQuest = useCallback(() => {
    stopAutoDemo();
    setBusy(false);
    setStage(0);
    setCleared([]);
    setAssets({ ...INITIAL_ASSETS });
    setWallet({ address: null, connected: false });
    setModal(null);
    setLastProof(null);
    setLastClearedStageId(null);
  }, [stopAutoDemo]);

  const replayQuest = useCallback(() => {
    if (busy) return;
    resetQuest();
    showToast('Quest reset — play again from the entrance.');
  }, [busy, resetQuest, showToast]);

  const questProgress = Math.min(100, Math.round((cleared.length / STAGES.length) * 100));

  return {
    stage,
    cleared,
    assets,
    wallet,
    mode,
    busy,
    lastProof,
    toast,
    modal,
    lastClearedStageId,
    questProgress,
    currentStage: STAGES[stage],
    stages: STAGES,
    completeStage,
    interact,
    runAutoDemo,
    dismissModal,
    showToast,
    setStage,
    replayQuest,
  };
}
