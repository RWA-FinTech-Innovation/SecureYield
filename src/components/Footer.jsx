import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="nav__mark">SY</div>
            <span>SecureYield</span>
          </div>
          <div className="footer__links">
            <a href="#how-it-works">How It Works</a>
            <a href="#architecture">Architecture</a>
            <a href="#products">Products</a>
            <a href="https://github.com/RWA-FinTech-Innovation/Tokenization" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>

        <div className="footer__disclaimer">
          SecureYield is an open-source RWA tokenization framework designed to bridge verified green computing infrastructure with institutional capital markets via Hong Kong's regulated framework. This website is for informational purposes only and does not constitute financial advice, an offer to sell, or a solicitation to buy any securities. Regulatory approval pending.
        </div>

        <div className="footer__bottom">
          <span>© 2024 SecureYield Protocol. All rights reserved.</span>
          <span>Built for ESG finance | Designed in Hong Kong | Open source</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
