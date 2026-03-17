import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
// import Profiles from './components/Profiles';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollReveal from './components/ScrollReveal';

function App() {
  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-primary-light selection:text-black relative cursor-none">
        <CustomCursor />
        <InteractiveBackground />
        <Navbar />
        <main className="relative z-10 w-full overflow-hidden">
          <Hero />
          <About />
          <Skills />
          <Certificates />
          <Projects />
          {/* <ScrollReveal>
            <Profiles />
          </ScrollReveal> */}
          <ScrollReveal>
            <Education />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
