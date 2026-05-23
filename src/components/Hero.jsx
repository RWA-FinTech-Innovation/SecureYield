import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reducedMotion) return;

    let rafId = null;
    const handleMove = (e) => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty('--mx', String((x - 0.5) * 2));
        el.style.setProperty('--my', String((y - 0.5) * 2));
      });
    };

    const handleLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
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
          <rect x="70" y="145" width="22" height="40" fill="url(#skyGrad)"/>
          <rect x="95" y="120" width="18" height="65" fill="url(#skyGrad)"/>
          <rect x="117" y="140" width="30" height="45" fill="url(#skyGrad)"/>
          <rect x="150" y="128" width="25" height="57" fill="url(#skyGrad)"/>
          <rect x="178" y="150" width="40" height="35" fill="url(#skyGrad)"/>
          <rect x="230" y="118" width="22" height="67" fill="url(#skyGrad)"/>
          <rect x="255" y="130" width="35" height="55" fill="url(#skyGrad)"/>
          <rect x="293" y="108" width="20" height="77" fill="url(#skyGrad)"/>
          <rect x="236" y="125" width="4" height="5" fill="rgba(169,240,15,0.35)"/>
          <rect x="261" y="138" width="4" height="5" fill="rgba(169,240,15,0.25)"/>
          <rect x="296" y="118" width="4" height="5" fill="rgba(169,240,15,0.3)"/>
          <rect x="325" y="138" width="55" height="47" fill="url(#skyGrad)"/>
          <path d="M 330 138 Q 352 118 374 138" fill="url(#skyGrad)"/>
          <rect x="385" y="148" width="40" height="37" fill="url(#skyGrad)"/>
          <rect x="428" y="130" width="25" height="55" fill="url(#skyGrad)"/>
          <rect x="490" y="20" width="36" height="165" fill="url(#skyGrad)"/>
          <rect x="485" y="60" width="46" height="20" fill="url(#skyGrad)"/>
          <rect x="487" y="100" width="42" height="8" fill="url(#skyGrad)"/>
          <rect x="500" y="28" width="4" height="6" fill="rgba(169,240,15,0.45)"/>
          <rect x="510" y="42" width="4" height="6" fill="rgba(169,240,15,0.3)"/>
          <rect x="500" y="70" width="4" height="5" fill="rgba(169,240,15,0.35)"/>
          <rect x="514" y="80" width="4" height="5" fill="rgba(169,240,15,0.2)"/>
          <rect x="545" y="100" width="30" height="85" fill="url(#skyGrad)"/>
          <rect x="578" y="118" width="22" height="67" fill="url(#skyGrad)"/>
          <rect x="603" y="90" width="28" height="95" fill="url(#skyGrad)"/>
          <rect x="554" y="106" width="4" height="5" fill="rgba(169,240,15,0.3)"/>
          <rect x="608" y="98" width="4" height="5" fill="rgba(169,240,15,0.25)"/>
          <rect x="650" y="55" width="32" height="130" fill="url(#skyGrad)"/>
          <rect x="690" y="38" width="36" height="147" fill="url(#skyGrad)"/>
          <rect x="646" y="80" width="40" height="14" fill="url(#skyGrad)"/>
          <rect x="660" y="62" width="4" height="6" fill="rgba(169,240,15,0.4)"/>
          <rect x="670" y="75" width="4" height="6" fill="rgba(169,240,15,0.3)"/>
          <rect x="698" y="46" width="4" height="6" fill="rgba(169,240,15,0.45)"/>
          <rect x="710" y="60" width="4" height="6" fill="rgba(169,240,15,0.2)"/>
          <rect x="735" y="88" width="28" height="97" fill="url(#skyGrad)"/>
          <rect x="766" y="72" width="24" height="113" fill="url(#skyGrad)"/>
          <rect x="793" y="102" width="35" height="83" fill="url(#skyGrad)"/>
          <rect x="831" y="118" width="22" height="67" fill="url(#skyGrad)"/>
          <rect x="771" y="78" width="4" height="5" fill="rgba(169,240,15,0.35)"/>
          <rect x="800" y="108" width="4" height="5" fill="rgba(169,240,15,0.25)"/>
          <rect x="865" y="128" width="40" height="57" fill="url(#skyGrad)"/>
          <rect x="908" y="108" width="28" height="77" fill="url(#skyGrad)"/>
          <rect x="939" y="120" width="35" height="65" fill="url(#skyGrad)"/>
          <rect x="977" y="138" width="25" height="47" fill="url(#skyGrad)"/>
          <rect x="912" y="115" width="4" height="5" fill="rgba(169,240,15,0.3)"/>
          <rect x="1010" y="135" width="30" height="50" fill="url(#skyGrad)"/>
          <rect x="1043" y="118" width="22" height="67" fill="url(#skyGrad)"/>
          <rect x="1068" y="145" width="40" height="40" fill="url(#skyGrad)"/>
          <rect x="1111" y="130" width="25" height="55" fill="url(#skyGrad)"/>
          <rect x="1139" y="148" width="18" height="37" fill="url(#skyGrad)"/>
          <rect x="1165" y="155" width="35" height="30" fill="url(#skyGrad)"/>
          <rect x="1203" y="145" width="28" height="40" fill="url(#skyGrad)"/>
          <rect x="1234" y="158" width="40" height="27" fill="url(#skyGrad)"/>
          <rect x="1277" y="150" width="25" height="35" fill="url(#skyGrad)"/>
          <rect x="1305" y="160" width="35" height="25" fill="url(#skyGrad)"/>
          <rect x="1343" y="155" width="30" height="30" fill="url(#skyGrad)"/>
          <rect x="1376" y="162" width="64" height="23" fill="url(#skyGrad)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
