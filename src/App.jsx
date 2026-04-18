import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HeroCard from './components/HeroCard';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AllProjects from './components/AllProjects';
import Certificates from './components/Certificates';
import AllCertificates from './components/AllCertificates';
import Academics from './components/Academics';
import Hackathons from './components/Hackathons';
import Contact from './components/Contact';
import Logo from './components/Logo';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import { motion } from 'framer-motion';
import './App.css';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [isLoading, location.state]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative cursor-none">
      <CustomCursor />
      <CanvasBackground />

      {/* ── Loading Screen ── */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-2"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <Logo />

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <li><span onClick={() => handleNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">About</span></li>
          <li><span onClick={() => handleNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">Projects</span></li>
          <li><span onClick={() => handleNavigate('skills')} className="hover:text-white transition-colors cursor-pointer">Skills</span></li>
          <li><span onClick={() => handleNavigate('certificates')} className="hover:text-white transition-colors cursor-pointer">Certificates</span></li>
          <li><span onClick={() => handleNavigate('hackathons')} className="hover:text-white transition-colors cursor-pointer">Hackathons</span></li>
          <li><span onClick={() => handleNavigate('academics')} className="hover:text-white transition-colors cursor-pointer">Academics</span></li>
          <li><span onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
        </ul>

        <Link
          to="https://drive.google.com/file/d/1tBm9eV-b0_5wTDLnC8z89lylPLmqVRTs/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium px-5 py-2 rounded-md transition-colors"
          style={{ background: '#fff', color: '#000' }}
        >
          Resume
        </Link>
      </nav>

      {/* ── Main Content ── */}
      <main
        className="relative z-10 pt-28 pb-0 px-4 md:px-16 max-w-[1200px] mx-auto space-y-12"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <section id="hero">
          <HeroCard />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="certificates">
          <Certificates />
        </section>

        <section id="hackathons">
          <Hackathons />
        </section>

        <section id="academics">
          <Academics />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="text-center py-8 mt-6 mb-0 text-gray-600 text-sm border-t border-white/5"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        © 2026 Tapan. All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<AllProjects />} />
      <Route path="/certificates" element={<AllCertificates />} />
    </Routes>
  );
}

export default App;
