export default function AssetBar({ assets }) {
  const items = [
    { key: 'mwh', label: 'MWh', icon: '⚡' },
    { key: 'rec', label: 'REC', icon: '🌿' },
    { key: 'gpuHours', label: 'GPU-h', icon: '🖥' },
    { key: 'computeToken', label: 'Compute', icon: '⬡' },
    { key: 'rwaToken', label: 'RWA', icon: '◆' },
  ];

  return (
    <div className="quest-assets">
      {items.map(({ key, label, icon }) => (
        <div key={key} className="quest-asset">
          <span className="quest-asset__icon">{icon}</span>
          <span className="quest-asset__label">{label}</span>
          <strong>{formatAsset(assets[key], key)}</strong>
        </div>
      ))}
    </div>
  );
}

function formatAsset(v, key) {
  if (key === 'rec') return v > 0 ? `${v} cert` : '—';
  if (v === 0 || v == null) return '—';
  return Number.isInteger(v) ? v : v.toFixed(1);
}
