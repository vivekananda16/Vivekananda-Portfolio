import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy loading heavy components
const Global3DEnvironment = React.lazy(() => import('./components/Global3DEnvironment'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const DevLab = React.lazy(() => import('./components/DevLab'));
const QALab = React.lazy(() => import('./components/QALab'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// A simple fallback component
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--primary)', background: 'var(--bg)' }}>
    <div className="spinner"></div>
    <style>{`
      .spinner { border: 4px solid rgba(255,255,255,0.1); width: 50px; height: 50px; border-radius: 50%; border-left-color: var(--primary); animation: spin 1s linear infinite; }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Suspense fallback={<Loader />}>
        <Global3DEnvironment />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <DevLab />
        <QALab />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;