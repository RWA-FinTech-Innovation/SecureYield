export function hasEthereum() {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

export async function connectWallet() {
  if (!hasEthereum()) {
    return { ok: false, error: 'No MetaMask — static demo continues without wallet.' };
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts?.[0] ?? null;
    return { ok: true, address };
  } catch (err) {
    return { ok: false, error: err?.message ?? 'Wallet connection rejected' };
  }
}

export async function signIntent(message) {
  if (!hasEthereum()) {
    return { ok: false, mock: true, signature: `0xdemo${hashString(message).slice(0, 40)}` };
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    const sig = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });
    return { ok: true, signature: sig, address };
  } catch (err) {
    return { ok: false, error: err?.message ?? 'Sign rejected', mock: true, signature: `0xdemo${hashString(message).slice(0, 40)}` };
  }
}

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(16).padStart(8, '0');
}

export function shortAddress(addr) {
  if (!addr) return '—';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
