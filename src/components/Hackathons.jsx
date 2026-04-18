import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Trophy, MapPin, Calendar, ChevronDown, X, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { hackathonData } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

/* ─── Lightbox (full-screen image viewer) ─── */
const Lightbox = ({ src, onClose }) => {
  React.useEffect(() => {
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
        alt="Hackathon Event"
        loading="lazy"
        className="max-w-[90vw] max-h-[80vh] md:max-w-[85vw] md:max-h-[85vh] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>,
    document.body
  );
};

/* ─── Expanded Detail Card (appears BELOW the timeline item, full-width within timeline) ─── */
const DetailCard = ({ event, onClose, onImageClick }) => {
  const allImages = [event.certificate, ...event.photos.filter(p => p !== event.certificate)];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full mt-6 origin-top"
    >
      <div
        className="relative rounded-2xl overflow-hidden border bg-[#0a0a0a] shadow-[0_8px_50px_rgba(0,0,0,0.6)]"
        style={{ borderColor: `${event.color}25` }}
      >
        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/10 transition-all duration-300 hover:scale-110"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Accent glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-15 pointer-events-none"
          style={{ background: event.color }}
        />

        {/* TOP: Certificate (left) + Description (right) */}
        <div className="flex flex-col md:flex-row">
          {/* Certificate — left side */}
          <div
            className="w-full md:w-1/2 relative bg-black/30 cursor-pointer group/cert flex items-center justify-center p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/5"
            onClick={(e) => { e.stopPropagation(); onImageClick(event.certificate); }}
          >
            <img
              src={event.certificate}
              alt={`${event.name} certificate`}
              loading="lazy"
              className="w-full h-[200px] md:h-[280px] object-contain transition-transform duration-500 group-hover/cert:scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="bg-white/15 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <Eye size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Description — right side */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <h4
                className="text-xl md:text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {event.name}
              </h4>
              {event.highlight && (
                <Trophy size={18} style={{ color: event.color }} className="flex-shrink-0" />
              )}
            </div>

            {/* Tagline badge */}
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase w-max mb-4"
              style={{
                background: `${event.color}12`,
                border: `1px solid ${event.color}30`,
                color: event.color,
              }}
            >
              {event.tagline}
            </span>

            {/* Description text */}
            <p className="text-gray-400 text-[13px] md:text-[14.5px] leading-relaxed mb-5">
              {event.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={13} style={{ color: event.color }} />
                <span className="font-medium text-gray-400">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={13} style={{ color: event.color }} />
                <span className="font-medium text-gray-400">{event.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Memory Photos */}
        {allImages.length > 0 && (
          <div className="border-t border-white/5 p-5 md:p-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
              📸 Event Memories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allImages.map((photo, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden border border-white/5 cursor-pointer group/photo aspect-[4/3] bg-black/30"
                  onClick={(e) => { e.stopPropagation(); onImageClick(photo); }}
                >
                  <img
                    src={photo}
                    alt={`Memory ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Eye size={16} className="text-white opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Tilt Card Wrapper (3D Hover Effect) ─── */
const TiltCard = ({ children, isExpanded, eventColor, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-150, 150], [8, -8]);
  const rotateY = useTransform(springX, [-150, 150], [-8, 8]);

  function handleMouseMove(e) {
    if (isExpanded) {
      x.set(0); y.set(0); return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: isExpanded ? 0 : rotateX,
        rotateY: isExpanded ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
        borderColor: isExpanded ? `${eventColor}40` : undefined,
      }}
      className={`rounded-2xl overflow-hidden border bg-[#0a0a0a] shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-6 md:p-8 transition-colors duration-300 group z-10 relative cursor-pointer ${
        isExpanded ? 'bg-[#0d0d0d]' : 'border-white/5 hover:bg-[#111]'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div style={{ transform: isExpanded ? "none" : "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ─── Main Hackathons Component ─── */
const Hackathons = () => {
  const containerRef = useRef(null);
  const trophyRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef({});
  const [expandedId, setExpandedId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // 1. Refresh GSAP ScrollTrigger whenever content expands/collapses to prevent layout glitches
  // 2. Smoothly scroll the card into view when expanded so it doesn't "jump" away
  useEffect(() => {
    if (expandedId) {
      // Immediate refresh to start accounting for height change ONLY when expanding
      ScrollTrigger.refresh();

      // Use a timeout to allow the initial expansion to trigger layout updates
      const timer = setTimeout(() => {
        const element = cardRefs.current[expandedId];
        if (element) {
          const navHeight = 90; // Fixed navbar height offset
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          
          window.scrollTo({
            top: absoluteTop - navHeight,
            behavior: 'smooth'
          });
        }
        
        // Final refresh after expansion is likely mostly done
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // ONLY refresh when collapsing after the animation is finished
      // This prevents cards from "disappearing" while the section is shrinking
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [expandedId]);

  useGSAP(() => {
    // Trophy glow on scroll
    gsap.to(trophyRef.current, {
      color: "#FFD700",
      filter: "drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))",
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Timeline line growth (scroll-scrubbed)
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 90%",
          scrub: 1.5,
        },
      }
    );

    // Card slide-in animations
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray('.hackathon-card').forEach((card, index) => {
        const isLeft = card.classList.contains('hcard-left');
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -80 : 80, autoAlpha: 0 },
          {
            opacity: 1,
            x: 0,
            autoAlpha: 1,
            duration: 1.0,
            delay: index === 0 ? 0.6 : 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: index === 0 ? containerRef.current : card,
              start: index === 0 ? "top 50%" : "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.hackathon-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 40, autoAlpha: 0 },
          {
            opacity: 1,
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: index === 0 ? 0.6 : 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: index === 0 ? containerRef.current : card,
              start: index === 0 ? "top 50%" : "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Alternating sides
  const sides = ['left', 'right'];

  return (
    <div
      className="w-full flex flex-col items-center relative max-w-[1200px] mx-auto px-4 md:px-12 pt-4 md:pt-8"
      ref={containerRef}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50% 0px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full text-center mb-10 md:mb-12 flex flex-col items-center relative z-20"
      >
        <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Compete · Build · Win
        </p>
        <h3 className="text-4xl md:text-5xl font-black text-white mb-2">
          Some of my Hackathon Journey
        </h3>

        {/* Trophy icon (glows on scroll) */}
        <div className="mt-6 relative z-20 translate-y-4 bg-black p-4 rounded-full border border-white/5">
          <Trophy
            ref={trophyRef}
            size={40}
            className="text-gray-700 transition-colors duration-700 ease-in-out"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>

      {/* Timeline Layout */}
      <div className="relative w-full max-w-5xl mx-auto -mt-8">
        {/* Background line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-0 w-[2px] bg-white/5 transform md:-translate-x-1/2 rounded-full z-0" />

        {/* Animated glowing line */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-4 w-[3px] bg-gradient-to-b from-[#FFD700] via-white to-transparent transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10"
        />

        {/* Timeline Cards */}
        <div className="flex flex-col gap-8 md:gap-12 relative z-20 pt-8">
          {hackathonData.map((event, index) => {
            const side = sides[index % 2];
            const isLeft = side === 'left';
            const isExpanded = expandedId === event.id;

            return (
              <React.Fragment key={event.id}>
                {/* Timeline item row */}
                <div
                  ref={el => cardRefs.current[event.id] = el}
                  className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-end relative hackathon-card hcard-${side}`}
                >
                  {/* Node dot on the line */}
                  <div
                    className="absolute left-6 md:left-1/2 top-8 transform -translate-x-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 z-30"
                    style={{
                      background: isExpanded ? event.color : '#111',
                      borderColor: event.color,
                      boxShadow: `0 0 ${isExpanded ? '18' : '10'}px ${event.color}80`,
                      transition: 'all 0.3s ease',
                    }}
                  />

                  {/* Card */}
                  <div className={`w-[calc(100%-3rem)] md:w-[45%] ${isLeft ? 'md:pr-10' : 'md:pl-10'} relative`}>
                    {/* Connector line (desktop) */}
                    <div
                      className={`hidden md:block absolute top-8 -translate-y-1/2 w-10 h-[2px] bg-white/5 ${isLeft ? '-right-10' : '-left-10'} z-0 pointer-events-none`}
                    />

                    <TiltCard isExpanded={isExpanded} eventColor={event.color} onClick={() => toggleExpand(event.id)}>
                      {/* Accent glow */}
                      <div
                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                        style={{ background: event.color }}
                      />

                      <div className="flex flex-col gap-2 relative">
                        {/* Date badge */}
                        <span
                          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase w-max mb-3"
                          style={{
                            background: `${event.color}12`,
                            border: `1px solid ${event.color}30`,
                            color: event.color,
                          }}
                        >
                          {event.date}
                        </span>

                        {/* Title */}
                        <div className="flex items-center gap-2">
                          <h3
                            className="text-[1.3rem] md:text-2xl font-bold text-white tracking-tight leading-snug"
                            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                          >
                            {event.name}
                          </h3>
                          {event.highlight && (
                            <Trophy
                              size={16}
                              className="flex-shrink-0"
                              style={{ color: event.color }}
                            />
                          )}
                        </div>

                        {/* Tagline + venue */}
                        <p className="text-gray-400 text-[13px] md:text-[14.5px] font-medium leading-relaxed mt-1">
                          {event.tagline} — {event.venue}
                        </p>

                        {/* Separator */}
                        <div
                          className="w-10 h-px my-3 transition-colors duration-300"
                          style={{
                            background: isExpanded ? `${event.color}50` : 'rgba(255,255,255,0.1)',
                          }}
                        />

                        {/* Click hint */}
                        <div className="flex items-center gap-3 text-gray-400 text-sm font-semibold mt-3">
                          <span>{isExpanded ? 'Click to collapse' : 'Click to view details'}</span>
                          <div className={`transition-all duration-300 p-2 rounded-full bg-white/5 group-hover:bg-white/10 ${isExpanded ? 'rotate-180 bg-white/10' : 'group-hover:translate-y-1 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}>
                            <ChevronDown
                              size={22}
                              strokeWidth={2.5}
                              className={!isExpanded ? 'group-hover:animate-bounce mt-0.5' : ''}
                              style={{ color: isExpanded ? event.color : '#fff' }}
                            />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>

                {/* ──── EXPANDED DETAIL CARD (full-width, below timeline item) ──── */}
                <AnimatePresence>
                  {isExpanded && (
                    <div className="w-full flex justify-center pl-10 md:pl-0">
                      <div className="w-full max-w-4xl">
                        <DetailCard
                          event={event}
                          onClose={() => setExpandedId(null)}
                          onImageClick={(src) => setLightboxSrc(src)}
                        />
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox
            src={lightboxSrc}
            onClose={() => setLightboxSrc(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hackathons;
