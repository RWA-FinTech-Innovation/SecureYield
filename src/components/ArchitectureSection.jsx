import { useState } from 'react';

const ArchitectureSection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const layers = [
    {
      type: 'financial',
      tag: 'TIER 1',
      title: 'Financial Layer',
      desc: 'Distribution waterfall & ESG fund management',
      items: ['SFC Type 9', 'Fund Administration', 'Dividend Automation']
    },
    {
      type: 'legal',
      tag: 'TIER 2',
      title: 'Legal Layer',
      desc: 'Hong Kong SPV & HK MAS framework compliance',
      items: ['SPV Governance', 'RWA Framework', 'Smart Contract Audit']
    },
    {
      type: 'evidence',
      tag: 'TIER 3',
      title: 'Evidence Vault',
      desc: 'Ledger-locked audit trails & zero-knowledge proofs',
      items: ['Blockchain Ledger', 'ZK Proofs', 'Compliance Snapshot']
    },
    {
      type: 'asset',
      tag: 'TIER 4',
      title: 'Asset Layer',
      desc: 'Green power meters & AI GPU telemetry',
      items: ['IoT Meters', 'GPU Telemetry', 'Revenue Verification']
    }
  ];

  return (
    <section id="architecture" className="section section--dark">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Four-Layer Stack</span>
          <h2>Compliance-by-Design Architecture</h2>
          <p>Every layer is auditable, standardized, and integrated with Hong Kong's regulatory framework.</p>
        </div>
        <div className={`arch-layers ${activeIdx != null ? 'arch-layers--focused' : ''}`}>
          {layers.map((layer, idx) => (
            <div
              key={idx}
              className={`arch-layer arch-layer--${layer.type} reveal ${activeIdx === idx ? 'arch-layer--active' : ''} ${activeIdx != null && activeIdx !== idx ? 'arch-layer--dim' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={activeIdx === idx}
              onClick={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx((prev) => (prev === idx ? null : idx));
              }}
            >
              <div className="arch-layer__accent"></div>
              <div className="arch-layer__body">
                <div className="arch-layer__tag">{layer.tag}</div>
                <h3 className="arch-layer__title">{layer.title}</h3>
                <p className="arch-layer__desc">{layer.desc}</p>
                <div className="arch-layer__items">
                  {layer.items.map((item, i) => (
                    <span key={i} className="arch-item">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
