import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const academicData = [
  {
    id: 1,
    title: "Bachelor of Engineering in Computer",
    institution: "Swaminarayan University, Kalol, Gujarat",
    period: "2025 - 2029",
    score: "CGPA: 9.81",
    description: "Pursuing a comprehensive curriculum focusing on software engineering, data structures, and advanced computing paradigms.",
    side: "left"
  },
  {
    id: 2,
    title: "Higher Secondary Certificate (HSC)",
    institution: "V.N Godhani English Med. School, Surat, Gujarat",
    period: "2023 - 2025",
    score: "85%",
    description: "Completed Class 12th with a strong foundation in Sciences, Mathematics, and core competitive prerequisites.",
    side: "right"
  },
  {
    id: 3,
    title: "Secondary School Certificate (SSC)",
    institution: "Gajera English Medium School, Surat, Gujarat",
    period: "2022 - 2023",
    score: "85%",
    description: "Completed Class 10th with academic excellence and foundational focus.",
    side: "left"
  }
];

/* ─── Tilt Card Wrapper (3D Hover Effect) ─── */
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-150, 150], [8, -8]);
  const rotateY = useTransform(springX, [-150, 150], [-8, 8]);

  function handleMouseMove(e) {
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
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className="rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-6 md:p-8 hover:bg-[#111] hover:border-yellow-400/20 transition-colors duration-300 group z-10 relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const Academics = () => {
  const containerRef = useRef(null);
  const lightbulbRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    // Toggle Light bulb illumination on scroll
    gsap.to(lightbulbRef.current, {
      color: "#fde047", // yellow-400
      filter: "drop-shadow(0 0 25px rgba(253, 224, 71, 0.8))",
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", // triggers when top of section hits 60% down the viewport
        toggleActions: "play none none reverse", // play when scrolling down, reverse seamlessly when scrolling up
      }
    });

    // Timeline center line growth animation (tied directly to scroll progress)
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 90%",
          scrub: 1.5, // smooth scrubbing linked to scroll speed
        }
      }
    );

    // Fade in timeline items from left/right seamlessly
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.utils.toArray('.academic-card').forEach((card, index) => {
        const isLeft = card.classList.contains('card-left');
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: isLeft ? -80 : 80,
            autoAlpha: 0
          },
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
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.academic-card').forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: 40,
            autoAlpha: 0
          },
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
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div className="w-full flex flex-col items-center relative max-w-[1200px] mx-auto px-4 md:px-12 pt-4 md:pt-8" ref={containerRef}>
      
      {/* Header section with Lightbulb animation */}
      <div className="w-full text-center mb-10 md:mb-12 flex flex-col items-center relative z-20">
        <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Educational Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
          Academic Timeline
        </h2>
        
        {/* The target lightbulb that glows */}
        <div className="mt-6 relative z-20 translate-y-4 bg-black p-4 rounded-full border border-white/5">
          <Lightbulb 
            ref={lightbulbRef}
            size={40} 
            className="text-gray-700 transition-colors duration-700 ease-in-out"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative w-full max-w-5xl mx-auto -mt-8">
        
        {/* Master background dark line (desktop center) */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-0 w-[2px] bg-white/5 transform md:-translate-x-1/2 rounded-full z-0" />
        
        {/* Scroll-scrubbed animated glowing line */}
        <div 
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-4 w-[3px] bg-gradient-to-b from-yellow-400 via-white to-transparent transform md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(253,224,71,0.5)] z-10"
        />

        {/* Alternating CSS Loop */}
        <div className="flex flex-col gap-8 md:gap-12 relative z-20 pt-8">
          {academicData.map((item, index) => {
            const isLeft = item.side === 'left';
            
            return (
              <div 
                key={item.id} 
                className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-end relative academic-card card-${item.side}`}
              >
                
                {/* Node Ring Dot connecting to line */}
                <div className="absolute left-6 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#111] border-2 border-yellow-400 shadow-[0_0_10px_rgba(253,224,71,0.5)] z-30" />

                {/* Info Card Block */}
                <div className={`w-[calc(100%-3rem)] md:w-[45%] ${isLeft ? 'md:pr-10' : 'md:pl-10'} relative`}>
                  
                  {/* Subtle directional connector line for desktop */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-[2px] bg-white/5 right-0 ${isLeft ? '-right-10' : '-left-10 w-10'} z-0 pointer-events-none`} />

                  <TiltCard>
                    
                    <div className="flex flex-col gap-2 relative">
                      {/* Timeline tag bubble */}
                      <span className="inline-flex items-center justify-center px-3.5 py-1.5 bg-yellow-400/5 border border-yellow-400/20 rounded-full text-[10px] font-bold text-yellow-400/90 tracking-widest uppercase w-max mb-3">
                        {item.period}
                      </span>
                      
                      <h3 className="text-[1.3rem] md:text-2xl font-bold text-white tracking-tight leading-snug" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {item.title}
                      </h3>
                      
                      <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-[13px] md:text-[14.5px] font-medium leading-relaxed mt-1">
                          {item.institution}
                        </p>
                        
                        {item.score && (
                          <div className="flex">
                            <span className="inline-flex items-center justify-center px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 tracking-widest uppercase w-max shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                              {item.score}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="w-10 h-px bg-white/10 my-4 group-hover:bg-yellow-400/30 transition-colors duration-300" />
                      
                      <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </TiltCard>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Academics;
