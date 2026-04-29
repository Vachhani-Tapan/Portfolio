import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificatesData';

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
        className="text-[1rem] md:text-[1.2rem] text-[#f2f2f2] leading-tight font-light tracking-tight mb-2"
        style={{ fontFamily: "'Outfit', sans-serif" }}
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
        <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>All Certificates</h2>
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
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-[14px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
};

export default AllCertificates;
