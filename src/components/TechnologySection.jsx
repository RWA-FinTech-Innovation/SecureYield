import React from 'react';

const TechnologySection = () => {
  return (
    <section id="technology" className="section section--secondary">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Technology Stack</span>
          <h2>AI Agents + Ledger-Based Compliance</h2>
        </div>

        <div className="tech-layout reveal">
          <div>
            <svg className="agent-diagram" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%">
                  <stop offset="0%" stopColor="rgba(169,240,15,0.1)"/>
                  <stop offset="100%" stopColor="rgba(169,240,15,0.02)"/>
                </linearGradient>
              </defs>
              <circle cx="200" cy="100" r="40" fill="url(#agentGrad)" stroke="#A9F00F" strokeWidth="2"/>
              <text x="200" y="108" textAnchor="middle" fill="#A9F00F" fontSize="12" fontWeight="bold">Orchestrator</text>
              
              <circle cx="80" cy="180" r="30" fill="url(#agentGrad)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="80" y="185" textAnchor="middle" fill="#A9F00F" fontSize="10">Identity</text>
              
              <circle cx="200" cy="220" r="30" fill="url(#agentGrad)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="200" y="225" textAnchor="middle" fill="#A9F00F" fontSize="10">Policy</text>
              
              <circle cx="320" cy="180" r="30" fill="url(#agentGrad)" stroke="#A9F00F" strokeWidth="1.5"/>
              <text x="320" y="185" textAnchor="middle" fill="#A9F00F" fontSize="10">Asset</text>
              
              <line x1="200" y1="140" x2="80" y2="160" stroke="#A9F00F" strokeWidth="1" opacity="0.5"/>
              <line x1="200" y1="140" x2="200" y2="190" stroke="#A9F00F" strokeWidth="1" opacity="0.5"/>
              <line x1="200" y1="140" x2="320" y2="160" stroke="#A9F00F" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>

          <div className="tech-info">
            <div className="tech-block">
              <h3>Five Autonomous Agents</h3>
              <ul className="agent-list">
                <li><span className="agent-pill">Orchestrator</span> Coordinates data flows & compliance rules</li>
                <li><span className="agent-pill">Identity</span> KYC/AML verification & sanctioning</li>
                <li><span className="agent-pill">Policy</span> Regulatory rule enforcement</li>
                <li><span className="agent-pill">Asset</span> Revenue tracking & verification</li>
                <li><span className="agent-pill">Transaction</span> Settlement & waterfall execution</li>
              </ul>
            </div>

            <div className="tech-block">
              <h3>Token Types</h3>
              <div className="token-pills">
                <span className="token-pill">FundShareToken</span>
                <span className="token-pill">PortfolioEquityRWA</span>
                <span className="token-pill">ComputePowerToken</span>
              </div>
            </div>

            <div className="tech-cta">
              <a href="https://github.com/RWA-FinTech-Innovation" target="_blank" rel="noopener" className="btn btn--outline">
                View GitHub Repository ↗
              </a>
              <p>Open-source reference implementation with zero external dependencies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
