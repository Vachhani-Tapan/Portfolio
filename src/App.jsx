import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import LoadingScreen from './components/LoadingScreen';
import HeroCard from './components/HeroCard';
import Logo from './components/Logo';
import CustomCursor from './components/CustomCursor';

// ── SEO Component ──
// ── SEO Component ──
const SEO = () => {
  const location = useLocation();
  const fullName = "Vachhani Tapan";
  const homeTagline = "MERN Stack Full Stack Developer - Portfolio";
  const siteUrl = "https://portfolio-tapan.vercel.app"; // Replace with your actual domain

  // Metadata Map
  const meta = {
    '/': {
      title: "Home",
      description: "Discover the portfolio of Vachhani Tapan, a Full Stack Developer & UI/UX Designer specialized in creating premium, high-performance web experiences."
    },
    '/skills': {
      title: "Skills",
      description: "Highly proficient in React, Node.js, GSAP, Framer Motion, and 3D web technologies for immersive interfaces."
    },
    '/projects': {
      title: "Projects",
      description: "A comprehensive collection of full-stack platforms, UI/UX designs, and interactive web games built by Vachhani Tapan."
    },
    '/certificates': {
      title: "Certificates",
      description: "Professional certifications, academic degrees, and upskilling milestones earned throughout my journey."
    },
    '/hackathons': {
      title: "Hackathons",
      description: "Explore my journey in competitive coding and innovation across multiple hackathons and tech events."
    },
    '/academics': {
      title: "Academics",
      description: "Education background, academic achievements, and continuous learning journey in Computer Science."
    },
    '/contact': {
      title: "Contact",
      description: "Let's build something extraordinary together. Connect with me via email or professional social channels."
    }
  };

  const currentMeta = meta[location.pathname] || meta['/'];
  const fullTitle = currentMeta.title === "Home" 
    ? `${fullName} - ${homeTagline}` 
    : `${fullName} | ${currentMeta.title}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={currentMeta.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${location.pathname}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${siteUrl}${location.pathname}`} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={currentMeta.description} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />
    </Helmet>
  );
};

const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const AllProjects = React.lazy(() => import('./components/AllProjects'));
const Certificates = React.lazy(() => import('./components/Certificates'));
const AllCertificates = React.lazy(() => import('./components/AllCertificates'));
const Academics = React.lazy(() => import('./components/Academics'));
const Hackathons = React.lazy(() => import('./components/Hackathons'));
const Contact = React.lazy(() => import('./components/Contact'));
const CanvasBackground = React.lazy(() => import('./components/CanvasBackground'));

import './App.css';

// ── Shared Navbar Component ──
function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-2"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
    >
      <Logo />

      <ul className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
        <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
        <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
        <li><Link to="/skills" className="hover:text-white transition-colors">Skills</Link></li>
        <li><Link to="/certificates" className="hover:text-white transition-colors">Certificates</Link></li>
        <li><Link to="/hackathons" className="hover:text-white transition-colors">Hackathons</Link></li>
        <li><Link to="/academics" className="hover:text-white transition-colors">Academics</Link></li>
        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
      </ul>

      <Link
        to="https://drive.google.com/file/d/1CsWIDnUxHA5ujMmmrh3b8-0_KC45N6-w/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold px-5 py-2 rounded-md transition-all duration-300 hover:scale-105"
        style={{ background: '#fff', color: '#000' }}
      >
        Resume
      </Link>
    </nav>
  );
}

// ── Shared Layout Component ──
function MainLayout({ children, isLoading, handleLoadingComplete }) {
  return (
    <div className="min-h-screen bg-black text-white relative cursor-none">
      <SEO />
      <CustomCursor />
      <React.Suspense fallback={null}>
        <CanvasBackground />
      </React.Suspense>

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <Navbar />

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
        }}
      >
        {children}

        <footer className="text-center py-2 mt-4 text-gray-600 text-xs border-t border-white/5 opacity-30">
        </footer>
      </div>
    </div>
  );
}

// ── Home Page (Full experience with fast LCP Hero) ──
function HomePage() {
  return (
    <main className="relative z-10 pt-32 pb-0 px-4 md:px-16 max-w-[1200px] mx-auto space-y-24">
      <section id="hero">
        <HeroCard />
      </section>
      
      <React.Suspense fallback={<div className="h-40 flex items-center justify-center text-gray-800/20">Loading...</div>}>
        <section id="skills">
          <Skills />
        </section>
      </React.Suspense>

      <React.Suspense fallback={<div className="h-40" />}>
        <section id="projects">
          <Projects />
        </section>
      </React.Suspense>

      <React.Suspense fallback={<div className="h-40" />}>
        <section id="certificates">
          <Certificates />
        </section>
      </React.Suspense>

      <React.Suspense fallback={<div className="h-40" />}>
        <section id="hackathons">
          <Hackathons />
        </section>
      </React.Suspense>

      <React.Suspense fallback={<div className="h-40" />}>
        <section id="academics">
          <Academics />
        </section>
      </React.Suspense>

      <React.Suspense fallback={<div className="h-40" />}>
        <section id="contact">
          <Contact />
        </section>
      </React.Suspense>
      

    </main>
  );
}

// ── Standalone Section Wrapper ──
function SectionPage({ children, title }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 pt-32 pb-0 px-4 md:px-16 max-w-[1200px] mx-auto">
      <React.Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-500">Loading {title}...</div>}>
        {children}
      </React.Suspense>
    </main>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <MainLayout isLoading={isLoading} handleLoadingComplete={handleLoadingComplete}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SectionPage title="Skills"><Skills /></SectionPage>} />
        <Route path="/projects" element={<SectionPage title="Projects"><AllProjects /></SectionPage>} />
        <Route path="/certificates" element={<SectionPage title="Certificates"><AllCertificates /></SectionPage>} />
        <Route path="/hackathons" element={<SectionPage title="Hackathons"><Hackathons /></SectionPage>} />
        <Route path="/academics" element={<SectionPage title="Academics"><Academics /></SectionPage>} />
        <Route path="/contact" element={<SectionPage title="Contact"><Contact /></SectionPage>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
