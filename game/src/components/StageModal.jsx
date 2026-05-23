import { STAGES } from '../data/quests.js';

export default function StageModal({ type, stage, proof, onClose }) {
  const isBadge = type === 'badge';
  if (!stage) return null;

  return (
    <div className="quest-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="quest-modal"
        role="dialog"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {isBadge ? (
          <>
            <div className="quest-badge">🏅</div>
            <h2 id="modal-title">RWA Passport Issued</h2>
            <p>You completed the SecureYield Quest — green power to tokenized yield.</p>
            {proof?.proof?.receipt_id && (
              <code className="quest-receipt">{proof.proof.receipt_id}</code>
            )}
          </>
        ) : (
          <>
            <h2 id="modal-title">Stage Clear!</h2>
            <p style={{ color: stage?.color }}>{stage?.title}</p>
            <p className="quest-modal__biz">{stage?.business}</p>
            {proof?.tx_hash && (
              <p className="quest-modal__tx">
                Tx: <code>{proof.tx_hash}</code>
              </p>
            )}
            {stage.id < STAGES.length - 1 && (
              <p className="quest-modal__next">
                Next: <strong>{STAGES[stage.id + 1]?.title}</strong>
              </p>
            )}
          </>
        )}
        <button type="button" className="quest-btn quest-btn--primary" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
