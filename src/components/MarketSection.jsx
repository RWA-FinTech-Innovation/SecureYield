import React from 'react';

const MarketSection = () => {
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
            <div key={idx} className="market-pillar reveal">
              <div className="market-pillar__stat">{pillar.stat}</div>
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
