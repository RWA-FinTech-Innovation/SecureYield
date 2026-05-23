import { hasEthereum } from '../services/wallet.js';
import { shortAddress } from '../services/wallet.js';

export default function WalletPanel({ wallet, onConnect, busy }) {
  const mm = hasEthereum();

  return (
    <div className="quest-panel">
      <h2 className="quest-panel__title">Wallet</h2>
      {wallet.connected ? (
        <div className="quest-wallet quest-wallet--on">
          <span className="quest-wallet__status">● Connected</span>
          <code>{shortAddress(wallet.address)}</code>
        </div>
      ) : (
        <div className="quest-wallet">
          <span className="quest-wallet__status quest-wallet__status--off">
            {mm ? '○ Not connected' : '◇ Demo mode (no MetaMask)'}
          </span>
          <button type="button" className="quest-btn quest-btn--primary" onClick={onConnect} disabled={busy}>
            Connect Wallet
          </button>
        </div>
      )}
      <p className="quest-panel__hint">
        Stage 0 uses <code>eth_requestAccounts</code> + <code>personal_sign</code> when available.
      </p>
    </div>
  );
}
