import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificatesData';
import { CardStack } from './ui/card-stack';

const MobileCertificateCard = ({ cert }) => (
  <div 
    className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl relative flex flex-col"
  >
    {/* image container: STRICT fixed height so portrait certificates cannot break the layout */}
    <div className="relative w-full h-[200px] bg-black p-4 flex-shrink-0 flex items-center justify-center">
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>

    {/* content container: flex-1 ensures it fills any remaining vertical space if the sibling card is taller */}
    <div className="flex flex-col justify-between p-5 border-t border-white/5 flex-1 relative z-10 bg-[#111]">
      <div className="text-lg font-bold text-white tracking-wide line-clamp-3">
        {cert.title}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 font-medium tracking-wide">
        <span className="truncate flex-1 min-w-[100px]">{cert.issuer}</span>
        <span className="flex-shrink-0 bg-white/10 px-2 py-1 rounded text-[10px] uppercase">{cert.date}</span>
      </div>
    </div>
  </div>
);

const Certificates = () => {
  // Map our certificatesData to the CardStackItem interface expected by the new CardStack
  const certificateCards = certificatesData.slice(0, 5).map((cert) => ({
    id: cert.id,
    imageSrc: cert.image,
    title: cert.title,
    description: `${cert.issuer} • ${cert.date.toUpperCase()}`
  }));



  return (
    <motion.div 
      className="w-full flex flex-col items-center pb-0 relative max-w-[1400px] mx-auto px-4 md:px-12 pt-20 md:pt-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.4 }
        }
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
        }}
        className="w-full text-left mb-2 md:mb-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Certifications
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl font-light leading-relaxed">
          Professional achievements and continuous learning milestones.
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-6 mb-10" />
      </motion.div>

      {/* Mobile Layout: Horizontal Row / Scrollable List to fulfill "aligned in row normally" */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
        }}
        className="w-full flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 custom-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {certificatesData.slice(0, 5).map((cert) => (
          <div key={cert.id} className="w-[85%] sm:w-[60%] flex-shrink-0 snap-center">
            <MobileCertificateCard cert={cert} />
          </div>
        ))}
        {/* Adds visual padding to the end of the scroll */}
        <div className="w-4 flex-shrink-0"></div>
      </motion.div>

      {/* Desktop/Tablet Layout: 3D Fan Card Stack Carousel */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
        }}
        className="w-full hidden md:flex justify-center -mt-6 mb-4 relative z-10"
      >
        <CardStack 
          items={certificateCards} 
          initialIndex={0}
          autoAdvance={true}
          intervalMs={1500}
          showDots={true}
          loop={true}
        />
      </motion.div>

      {/* ── All Certificates Button ── */}
      <div className="flex justify-center mt-8 w-full z-20 relative">
        <Link
          to="/certificates"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[15px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_24px_rgba(255,255,255,0.3)]"
        >
          All Certificates
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Certificates;
