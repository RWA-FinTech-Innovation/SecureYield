import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'hero',
      'flash',
      'demo-3d',
      'quest-demo',
      'problem',
      'market',
      'how-it-works',
      'architecture',
      'evidence-vault',
      'products',
      'technology',
      'compliance'
    ];

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner container">
        <a href="#hero" className="nav__brand" onClick={() => handleNavClick('hero')}>
          <div className="nav__mark">SY</div>
          <span className="nav__name">SecureYield</span>
        </a>
        <ul className={`nav__links ${isMenuOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#flash" className={activeSection === 'flash' ? 'active' : ''} onClick={() => handleNavClick('flash')}>Flash Video</a></li>
          <li><a href="#demo-3d" className={activeSection === 'demo-3d' ? 'active' : ''} onClick={() => handleNavClick('demo-3d')}>3D Demo</a></li>
          <li><a href="#quest-demo" className={activeSection === 'quest-demo' ? 'active' : ''} onClick={() => handleNavClick('quest-demo')}>Quest Game</a></li>
          <li><a href="#problem" className={activeSection === 'problem' ? 'active' : ''} onClick={() => handleNavClick('problem')}>Problem</a></li>
          <li><a href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => handleNavClick('how-it-works')}>How It Works</a></li>
          <li><a href="#products" className={activeSection === 'products' ? 'active' : ''} onClick={() => handleNavClick('products')}>Products</a></li>
          <li><a href="#technology" className={activeSection === 'technology' ? 'active' : ''} onClick={() => handleNavClick('technology')}>Technology</a></li>
          <li><a href="#compliance" className={activeSection === 'compliance' ? 'active' : ''} onClick={() => handleNavClick('compliance')}>Compliance</a></li>
        </ul>
        <a href="https://github.com/RWA-FinTech-Innovation/Tokenization" target="_blank" rel="noopener"
           className="btn btn--outline nav__cta" style={{ padding:'0.55rem 1.1rem',fontSize:'0.8rem'}}>
          <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <button className="nav__hamburger" id="hamburger" aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
