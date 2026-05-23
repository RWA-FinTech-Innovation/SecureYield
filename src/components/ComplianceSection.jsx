import { useState } from 'react';

const ComplianceSection = () => {
  const [hoverStep, setHoverStep] = useState(null);
  const [pinStep, setPinStep] = useState(null);
  const activeStep = pinStep ?? hoverStep;

  const isActive = (step) => activeStep === step;
  const handleActivate = (step) => {
    setPinStep((prev) => (prev === step ? null : step));
  };

  const stepStroke = (step) => (isActive(step) ? 'rgba(169,240,15,0.85)' : 'rgba(169,240,15,0.35)');
  const stepStrokeWidth = (step, base = 1) => (isActive(step) ? base + 0.5 : base);
  const stepFill = (step, baseFill) => (isActive(step) ? baseFill.replace(/0\.\d+\)/, '0.95)') : baseFill);
  const linkStroke = (step) => (isActive(step) ? 'rgba(169,240,15,0.85)' : 'rgba(169,240,15,0.35)');

  const jurisdictions = [
    {
      flag: 'CN',
      flagClass: 'jurisdiction-card--cn',
      name: 'Mainland China',
      desc: 'Asset Layer — green electricity generation, AI GPU data centers, compute revenue. Raw data stays onshore; only proof crosses borders.'
    },
    {
      flag: 'HK',
      flagClass: 'jurisdiction-card--hk',
      name: 'Hong Kong',
      desc: 'Issuance Layer — SFC RWA framework, TCSP legal title, licensed custody, KYC/AML compliance, DvP settlement.'
    },
    {
      flag: 'INT',
      flagClass: 'jurisdiction-card--int',
      name: 'Global Markets',
      desc: 'Capital Layer — USD/HKD institutional capital, ESG mandates, automated waterfall distributions to global investors.'
    }
  ];

  return (
    <section id="compliance" className="section section--dark">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Compliance</span>
          <h2>Compliance-by-Design Operating Model</h2>
          <p>Every step in the distribution waterfall generates cryptographic proof. Compliance is not added after — it is the architecture.</p>
        </div>

        <div className="compliance-layout">
          <div>
            <svg className="waterfall-diagram reveal" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-label="Compliance operating model waterfall">
              <defs>
                <marker id="arrow-compliance" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="rgba(169,240,15,0.6)"/>
                </marker>
              </defs>

              <g
                tabIndex={0}
                role="button"
                aria-label="Asset Submission"
                onMouseEnter={() => setHoverStep('asset')}
                onMouseLeave={() => setHoverStep(null)}
                onFocus={() => setHoverStep('asset')}
                onBlur={() => setHoverStep(null)}
                onClick={() => handleActivate('asset')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('asset');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="10" y="10" width="240" height="44" rx="6" fill={stepFill('asset', 'rgba(2,35,73,0.9)')} stroke={stepStroke('asset')} strokeWidth={stepStrokeWidth('asset', 1.2)}/>
                <text x="130" y="37" textAnchor="middle" fill="#F0F4F1" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="700">Asset Submission</text>
              </g>

              <line x1="130" y1="54" x2="152" y2="82" stroke={linkStroke('revenue')} strokeWidth={isActive('revenue') ? 1.5 : 1} markerEnd="url(#arrow-compliance)"/>

              <g
                tabIndex={0}
                role="button"
                aria-label="Verified Revenue"
                onMouseEnter={() => setHoverStep('revenue')}
                onMouseLeave={() => setHoverStep(null)}
                onFocus={() => setHoverStep('revenue')}
                onBlur={() => setHoverStep(null)}
                onClick={() => handleActivate('revenue')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('revenue');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="32" y="86" width="240" height="44" rx="6" fill={stepFill('revenue', 'rgba(2,35,73,0.9)')} stroke={stepStroke('revenue')} strokeWidth={stepStrokeWidth('revenue', 1)}/>
                <text x="152" y="109" textAnchor="middle" fill="#F0F4F1" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="700">Verified Revenue</text>
                <text x="152" y="122" textAnchor="middle" fill="rgba(240,244,241,0.4)" fontFamily="Syne,sans-serif" fontSize="8.5">Green power evidence confirmed</text>
              </g>

              <line x1="152" y1="130" x2="174" y2="158" stroke={linkStroke('vault')} strokeWidth={isActive('vault') ? 1.5 : 1} markerEnd="url(#arrow-compliance)"/>

              <g
                tabIndex={0}
                role="button"
                aria-label="Evidence Vault"
                onMouseEnter={() => setHoverStep('vault')}
                onMouseLeave={() => setHoverStep(null)}
                onFocus={() => setHoverStep('vault')}
                onBlur={() => setHoverStep(null)}
                onClick={() => handleActivate('vault')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('vault');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="54" y="162" width="240" height="44" rx="6" fill={stepFill('vault', 'rgba(2,35,73,0.9)')} stroke={isActive('vault') ? 'rgba(169,240,15,0.85)' : 'rgba(109,145,33,0.5)'} strokeWidth={stepStrokeWidth('vault', 1)}/>
                <text x="174" y="185" textAnchor="middle" fill="#F0F4F1" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="700">Evidence Vault</text>
                <text x="174" y="198" textAnchor="middle" fill="rgba(240,244,241,0.4)" fontFamily="Syne,sans-serif" fontSize="8.5">Locked proof chain</text>
              </g>

              <line x1="174" y1="206" x2="196" y2="234" stroke={linkStroke('legal')} strokeWidth={isActive('legal') ? 1.5 : 1} markerEnd="url(#arrow-compliance)"/>

              <g
                tabIndex={0}
                role="button"
                aria-label="Legal Confirmation"
                onMouseEnter={() => setHoverStep('legal')}
                onMouseLeave={() => setHoverStep(null)}
                onFocus={() => setHoverStep('legal')}
                onBlur={() => setHoverStep(null)}
                onClick={() => handleActivate('legal')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('legal');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="76" y="238" width="240" height="44" rx="6" fill={stepFill('legal', 'rgba(2,35,73,0.9)')} stroke={isActive('legal') ? 'rgba(169,240,15,0.85)' : 'rgba(84,120,8,0.5)'} strokeWidth={stepStrokeWidth('legal', 1)}/>
                <text x="196" y="261" textAnchor="middle" fill="#F0F4F1" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="700">Legal Confirmation</text>
                <text x="196" y="274" textAnchor="middle" fill="rgba(240,244,241,0.4)" fontFamily="Syne,sans-serif" fontSize="8.5">SPV · custody · KYC</text>
              </g>

              <line x1="196" y1="282" x2="218" y2="310" stroke={linkStroke('investor')} strokeWidth={isActive('investor') ? 1.5 : 1} markerEnd="url(#arrow-compliance)"/>

              <g
                tabIndex={0}
                role="button"
                aria-label="Investor Distribution"
                onMouseEnter={() => setHoverStep('investor')}
                onMouseLeave={() => setHoverStep(null)}
                onFocus={() => setHoverStep('investor')}
                onBlur={() => setHoverStep(null)}
                onClick={() => handleActivate('investor')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('investor');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="98" y="314" width="212" height="44" rx="6" fill={isActive('investor') ? 'rgba(169,240,15,0.16)' : 'rgba(169,240,15,0.1)'} stroke="#A9F00F" strokeWidth={isActive('investor') ? 2 : 1.5}/>
                <text x="204" y="337" textAnchor="middle" fill="#A9F00F" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="800">Investor Distribution</text>
                <text x="204" y="350" textAnchor="middle" fill="rgba(169,240,15,0.6)" fontFamily="Syne,sans-serif" fontSize="8.5">NAV · audit · on-chain</text>
              </g>
            </svg>
          </div>

          <div>
            <div className="jurisdiction-grid reveal" data-delay="100">
              {jurisdictions.map((j, idx) => (
                <div key={idx} className={`jurisdiction-card ${j.flagClass}`}>
                  <div className="jurisdiction-card__flag">{j.flag}</div>
                  <h3>{j.name}</h3>
                  <p>{j.desc}</p>
                </div>
              ))}
            </div>

            <div className="compliance-bar reveal" data-delay="200" style={{ marginTop: '2rem' }}>
              <span className="compliance-check">SFC Type 9</span>
              <span className="compliance-check">HKMA RWA Framework</span>
              <span className="compliance-check">AML / CTF Compliant</span>
              <span className="compliance-check">TCSP Legal Title</span>
              <span className="compliance-check">DvP Settlement</span>
              <span className="compliance-check">ESG Disclosure (MWh · GPU-hour · PUE)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
