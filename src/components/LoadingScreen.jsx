import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';
import logoImg from '../assets/Logo.png';

const WORDS = ['Design', 'Develop', 'Deploy'];
const COUNTER_DURATION = 3600; // ms — enough for all 3 words to breathe
const ON_COMPLETE_DELAY = 400; // ms after counter hits 100

const cubicEase = [0.4, 0, 0.2, 1];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const hasCalledComplete = useRef(false);

  // Keep ref updated to avoid stale closures
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // ── Counter (000 → 100) using requestAnimationFrame ──
  useEffect(() => {
    let startTime = null;
    let rafId;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / COUNTER_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Counter hit 100 — wait then call onComplete
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true;
          setTimeout(() => {
            onCompleteRef.current?.();
          }, ON_COMPLETE_DELAY);
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Derive wordIndex from progress percentage to keep it perfectly synchronized
  let wordIndex = 0;
  if (progress >= 66.66) {
    wordIndex = 2; // Deploy
  } else if (progress >= 33.33) {
    wordIndex = 1; // Develop
  }

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: cubicEase }}
    >
      {/* ── Element 1: "Logo" Label (Top-Left) ── */}
      <motion.div
        className="fixed top-6 left-6 md:top-8 md:left-10 z-[60]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: cubicEase }}
      >
        <img
          src={logoImg}
          alt="Tapan Vachhani"
          className="h-14 md:h-18 w-auto object-contain"
          style={{
            filter: "invert(1) brightness(2)",
            mixBlendMode: "screen"
          }}
        />
      </motion.div>

      {/* ── Element 2: Rotating Words (Center) ── */}
      <div className="loading-words-container">
        <AnimatePresence>
          <motion.span
            key={wordIndex}
            className="loading-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: cubicEase }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Element 3: Counter (Bottom-Right) ── */}
      <motion.div
        className="loading-counter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: cubicEase }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* ── Element 4: Progress Bar (Bottom Edge) ── */}
      <div className="loading-progress-track">
        <motion.div
          className="loading-progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
