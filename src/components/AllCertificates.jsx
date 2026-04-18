import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { certificatesData } from '../data/certificatesData';
import CanvasBackground from './CanvasBackground';
import CustomCursor from './CustomCursor';

const CertificateCard = ({ cert, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.33, 1, 0.68, 1],
    }}
    className="group rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]"
    style={{
      background: '#111',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    {/* ── Image ── */}
    <div className="relative w-full h-[240px] bg-black p-4 flex-shrink-0 flex items-center justify-center">
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
      />
      {/* subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>

    {/* ── Content ── */}
    <div className="p-6 flex flex-col flex-1 border-t border-white/5 relative z-10 bg-[#111]">
      <h3
        className="text-[1.4rem] md:text-[1.6rem] text-[#f2f2f2] leading-tight font-medium tracking-tight mb-2"
        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
      >
        {cert.title}
      </h3>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 font-medium tracking-wide">
        <span className="truncate flex-1 min-w-[120px]">{cert.issuer}</span>
        <span className="flex-shrink-0 bg-white/10 px-3 py-1.5 rounded text-[11px] uppercase font-bold text-white transition-colors duration-300 group-hover:bg-white/20">
          {cert.date}
        </span>
      </div>
    </div>
  </motion.div>
);

const AllCertificates = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (id) => {
    navigate('/', { state: { scrollTo: id } });
  };

  return (
    <div className="min-h-screen bg-black text-white relative cursor-none">
      <CustomCursor />
      <CanvasBackground />

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
      <main className="relative z-10 pt-32 pb-20 px-4 md:px-16 max-w-[1200px] mx-auto">
        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-16"
        >
          <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Professional Qualifications
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">All Certificates</h2>
          <p className="text-gray-400 text-base max-w-xl">
            A complete log of my academic achievements, bootcamp graduations, and upskilling certifications.
          </p>
        </motion.div>

        {/* ── Certificates Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <span
            onClick={() => handleNavigate('certificates')}
            className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-[14px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Home
          </span>
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        © 2026 Tapan. All rights reserved.
      </footer>
    </div>
  );
};

export default AllCertificates;
