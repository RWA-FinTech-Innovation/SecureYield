import { useState } from 'react';

const TechnologySection = () => {
  const [hoverKey, setHoverKey] = useState(null);
  const [pinKey, setPinKey] = useState(null);
  const activeKey = pinKey ?? hoverKey;

  const isActive = (key) => activeKey === key;
  const handleActivate = (key) => {
    setPinKey((prev) => (prev === key ? null : key));
  };

  const nodeStroke = (key) => (isActive(key) ? 'rgba(169,240,15,0.85)' : 'rgba(169,240,15,0.35)');
  const nodeFill = (key) => (isActive(key) ? 'rgba(2,35,73,0.92)' : 'rgba(2,35,73,0.8)');
  const linkStroke = (key) => (isActive(key) ? 'rgba(169,240,15,0.85)' : 'rgba(169,240,15,0.35)');

  return (
    <section id="technology" className="section section--secondary">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Open Source Technology</span>
          <h2>AI Agent-Native Architecture</h2>
          <p>External participants submit objectives and authorisation signals. Internal agents handle all execution — identity verification, policy checks, token operations, and audit recording.</p>
        </div>

        <div className="tech-layout">
          <div className="reveal">
            <svg className="agent-diagram" viewBox="0 0 500 370" xmlns="http://www.w3.org/2000/svg" aria-label="AI Agent Architecture">
              <defs>
                <marker id="arrow-tech" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="rgba(169,240,15,0.6)"/>
                </marker>
              </defs>

              <rect x="160" y="14" width="180" height="52" rx="8" fill="rgba(21,32,37,0.9)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="250" y="36" textAnchor="middle" fill="#F0F4F1" fontFamily="Syne,sans-serif" fontSize="11" fontWeight="800">ORCHESTRATOR</text>
              <text x="250" y="53" textAnchor="middle" fill="rgba(240,244,241,0.5)" fontFamily="Syne,sans-serif" fontSize="9">Task parsing · Plan generation</text>

              <line x1="250" y1="66" x2="250" y2="92" stroke="rgba(169,240,15,0.4)" strokeWidth="1"/>
              <circle cx="250" cy="96" r="4" fill="rgba(169,240,15,0.35)" stroke="rgba(169,240,15,0.65)" strokeWidth="1"/>
              <line x1="68" y1="96" x2="432" y2="96" stroke="rgba(169,240,15,0.22)" strokeWidth="1"/>

              <line x1="68" y1="96" x2="68" y2="140" stroke={linkStroke('IDENTITY')} strokeWidth={isActive('IDENTITY') ? 1.5 : 1} markerEnd="url(#arrow-tech)"/>
              <line x1="189" y1="96" x2="189" y2="140" stroke={linkStroke('POLICY')} strokeWidth={isActive('POLICY') ? 1.5 : 1} markerEnd="url(#arrow-tech)"/>
              <line x1="311" y1="96" x2="311" y2="140" stroke={linkStroke('ASSET')} strokeWidth={isActive('ASSET') ? 1.5 : 1} markerEnd="url(#arrow-tech)"/>
              <line x1="432" y1="96" x2="432" y2="140" stroke={linkStroke('TRANSACTION')} strokeWidth={isActive('TRANSACTION') ? 1.5 : 1} markerEnd="url(#arrow-tech)"/>
              <line x1="250" y1="96" x2="250" y2="218" stroke={isActive('TOKENS') ? 'rgba(169,240,15,0.85)' : 'rgba(169,240,15,0.25)'} strokeWidth={isActive('TOKENS') ? 1.5 : 1} markerEnd="url(#arrow-tech)"/>

              <g
                tabIndex={0}
                role="button"
                aria-label="IDENTITY"
                onMouseEnter={() => setHoverKey('IDENTITY')}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey('IDENTITY')}
                onBlur={() => setHoverKey(null)}
                onClick={() => handleActivate('IDENTITY')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('IDENTITY');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="10" y="140" width="116" height="52" rx="8" fill={nodeFill('IDENTITY')} stroke={nodeStroke('IDENTITY')} strokeWidth={isActive('IDENTITY') ? 1.5 : 1}/>
                <text x="68" y="161" textAnchor="middle" fill="#A9F00F" fontFamily="Syne,sans-serif" fontSize="10" fontWeight="800">IDENTITY</text>
                <text x="68" y="178" textAnchor="middle" fill="rgba(240,244,241,0.5)" fontFamily="Syne,sans-serif" fontSize="8.5">KYC / AML verification</text>
              </g>

              <g
                tabIndex={0}
                role="button"
                aria-label="POLICY"
                onMouseEnter={() => setHoverKey('POLICY')}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey('POLICY')}
                onBlur={() => setHoverKey(null)}
                onClick={() => handleActivate('POLICY')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('POLICY');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="131" y="140" width="116" height="52" rx="8" fill={nodeFill('POLICY')} stroke={nodeStroke('POLICY')} strokeWidth={isActive('POLICY') ? 1.5 : 1}/>
                <text x="189" y="161" textAnchor="middle" fill="#A9F00F" fontFamily="Syne,sans-serif" fontSize="10" fontWeight="800">POLICY</text>
                <text x="189" y="178" textAnchor="middle" fill="rgba(240,244,241,0.5)" fontFamily="Syne,sans-serif" fontSize="8.5">Compliance rules · Risk</text>
              </g>

              <g
                tabIndex={0}
                role="button"
                aria-label="ASSET"
                onMouseEnter={() => setHoverKey('ASSET')}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey('ASSET')}
                onBlur={() => setHoverKey(null)}
                onClick={() => handleActivate('ASSET')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('ASSET');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="253" y="140" width="116" height="52" rx="8" fill={nodeFill('ASSET')} stroke={nodeStroke('ASSET')} strokeWidth={isActive('ASSET') ? 1.5 : 1}/>
                <text x="311" y="161" textAnchor="middle" fill="#A9F00F" fontFamily="Syne,sans-serif" fontSize="10" fontWeight="800">ASSET</text>
                <text x="311" y="178" textAnchor="middle" fill="rgba(240,244,241,0.5)" fontFamily="Syne,sans-serif" fontSize="8.5">Token issuance · Lifecycle</text>
              </g>

              <g
                tabIndex={0}
                role="button"
                aria-label="TRANSACTION"
                onMouseEnter={() => setHoverKey('TRANSACTION')}
                onMouseLeave={() => setHoverKey(null)}
                onFocus={() => setHoverKey('TRANSACTION')}
                onBlur={() => setHoverKey(null)}
                onClick={() => handleActivate('TRANSACTION')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleActivate('TRANSACTION');
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x="374" y="140" width="116" height="52" rx="8" fill={nodeFill('TRANSACTION')} stroke={nodeStroke('TRANSACTION')} strokeWidth={isActive('TRANSACTION') ? 1.5 : 1}/>
                <text x="432" y="161" textAnchor="middle" fill="#A9F00F" fontFamily="Syne,sans-serif" fontSize="10" fontWeight="800">TRANSACTION</text>
                <text x="432" y="178" textAnchor="middle" fill="rgba(240,244,241,0.5)" fontFamily="Syne,sans-serif" fontSize="8.5">Chain · Audit trail</text>
              </g>

              <text
                x="250"
                y="225"
                textAnchor="middle"
                fill={isActive('TOKENS') ? 'rgba(240,244,241,0.55)' : 'rgba(240,244,241,0.25)'}
                fontFamily="Syne,sans-serif"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.1em"
                onMouseEnter={() => setHoverKey('TOKENS')}
                onMouseLeave={() => setHoverKey(null)}
                onClick={() => handleActivate('TOKENS')}
                style={{ cursor: 'pointer' }}
              >
                TOKEN TYPES
              </text>
              <line x1="60" y1="220" x2="185" y2="220" stroke="rgba(240,244,241,0.1)" strokeWidth="1"/>
              <line x1="315" y1="220" x2="440" y2="220" stroke="rgba(240,244,241,0.1)" strokeWidth="1"/>

              <rect x="20" y="235" width="142" height="36" rx="18" fill={isActive('FundShareToken') ? 'rgba(169,240,15,0.14)' : 'rgba(169,240,15,0.08)'} stroke={isActive('FundShareToken') ? 'rgba(169,240,15,0.75)' : 'rgba(169,240,15,0.3)'} strokeWidth={isActive('FundShareToken') ? 1.25 : 1} onMouseEnter={() => setHoverKey('FundShareToken')} onMouseLeave={() => setHoverKey(null)} onClick={() => handleActivate('FundShareToken')} style={{ cursor: 'pointer' }}/>
              <text x="91" y="258" textAnchor="middle" fill="#A9F00F" fontFamily="monospace" fontSize="9.5">FundShareToken</text>

              <rect x="175" y="235" width="150" height="36" rx="18" fill={isActive('PortfolioEquityRWA') ? 'rgba(169,240,15,0.14)' : 'rgba(169,240,15,0.08)'} stroke={isActive('PortfolioEquityRWA') ? 'rgba(169,240,15,0.75)' : 'rgba(169,240,15,0.3)'} strokeWidth={isActive('PortfolioEquityRWA') ? 1.25 : 1} onMouseEnter={() => setHoverKey('PortfolioEquityRWA')} onMouseLeave={() => setHoverKey(null)} onClick={() => handleActivate('PortfolioEquityRWA')} style={{ cursor: 'pointer' }}/>
              <text x="250" y="258" textAnchor="middle" fill="#A9F00F" fontFamily="monospace" fontSize="9.5">PortfolioEquityRWA</text>

              <rect x="338" y="235" width="152" height="36" rx="18" fill={isActive('ComputePowerToken') ? 'rgba(169,240,15,0.14)' : 'rgba(169,240,15,0.08)'} stroke={isActive('ComputePowerToken') ? 'rgba(169,240,15,0.75)' : 'rgba(169,240,15,0.3)'} strokeWidth={isActive('ComputePowerToken') ? 1.25 : 1} onMouseEnter={() => setHoverKey('ComputePowerToken')} onMouseLeave={() => setHoverKey(null)} onClick={() => handleActivate('ComputePowerToken')} style={{ cursor: 'pointer' }}/>
              <text x="414" y="258" textAnchor="middle" fill="#A9F00F" fontFamily="monospace" fontSize="9.5">ComputePowerToken</text>

              <text x="250" y="310" textAnchor="middle" fill="rgba(240,244,241,0.3)" fontFamily="Syne,sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.08em">
                REST API · POST /agent/tasks · Python · SQLite · No dependencies
              </text>
            </svg>
          </div>

          <div className="tech-info reveal" data-delay="150">
            <div className="tech-block">
              <h3>Five Specialised Agents</h3>
              <ul className="agent-list">
                <li><span className="agent-pill">Orchestrator</span> Parses objectives, generates execution plans</li>
                <li><span className="agent-pill">Identity</span> KYC/AML and institution verification</li>
                <li><span className="agent-pill">Policy</span> Compliance rules and risk assessment</li>
                <li><span className="agent-pill">Asset</span> Token issuance and lifecycle management</li>
                <li><span className="agent-pill">Transaction</span> Chain adapter and immutable audit trail</li>
              </ul>
            </div>

            <div className="tech-block">
              <h3>Three Token Types</h3>
              <div className="token-pills">
                <span className="token-pill">FundShareToken</span>
                <span className="token-pill">PortfolioEquityRWA</span>
                <span className="token-pill">ComputePowerToken</span>
              </div>
            </div>

            <div className="tech-block">
              <h3>Stack</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Python backend · SQLite · No external dependencies · Runnable in one command. Solidity smart contracts for on-chain operations. Pluggable chain adapter — local mock or live HTTP.</p>
            </div>

            <div className="tech-cta">
              <a href="https://github.com/RWA-FinTech-Innovation/Tokenization" target="_blank" rel="noopener" className="btn btn--primary">
                <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub ↗
              </a>
              <p>Python backend · Zero dependencies · Runnable in 1 command</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
