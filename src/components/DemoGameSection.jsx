const DemoGameSection = () => {
  const demoUrl = `${import.meta.env.BASE_URL}game/index.html`;

  return (
    <section id="quest-demo" className="section section--dark demo3d-section">
      <div className="container reveal" style={{ paddingBottom: '1rem' }}>
        <div className="section-header">
          <span className="kicker">Interactive Quest</span>
          <h2>Play the RWA Pipeline</h2>
          <p>
            A pixel-style quest map: connect wallet, collect green power proofs, mint compute tokens, open the evidence vault, pass HK legal, and subscribe to RWA — all in ~90 seconds with Auto Demo.
          </p>
        </div>
      </div>
      <div className="demo3d-bleed reveal">
        <div className="demo3d-bleed__stage">
          <iframe
            title="SecureYield Quest Game"
            className="demo3d-bleed__frame"
            src={demoUrl}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default DemoGameSection;
