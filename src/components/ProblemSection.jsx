import { useState } from 'react';

const ProblemSection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const problems = [
    {
      icon: '⚡',
      title: 'Electricity Can\'t Move Globally',
      desc: 'Green compute revenue is geographically trapped. Power contracts, GPU loads, and revenue streams remain inaccessible to international investors.'
    },
    {
      icon: '🔍',
      title: 'Cash Flow is Hard to Verify',
      desc: 'No institutional standard exists for auditing AI compute revenue. Assets remain unverified black boxes that sophisticated capital cannot underwrite.'
    },
    {
      icon: '🛡',
      title: 'Investors Need Protection & Exit',
      desc: 'Long lock-ups, opaque distributions, and no automated waterfall — traditional structures fail modern ESG investor mandates and liquidity requirements.'
    }
  ];

  return (
    <section id="problem" className="section section--secondary">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">The Problem</span>
          <h2>Real Green Infrastructure is Hard<br/>to Finance Globally</h2>
        </div>
        <div className="problem-grid">
          {problems.map((problem, idx) => (
            <article
              key={idx}
              className={`problem-card reveal ${activeIdx === idx ? 'problem-card--active' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={activeIdx === idx}
              onClick={() => setActiveIdx((prev) => (prev === idx ? null : idx))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx((prev) => (prev === idx ? null : idx));
              }}
            >
              <div className="problem-card__icon">{problem.icon}</div>
              <h3>{problem.title}</h3>
              <p>{problem.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
