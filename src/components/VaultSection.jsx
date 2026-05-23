import { useState } from 'react';

const VaultSection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const vaults = [
    { num: '1', title: 'GPUMeterRegistry', desc: 'Immutable device & workload log', tags: 'Hardware Layer' },
    { num: '2', title: 'RevenueStatement', desc: 'Verified AI compute earnings', tags: 'Financial Data' },
    { num: '3', title: 'AuditTrail', desc: 'Compliance snapshot (daily)', tags: 'Regulatory' },
    { num: '4', title: 'ZK Commitment', desc: 'Zero-knowledge ownership proof', tags: 'Privacy' },
    { num: '5', title: 'BoundaryProof', desc: 'Energy certification & ESG claim', tags: 'Environmental' }
  ];

  return (
    <section id="evidence-vault" className="section section--secondary">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Evidence Vault</span>
          <h2>Five Ledgers of Immutable Truth</h2>
          <p>Every transaction, every device, every revenue event — locked and auditable forever.</p>
        </div>
        <div className={`vault-grid ${activeIdx != null ? 'vault-grid--focused' : ''}`}>
          {vaults.map((vault, idx) => (
            <div
              key={idx}
              className={`vault-card reveal ${activeIdx === idx ? 'vault-card--active' : ''} ${activeIdx != null && activeIdx !== idx ? 'vault-card--dim' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={activeIdx === idx}
              onClick={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx((prev) => (prev === idx ? null : idx));
              }}
            >
              <div className="vault-card__num">{vault.num}</div>
              <h3>{vault.title}</h3>
              <p>{vault.desc}</p>
              <div className="vault-card__tags">{vault.tags}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VaultSection;
