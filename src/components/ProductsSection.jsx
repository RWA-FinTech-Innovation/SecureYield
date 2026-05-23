import { useRef, useState } from 'react';

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);

  const products = [
    {
      stage: 'STAGE 1: BUILD',
      name: 'Green AI Compute Bond',
      desc: 'Foundation-grade RWA for institutional anchors. Amortizing structure with predictable 8–12% APY from verified AI revenue streams.',
      features: [
        'Monthly distributions',
        ' Principal-protected tranches',
        'Institutional AML/KYC'
      ],
      token: 'FundShareToken',
      stats: [
        { key: 'Tenor', val: '3–5 years' },
        { key: 'Yield', val: '8–12% APY' },
        { key: 'Minimum', val: '$1M USD' }
      ]
    },
    {
      stage: 'STAGE 2: GROW',
      name: 'ESG AI PE Fund',
      desc: 'Co-investment vehicle with portfolio diversification across green AI operators. Aims for 15–20% IRR over 5–7 years.',
      features: [
        'Portfolio co-investment',
        'Governance rights',
        'Impact reporting'
      ],
      token: 'PortfolioEquityRWA',
      stats: [
        { key: 'Target IRR', val: '15–20%' },
        { key: 'Hold Period', val: '5–7 years' },
        { key: 'Minimum', val: '$5M USD' }
      ]
    },
    {
      stage: 'STAGE 3: SCALE',
      name: 'Green AI Compute REIT',
      desc: 'Perpetual yield vehicle tracking global green data center compute capacity. Transparent NAV with quarterly dividend.',
      features: [
        'Quarterly distributions',
        'Secondary market trading',
        'Real-time NAV'
      ],
      token: 'ComputePowerToken',
      stats: [
        { key: 'Distribution', val: '6–8% DPY' },
        { key: 'Duration', val: 'Perpetual' },
        { key: 'Minimum', val: '$100K USD' }
      ]
    }
  ];

  const current = products[activeTab];

  const setTab = (idx) => {
    setActiveTab(idx);
    tabRefs.current[idx]?.focus?.();
  };

  return (
    <section id="products" className="section section--dark">
      <div className="container">
        <div className="section-header reveal">
          <span className="kicker">ESG Financial Products</span>
          <h2>Three Tokenized RWA Instruments</h2>
          <p>Meet your investors where they are — from foundations to PE funds to REIT portfolios.</p>
        </div>

        <div
          className="tab-nav reveal"
          role="tablist"
          aria-label="Products"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') setTab((activeTab + 1) % products.length);
            if (e.key === 'ArrowLeft') setTab((activeTab - 1 + products.length) % products.length);
            if (e.key === 'Home') setTab(0);
            if (e.key === 'End') setTab(products.length - 1);
          }}
        >
          {products.map((p, idx) => (
            <button 
              key={idx}
              className={`tab-btn ${activeTab === idx ? 'tab-btn--active' : ''}`}
              ref={(el) => { tabRefs.current[idx] = el; }}
              role="tab"
              aria-selected={activeTab === idx}
              tabIndex={activeTab === idx ? 0 : -1}
              onClick={() => setTab(idx)}
            >
              <span className="tab-btn__stage">{p.stage}</span>
              {p.name.split(' ').slice(0, 3).join(' ')}
            </button>
          ))}
        </div>

        <div className="product-detail reveal">
          <div key={activeTab} className="product-detail__grid">
            <div>
              <span className="product-stage">{current.stage}</span>
              <h3>{current.name}</h3>
              <p>{current.desc}</p>
              <ul className="product-features">
                {current.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="product-token">Token: <code>{current.token}</code></div>
            </div>
            <div className="product-visual">
              <div className="product-visual__label">Key Terms</div>
              <div className="product-stat-row">
                {current.stats.map((s, i) => (
                  <div key={i} className="product-stat">
                    <span className="product-stat__key">{s.key}</span>
                    <span className="product-stat__val product-stat__val--accent">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
