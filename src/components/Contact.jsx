import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/* ─── 3D Tilt Card Wrapper for Bento Grid ─── */
const BentoTiltCard = ({ children, className = '', style = {}, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 30 });
  const springY = useSpring(y, { stiffness: 350, damping: 30 });

  const rotateX = useTransform(springY, [-150, 150], [6, -6]);
  const rotateY = useTransform(springX, [-150, 150], [-6, 6]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    // For glow position (percentage)
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const glowXSpring = useSpring(glowX, { stiffness: 300, damping: 30 });
  const glowYSpring = useSpring(glowY, { stiffness: 300, damping: 30 });

  const {
    padding, display, flexDirection, alignItems, justifyContent, gap, textAlign, minHeight,
    ...outerStyle
  } = style;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        display: 'flex',
        flexDirection: 'column',
        minHeight: minHeight,
        ...outerStyle,
      }}
      className={`rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111113] shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:border-white/[0.12] group relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.03)',
      }}
    >
      {/* Moving glow effect that follows cursor */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          opacity: 0,
          background: useTransform(
            [glowXSpring, glowYSpring],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
          ),
          pointerEvents: 'none',
          zIndex: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div style={{ 
        transform: 'translateZ(20px)', 
        position: 'relative', 
        zIndex: 1, 
        flex: 1, 
        width: '100%',
        padding, display, flexDirection, alignItems, justifyContent, gap, textAlign 
      }}>
        {children}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [status, setStatus] = useState('');
  const containerRef = useRef(null);
  const letsLetterRefs = useRef([]);
  const workLetterRefs = useRef([]);
  const letsGlassRefs = useRef([]);
  const workGlassRefs = useRef([]);

  const letsText = "LET'S";
  const workText = "WORK";

  useGSAP(() => {
    gsap.from('.lets-work-container', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const handleLetterEnter = useCallback((letterEl, glassEl) => {
    gsap.killTweensOf(letterEl);
    gsap.killTweensOf(glassEl);
    gsap.to(letterEl, {
      scaleY: 1.35,
      scaleX: 1.15,
      color: '#888',
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
    gsap.to(glassEl, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleLetterLeave = useCallback((letterEl, glassEl, originalColor) => {
    gsap.killTweensOf(letterEl);
    gsap.killTweensOf(glassEl);
    gsap.to(letterEl, {
      scaleY: 1,
      scaleX: 1,
      color: originalColor,
      duration: 0.25,
      ease: 'power2.inOut',
    });
    gsap.to(glassEl, {
      opacity: 0,
      scale: 0.7,
      duration: 0.25,
      ease: 'power2.in',
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.target;
    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const renderLetters = (text, letterRefs, glassRefs, color) => (
    text.split('').map((char, i) => (
      <span
        key={i}
        style={{ position: 'relative', display: 'inline-block', cursor: 'pointer', zIndex: 1 }}
        onMouseEnter={(e) => { e.currentTarget.style.zIndex = 10; handleLetterEnter(letterRefs.current[i], glassRefs.current[i]); }}
        onMouseLeave={(e) => { e.currentTarget.style.zIndex = 1; handleLetterLeave(letterRefs.current[i], glassRefs.current[i], color); }}
      >
        <span
          ref={(el) => { glassRefs.current[i] = el; }}
          style={{
            position: 'absolute', inset: '-4px -2px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(200,200,200,0.08) 100%)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '8px', border: 'none', opacity: 0, transform: 'scale(0.7)',
            pointerEvents: 'none', zIndex: 0,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,0,0,0.2)',
          }}
        />
        <span
          ref={(el) => { letterRefs.current[i] = el; }}
          style={{
            display: 'inline-block', position: 'relative', zIndex: 1,
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.8rem, 14vw, 8rem)',
            fontWeight: 900, color: color, lineHeight: 0.9, textTransform: 'uppercase',
            transformOrigin: 'center bottom', willChange: 'transform', letterSpacing: '-0.02em',
          }}
        >
          {char}
        </span>
      </span>
    ))
  );

  const repos = [
    { name: 'FinWise AI', desc: 'Personal finance platform' },
    { name: 'Exp', desc: 'Expense management app' },
    { name: 'WesternRise Clone', desc: 'WesternRise website clone' },
    { name: 'Urban-Money', desc: 'Urban-Money website clone' },
    { name: 'ELearningPath', desc: 'E-Learning platform' },
    { name: 'PinCode_Explorer', desc: 'PinCode Explorer website' },
  ];

  const techIcons = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', label: 'JS', delay: 0 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', label: 'React', delay: 0.3 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', label: 'Node', delay: 0.6 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', label: 'C++', delay: 0.9 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', label: 'Mongo', delay: 1.2 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', label: 'Figma', delay: 0.4 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', label: 'TW', delay: 0.7 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', label: 'Git', delay: 1.0 },
  ];

  const iconPositions = [
    { top: '8%', left: '12%' }, { top: '5%', right: '15%' },
    { top: '35%', left: '8%' }, { top: '30%', right: '10%' },
    { bottom: '30%', left: '15%' }, { bottom: '28%', right: '12%' },
    { bottom: '8%', left: '10%' }, { bottom: '5%', right: '18%' },
  ];

  return (
    <div ref={containerRef} className="w-full flex flex-col pb-12 relative max-w-[1200px] mx-auto" style={{ marginTop: '80px' }}>
      <style>{`
        @media (max-width: 768px) {
          .mobile-bento-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .mobile-vertical-card {
            min-height: 120px !important;
            padding: 30px 10px !important;
          }
          .mobile-horizontal-text {
            writing-mode: horizontal-tb !important;
          }
        }
      `}</style>
      
      {/* ── LET'S WORK + Form Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 w-full items-start">
        <div className="flex flex-col lets-work-container select-none">
          <div style={{ display: 'flex', gap: '0px', lineHeight: 1 }}>
            {renderLetters(letsText, letsLetterRefs, letsGlassRefs, '#ffffff')}
          </div>
          <div style={{ display: 'flex', gap: '0px', lineHeight: 1, marginTop: '12px' }}>
            {renderLetters(workText, workLetterRefs, workGlassRefs, '#3a3f47')}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full flex flex-col justify-center"
        >
          <form onSubmit={handleSubmit} action="https://formspree.io/f/maqlgvpl" method="POST" className="flex flex-col gap-0 w-full">
            <div className="py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <input type="text" id="contact-name" name="name" placeholder="What's your name?" required
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.01em' }} />
            </div>
            <div className="py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <input type="email" id="contact-email" name="email" placeholder="Your email address" required
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.01em' }} />
            </div>
            <div className="py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <textarea id="contact-message" name="message" placeholder="Write Something..." required rows="2"
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.01em', resize: 'none' }} />
            </div>
            <div className="flex justify-center mt-10">
              <button type="submit" disabled={status === 'submitting'}
                style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50px', padding: '14px 48px', color: '#fff', fontSize: '13px', fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 20px rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
              >
                {status === 'submitting' ? 'SENDING...' : status === 'success' ? 'MESSAGE SENT!' : status === 'error' ? 'ERROR. TRY AGAIN' : 'SEND MESSAGE'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          ── BENTO GRID — Social Cards with 3D Tilt ──
          ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="mt-24 w-full"
      >
        {/* Bento Grid */}
        <div className="mobile-bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 1.8fr) minmax(0, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: '16px',
        }}>

          {/* ── Row 1, Col 1: CONTACT header with corner brackets ── */}
          <div style={{
            gridColumn: '1 / 2',
            gridRow: '1 / 2',
            position: 'relative',
            padding: '28px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: '2px solid rgba(255,255,255,0.4)', borderLeft: '2px solid rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', borderTop: '2px solid rgba(255,255,255,0.4)', borderRight: '2px solid rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', borderBottom: '2px solid rgba(255,255,255,0.4)', borderLeft: '2px solid rgba(255,255,255,0.4)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '2px solid rgba(255,255,255,0.4)', borderRight: '2px solid rgba(255,255,255,0.4)' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700,
              color: '#fff', letterSpacing: '0.35em', textTransform: 'uppercase',
            }}>
              CONTACT
            </span>
          </div>

          {/* ── Row 1, Col 2: Email card ── */}
          <BentoTiltCard
            style={{ gridColumn: '2 / 3', gridRow: '1 / 2', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}
            onClick={() => window.location.href = 'mailto:tapan.vachhani.cg@gmail.com'}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', background: '#1a1a1c',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
              tapan.vachhani.cg@gmail.com
            </span>
          </BentoTiltCard>

          {/* ── Row 1-2, Col 3: Tech stack + LinkedIn ── */}
          <BentoTiltCard
            style={{ gridColumn: '3 / 4', gridRow: '1 / 3', position: 'relative', overflow: 'hidden', minHeight: '260px' }}
          >
            {techIcons.map((icon, i) => (
              <img
                key={i}
                src={icon.src}
                alt={icon.label}
                style={{
                  position: 'absolute', width: '32px', height: '32px',
                  ...iconPositions[i], opacity: 0.6,
                  animation: `${i % 2 === 0 ? 'floatIcon' : 'floatIconAlt'} ${3 + (i * 0.4)}s ease-in-out infinite`,
                  animationDelay: `${icon.delay}s`, filter: 'grayscale(30%)',
                }}
              />
            ))}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: '40px', height: '40px' }} />
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>Tapan Vachhani</span>
              <a
                href="https://www.linkedin.com/in/tapanvachhani/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: '50px', padding: '6px 24px', color: '#fff', fontSize: '12px',
                  fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: 'none', transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.target.style.background = '#0a66c2'; e.target.style.borderColor = '#0a66c2'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                Connect
              </a>
            </div>
          </BentoTiltCard>

          {/* ── Row 2-3, Col 1: Vertical Name ── */}
          <BentoTiltCard
            className="mobile-vertical-card"
            style={{
              gridColumn: '1 / 2', gridRow: '2 / 4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px 12px', position: 'relative', overflow: 'hidden', minHeight: '220px',
            }}
          >
            <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <span className="mobile-horizontal-text" style={{
              writingMode: 'vertical-rl', textOrientation: 'mixed',
              fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 900,
              color: '#fff', letterSpacing: '0.25em', textTransform: 'uppercase',
              animation: 'verticalNameScroll 4s ease-in-out infinite',
            }}>
              TAPAN VACHHANI
            </span>
          </BentoTiltCard>

          {/* ── Row 2-3, Col 2: GitHub card (large) ── */}
          <BentoTiltCard
            style={{
              gridColumn: '2 / 3', gridRow: '2 / 4',
              padding: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* GitHub header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', background: '#1a1a1c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" style={{ width: '26px', height: '26px', filter: 'invert(1)' }} />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>github/Vachhani-Tapan</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif" }}>Full Stack Developer</div>
                </div>
              </div>
              
              <a
                href="https://github.com/Vachhani-Tapan" target="_blank" rel="noopener noreferrer"
                style={{ background: '#fff', borderRadius: '50px', padding: '7px 24px', color: '#000', fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif", textDecoration: 'none', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.target.style.background = '#d4d4d4'; e.target.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.transform = 'scale(1)'; }}
                onClick={(e) => e.stopPropagation()}
              >
                Follow
              </a>
            </div>

            {/* Scrolling repo cards */}
            <div style={{ overflow: 'hidden', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
              {/* Row 1 */}
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '14px', animation: 'repoScroll 20s linear infinite', width: 'max-content' }}>
                  {[...repos, ...repos].map((repo, i) => (
                    <div key={i} style={{
                      background: '#1a1a1c', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px', padding: '16px 20px', minWidth: '180px', flexShrink: 0,
                    }}>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: '4px' }}>{repo.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif" }}>{repo.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Row 2 — reverse */}
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '14px', animation: 'repoScroll 25s linear infinite reverse', width: 'max-content' }}>
                  {[...repos.slice().reverse(), ...repos.slice().reverse()].map((repo, i) => (
                    <div key={i} style={{
                      background: '#1a1a1c', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px', padding: '16px 20px', minWidth: '180px', flexShrink: 0,
                    }}>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: '4px' }}>{repo.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif" }}>{repo.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Row 3 - normal direction with different speed */}
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '14px', animation: 'repoScroll 22s linear infinite', width: 'max-content' }}>
                  {/* Shifted array for variety */}
                  {[...repos.slice(2), ...repos.slice(0, 2), ...repos.slice(2), ...repos.slice(0, 2)].map((repo, i) => (
                    <div key={i} style={{
                      background: '#1a1a1c', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px', padding: '16px 20px', minWidth: '180px', flexShrink: 0,
                    }}>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: '4px' }}>{repo.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif" }}>{repo.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoTiltCard>

          {/* ── Row 3, Col 3: X (Twitter) card ── */}
          <BentoTiltCard
            style={{
              gridColumn: '3 / 4', gridRow: '3 / 4',
              padding: '24px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '14px',
              position: 'relative', overflow: 'hidden', minHeight: '160px',
            }}
          >
            {/* Large faded X in background */}
            <svg viewBox="0 0 24 24" style={{ position: 'absolute', right: '-10px', top: '-10px', width: '120px', height: '120px', opacity: 0.04 }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white" />
            </svg>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>Tapan Vachhani</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", marginTop: '2px' }}>@VachhaniTapan</div>
            </div>
            <a
              href="https://twitter.com/intent/follow?screen_name=VachhaniTapan" target="_blank" rel="noopener noreferrer"
              style={{ background: '#fff', borderRadius: '50px', padding: '7px 28px', color: '#000', fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif", textDecoration: 'none', transition: 'all 0.3s ease', position: 'relative', zIndex: 2, cursor: 'pointer' }}
              onMouseEnter={(e) => { e.target.style.background = '#d4d4d4'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.background = '#fff'; e.target.style.transform = 'scale(1)'; }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Follow Tapan Vachhani on X"
            >
              Follow
            </a>
          </BentoTiltCard>

        </div>

        {/* ── Bottom Row: LeetCode, YouTube, and Availability ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full">
          {/* LeetCode */}
          <BentoTiltCard className="col-span-1" style={{
              padding: '24px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px',
              position: 'relative', overflow: 'hidden', minHeight: '180px'
            }}>
            <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="" style={{ position: 'absolute', right: '-10px', top: '-10px', width: '120px', height: '120px', opacity: 0.05 }} />
            <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" style={{ width: '36px', height: '36px', zIndex: 1, marginBottom: '2px' }} />
            <div style={{ textAlign: 'center', zIndex: 1, marginBottom: '4px' }}>
              <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>LeetCode</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>@TapanVachhani</div>
            </div>
            <a
              href="https://leetcode.com/u/TapanVachhani/" target="_blank" rel="noopener noreferrer"
              style={{ background: '#ffa116', borderRadius: '50px', padding: '8px 24px', color: '#000', fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif", textDecoration: 'none', transition: 'all 0.3s ease', zIndex: 1 }}
              onMouseEnter={(e) => { e.target.style.opacity = '0.85'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.transform = 'scale(1)'; }}
            >
              View Profile
            </a>
          </BentoTiltCard>

          {/* YouTube */}
          <BentoTiltCard className="col-span-1" style={{
              padding: '24px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px',
              position: 'relative', overflow: 'hidden', minHeight: '180px'
            }}>
            <svg viewBox="0 0 24 24" style={{ position: 'absolute', right: '-10px', top: '-10px', width: '120px', height: '120px', opacity: 0.04 }} fill="white">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="white" style={{ zIndex: 1, marginBottom: '2px' }}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <div style={{ textAlign: 'center', zIndex: 1, marginBottom: '4px' }}>
              <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>YouTube</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>Tapan Vachhani</div>
            </div>
            <a
              href="https://www.youtube.com/channel/UC78kvg8-eP25FxzQqD1skfQ" target="_blank" rel="noopener noreferrer"
              style={{ background: '#ff0000', borderRadius: '50px', padding: '8px 24px', color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif", textDecoration: 'none', transition: 'all 0.3s ease', zIndex: 1 }}
              onMouseEnter={(e) => { e.target.style.opacity = '0.85'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.transform = 'scale(1)'; }}
            >
              Subscribe
            </a>
          </BentoTiltCard>

          {/* Availability / Right Side Banner */}
          <BentoTiltCard className="col-span-1 md:col-span-2" style={{
            padding: '32px 28px', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', position: 'relative', overflow: 'hidden', minHeight: '180px',
            alignItems: 'center', textAlign: 'center', gap: '18px'
          }}>
            <div style={{ position: 'absolute', right: '-15%', top: '-30%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
            
            {/* Faded Background Globe Icon */}
            <svg style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '140px', height: '140px', opacity: 0.04 }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="12" cy="12" r="10" />
               <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
               <path d="M2 12h20" />
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
              <div className="animate-pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.6)' }} />
              <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>AVAILABLE FOR WORK</span>
            </div>
            
            <div style={{ color: '#fff', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 700, fontFamily: "'Inter', sans-serif", lineHeight: 1.2, letterSpacing: '-0.02em', zIndex: 1, marginTop: '15px' }}>
              Let's build something great.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Based in India</span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)', marginTop: '20px'}}>•</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>UTC+5:30</span>
            </div>
          </BentoTiltCard>
        </div>
      </motion.div>

    </div>
  );
};

export default Contact;
