import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__geo" aria-hidden="true">
        <div className="hero__grid"></div>
        <svg className="hero__tri" width="280" height="280" viewBox="0 0 280 280" fill="none">
          <polygon points="280,0 280,280 0,0" fill="rgba(169,240,15,0.03)" stroke="#A9F00F" strokeWidth="0.8" strokeOpacity="0.2"/>
          <polygon points="280,0 280,140 140,0" fill="rgba(169,240,15,0.04)"/>
        </svg>
      </div>

      <div className="hero__content">
        <div className="hero__badges reveal">
          <span className="badge">RWA</span>
          <span className="badge">Hong Kong Gateway</span>
          <span className="badge">Verified Yield</span>
          <span className="badge">ESG Finance</span>
        </div>
        <h1 className="hero__headline reveal">
          Green AI Compute Yield<br/>
          <em>RWA Tokenization</em>
        </h1>
        <p className="hero__sub reveal">
          SecureYield converts verified green AI compute revenue into compliant ESG RWA financial products — structured for institutional investors via Hong Kong's regulated framework.
        </p>
        <div className="hero__ctas reveal">
          <a href="#how-it-works" className="btn btn--primary">Explore the System</a>
          <a href="https://github.com/RWA-FinTech-Innovation/Tokenization" target="_blank" rel="noopener" className="btn btn--ghost">View Open Source Code ↗</a>
        </div>
      </div>

      <div className="hero__skyline" aria-hidden="true">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D1E24"/>
              <stop offset="100%" stopColor="#0a1518"/>
            </linearGradient>
          </defs>
          <rect x="0" y="185" width="1440" height="15" fill="#0a1518"/>
          <rect x="0" y="155" width="35" height="30" fill="url(#skyGrad)"/>
          <rect x="38" y="135" width="28" height="50" fill="url(#skyGrad)"/>
          <rect x="490" y="20" width="36" height="165" fill="url(#skyGrad)"/>
          <rect x="650" y="55" width="32" height="130" fill="url(#skyGrad)"/>
          <rect x="690" y="38" width="36" height="147" fill="url(#skyGrad)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;