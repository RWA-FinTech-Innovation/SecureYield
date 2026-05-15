import React from 'react';

const ComplianceSection = () => {
  const jurisdictions = [
    {
      flag: 'MAINLAND',
      flagClass: 'jurisdiction-card--cn',
      name: 'Mainland China',
      desc: 'Asset origin & verification. Green power meters & GPU telemetry.'
    },
    {
      flag: 'HONG KONG',
      flagClass: 'jurisdiction-card--hk',
      name: 'Hong Kong',
      desc: 'SPV issuer & primary regulator. SFC-regulated fund manager.'
    },
    {
      flag: 'GLOBAL',
      flagClass: 'jurisdiction-card--int',
      name: 'International',
      desc: 'Investor base & secondary markets. Cross-border fund operations.'
    }
  ];

  return (
    <section id="compliance" className="section section--dark">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Regulatory Framework</span>
          <h2>Three-Jurisdiction Compliance Model</h2>
          <p>Compliant at every layer: asset, issuer, and investor jurisdiction.</p>
        </div>

        <div className="compliance-layout reveal">
          <div>
            <svg className="waterfall-diagram" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="160" height="40" fill="rgba(169,240,15,0.1)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="100" y="47" textAnchor="middle" fill="#A9F00F" fontSize="12" fontWeight="bold">Revenue In</text>
              
              <line x1="100" y1="60" x2="100" y2="75" stroke="#A9F00F" strokeWidth="1" opacity="0.5"/>
              
              <rect x="30" y="75" width="140" height="35" fill="rgba(169,240,15,0.08)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="100" y="98" textAnchor="middle" fill="#A9F00F" fontSize="11">Fees & Reserves</text>
              
              <line x1="100" y1="110" x2="100" y2="125" stroke="#A9F00F" strokeWidth="1" opacity="0.5"/>
              
              <rect x="40" y="125" width="120" height="35" fill="rgba(169,240,15,0.06)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="100" y="148" textAnchor="middle" fill="#A9F00F" fontSize="11">To Investors</text>
            </svg>
          </div>

          <div>
            <div className="jurisdiction-grid">
              {jurisdictions.map((j, idx) => (
                <div key={idx} className={`jurisdiction-card ${j.flagClass}`}>
                  <div className="jurisdiction-card__flag">{j.flag}</div>
                  <h3>{j.name}</h3>
                  <p>{j.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Key Compliances</h3>
              <div className="compliance-bar">
                <span className="compliance-check">SFC Type 9</span>
                <span className="compliance-check">HKMA RWA</span>
                <span className="compliance-check">AML/CTF</span>
                <span className="compliance-check">TCSP Audit</span>
                <span className="compliance-check">DvP Settlement</span>
                <span className="compliance-check">ESG Disclosure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
