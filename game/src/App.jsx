import { useCallback, useEffect, useRef, useState } from 'react';
import { GameEngine } from './game/GameEngine.js';
import { GATE_POSITIONS } from './data/map.js';
import { STAGES } from './data/quests.js';
import { useQuestState } from './hooks/useQuestState.js';
import QuestLog from './components/QuestLog.jsx';
import WalletPanel from './components/WalletPanel.jsx';
import AssetBar from './components/AssetBar.jsx';
import GatePanel from './components/GatePanel.jsx';
import StageModal from './components/StageModal.jsx';

export default function App() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const quest = useQuestState();
  const questRef = useRef(quest);
  questRef.current = quest;
  const [nearGate, setNearGate] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine(canvas, {
      onProximity: setNearGate,
      onInteract: () => {
        const q = questRef.current;
        if (engine.isOnCurrentDoor()) {
          q.interact(q.stage);
          return;
        }
        if (engine.isNearDecoyHouse()) {
          q.showToast?.('Just a homestead — find the glowing quest site.');
          return;
        }
        const title = STAGES[q.stage]?.title;
        if (title) {
          q.showToast?.(`Leave the road — step on the grass doormat at ${title}`);
        }
      },
    });
    engineRef.current = engine;
    window.__questTeleport = (id) => engine.teleportToGate(id);
    engine.start();

    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(canvas.parentElement);

    return () => {
      ro.disconnect();
      delete window.__questTeleport;
      engine.destroy();
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setStage(quest.stage);
    engineRef.current?.setCleared(quest.cleared);
  }, [quest.stage, quest.cleared]);

  const handleGateClick = useCallback(
    (stageId) => {
      if (stageId !== quest.stage) return;
      quest.showToast('Navigate the maze — look for the glowing doormat on grass.');
    },
    [quest],
  );

  const handleInteract = useCallback(() => {
    quest.interact(quest.stage);
  }, [quest]);

  const handleReplay = useCallback(() => {
    quest.replayQuest();
    engineRef.current?.setStage(0);
    engineRef.current?.setCleared([]);
    engineRef.current?.teleportToSpawn();
  }, [quest]);

  const activeGate =
    nearGate != null && nearGate === quest.stage
      ? STAGES[nearGate]
      : quest.stage === 0
        ? STAGES[0]
        : null;

  return (
    <div className="quest-app">
      <header className="quest-header">
        <div className="quest-header__brand">
          <span className="quest-pixel">⬢</span>
          <div>
            <h1>SecureYield Quest</h1>
            <p>RWA pipeline · pixel demo</p>
          </div>
        </div>
        <div className="quest-header__actions">
          <span className={`quest-mode quest-mode--${quest.mode}`}>
            {quest.mode === 'live-local' ? '● Live MVP' : '◆ Static Demo'}
          </span>
          <button
            type="button"
            className="quest-btn quest-btn--nav"
            onClick={handleReplay}
            disabled={quest.busy}
            title="Reset progress and replay from maze entrance"
          >
            Replay
          </button>
          <button type="button" className="quest-btn quest-btn--ghost" onClick={quest.runAutoDemo} disabled={quest.busy}>
            Auto Demo (~90s)
          </button>
        </div>
      </header>

      <div className="quest-layout">
        <aside className="quest-sidebar quest-sidebar--left">
          <QuestLog
            stages={quest.stages}
            current={quest.stage}
            cleared={quest.cleared}
            progress={quest.questProgress}
          />
        </aside>

        <main className="quest-main">
          <div className="quest-canvas-wrap">
            <canvas ref={canvasRef} className="quest-canvas" aria-label="SecureYield quest map" />
            <div className="quest-hint">
              <kbd>WASD</kbd> on roads · step on <strong>grass doormat</strong> · <kbd>Space</kbd> check-in
              {activeGate && (
                <span className="quest-hint__gate">
                  Near: <strong>{activeGate.title}</strong>
                </span>
              )}
            </div>
          </div>
          <AssetBar assets={quest.assets} />
        </main>

        <aside className="quest-sidebar quest-sidebar--right">
          <WalletPanel wallet={quest.wallet} onConnect={() => quest.interact(0)} busy={quest.busy} />
          <GatePanel
            stage={quest.stage}
            cleared={quest.cleared}
            nearGate={nearGate}
            busy={quest.busy}
            lastProof={quest.lastProof}
            onInteract={handleInteract}
            onGateFocus={handleGateClick}
            gatePositions={GATE_POSITIONS}
          />
        </aside>
      </div>

      {quest.toast && <div className="quest-toast">{quest.toast}</div>}

      {quest.modal && (
        <StageModal
          type={quest.modal}
          stage={
            quest.lastClearedStageId != null
              ? STAGES[quest.lastClearedStageId]
              : quest.currentStage
          }
          proof={quest.lastProof}
          onClose={quest.dismissModal}
        />
      )}
    </div>
  );
}
