import { useEffect, useMemo, useRef, useState } from 'react';

const parseStat = (rawStat) => {
  const stat = String(rawStat ?? '').trim();
  const match = stat.match(/^(\$)?\s*([\d.]+)\s*([A-Za-z])?\s*(%)?$/);
  if (!match) return null;

  const prefix = match[1] ?? '';
  const numberPart = match[2];
  const unit = match[4] ? '%' : (match[3] ?? '');
  const value = Number.parseFloat(numberPart);
  if (!Number.isFinite(value)) return null;

  const dotIndex = numberPart.indexOf('.');
  const decimals = dotIndex >= 0 ? numberPart.length - dotIndex - 1 : 0;
  return { prefix, value, unit, decimals };
};

const AnimatedStat = ({ value }) => {
  const containerRef = useRef(null);
  const parsed = useMemo(() => parseStat(value), [value]);
  const [current, setCurrent] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !parsed) return;

    if (hasAnimatedRef.current) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reducedMotion) {
      hasAnimatedRef.current = true;
      requestAnimationFrame(() => setCurrent(parsed.value));
      return;
    }

    let rafId = null;
    const durationMs = 1100;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = parsed.value * eased;
        setCurrent(next);
        if (t < 1) rafId = requestAnimationFrame(tick);
        else setCurrent(parsed.value);
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAnimation();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [parsed]);

  if (!parsed) return <span>{value}</span>;

  const formatted =
    parsed.decimals > 0
      ? current.toFixed(parsed.decimals)
      : Math.round(current).toString();

  return (
    <span ref={containerRef}>
      {parsed.prefix}
      {formatted}
      {parsed.unit}
    </span>
  );
};

const MarketSection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const pillars = [
    { stat: '$2.7T', title: 'ESG Assets AUM', desc: 'Global sustainable investment opportunity' },
    { stat: '31%', title: 'CAGR Projection', desc: 'Green AI infrastructure growth rate' },
    { stat: '85%', title: 'Institutional Demand', desc: 'Seeking tokenized RWA alternatives' },
    { stat: '$148B', title: 'Hong Kong Tech Inflow', desc: 'Annual capital into green fintech' }
  ];

  return (
    <section id="market" className="section section--dark">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">Market Opportunity</span>
          <h2>A $2.7 Trillion Market Waiting for Digital Infrastructure</h2>
        </div>
        <div className="market-pillars">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`market-pillar reveal ${activeIdx === idx ? 'market-pillar--active' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={activeIdx === idx}
              onClick={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx((prev) => (prev === idx ? null : idx));
              }}
            >
              <div className="market-pillar__stat">
                <AnimatedStat value={pillar.stat} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
