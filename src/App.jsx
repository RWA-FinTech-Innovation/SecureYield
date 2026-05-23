import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import DemoGameSection from './components/DemoGameSection';
import ProblemSection from './components/ProblemSection';
import MarketSection from './components/MarketSection';
import ProcessSection from './components/ProcessSection';
import ArchitectureSection from './components/ArchitectureSection';
import VaultSection from './components/VaultSection';
import ProductsSection from './components/ProductsSection';
import TechnologySection from './components/TechnologySection';
import ComplianceSection from './components/ComplianceSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Reveal on scroll animation
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Number.parseInt(el.dataset.delay || '0', 10);
          window.setTimeout(() => {
            el.dataset.revealed = 'true';
          }, Number.isFinite(delay) ? delay : 0);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <VideoSection />
      <DemoGameSection />
      <ProblemSection />
      <MarketSection />
      <ProcessSection />
      <ArchitectureSection />
      <VaultSection />
      <ProductsSection />
      <TechnologySection />
      <ComplianceSection />
      <Footer />
    </>
  );
}

export default App;
