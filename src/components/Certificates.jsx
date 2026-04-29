import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/certificatesData';
import { CardStack } from './ui/card-stack';

/* ─── Lightbox (full-screen image viewer) ─── */
const Lightbox = ({ src, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-pointer"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white border border-white/20 transition-all z-[10000] shadow-xl"
      >
        <X size={24} />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src}
        alt="Certificate"
        loading="lazy"
        className="max-w-[90vw] max-h-[80vh] md:max-w-[85vw] md:max-h-[85vh] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>,
    document.body
  );
};

const MobileCertificateCard = ({ cert, onImageClick }) => (
  <div
    className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl relative flex flex-col group"
  >
    {/* image container: STRICT fixed height so portrait certificates cannot break the layout */}
    <div 
      className="relative w-full h-[200px] bg-black p-4 flex-shrink-0 flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={() => onImageClick(cert.image)}
    >
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover overlay with Eye Icon */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
          <Eye size={20} className="text-white" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>

    {/* content container: flex-1 ensures it fills any remaining vertical space if the sibling card is taller */}
    <div className="flex flex-col justify-between p-5 border-t border-white/5 flex-1 relative z-10 bg-[#111]">
      <div 
        className="text-base font-light text-white tracking-wide line-clamp-3"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
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
  const [selectedImage, setSelectedImage] = useState(null);

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
        <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
            <MobileCertificateCard 
              cert={cert} 
              onImageClick={(src) => setSelectedImage(src)}
            />
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
          onImageClick={(src) => setSelectedImage(src)}
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Certificates;
