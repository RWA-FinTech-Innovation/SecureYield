import React from 'react';

const ProcessSection = () => {
  const steps = [
    { num: '1', ico: '⚡', label: 'Green Power', desc: 'Verified renewable source' },
    { num: '2', ico: '🖥️', label: 'AI Compute', desc: 'GPU workload verified' },
    { num: '3', ico: '✓', label: 'Revenue Verified', desc: 'Audited cash flows' },
    { num: '4', ico: '📔', label: 'Evidence Vault', desc: 'Blockchain locked' },
    { num: '5', ico: '🏛️', label: 'HK SPV', desc: 'Regulated issuer' },
    { num: '6', ico: '🔗', label: 'RWA Tokens', desc: 'Digital securities' },
    { num: '7', ico: '💰', label: 'ESG Products', desc: 'Institutional ready' }
  ];

  return (
    <section id="how-it-works" className="section section--secondary">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Seven-Step Process</span>
          <h2>From Green Power to Compliant ESG RWA</h2>
          <p>Our proprietary system converts unmonetized green compute revenue into institutional-grade RWA products, with every step auditable and compliant.</p>
        </div>
        <div className="process-wrap reveal">
          <div className="process-flow">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="process-step__node">
                  <div className="process-step__num">STEP</div>
                  <div className="process-step__ico">{step.ico}</div>
                </div>
                <div className="process-step__label">{step.label}</div>
                <div className="process-step__desc">{step.desc}</div>
              </div>
            ))}
            <svg className="process-connector" viewBox="0 0 1000 2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="1000" y2="1" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
