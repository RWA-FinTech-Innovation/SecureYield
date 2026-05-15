import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
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
          entry.target.classList.add('visible');
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
