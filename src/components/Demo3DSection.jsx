const Demo3DSection = () => {
  const demoUrl = `${import.meta.env.BASE_URL}3d-demo/index.html`;

  return (
    <section id="demo-3d" className="section section--dark demo3d-section">
      <div className="container reveal" style={{ paddingBottom: '1rem' }}>
        <div className="section-header">
          <span className="kicker">3D Experience</span>
          <h2>RWA Pipeline · 3D Demo</h2>
          <p>Explore the tokenization journey in a low-poly 3D scene — green power, compute, evidence, and finance gates.</p>
        </div>
      </div>
      <div className="demo3d-bleed reveal">
        <div className="demo3d-bleed__stage">
          <iframe
            title="SecureYield 3D Demo"
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

export default Demo3DSection;
