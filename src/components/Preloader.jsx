import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Preloader.css';

const LETTERS = 'TAPAN'.split('');

const Preloader = ({ isLoading }) => {
  const [show, setShow] = useState(true);
  const container = useRef(null);

  useGSAP(() => {
    const letters = document.querySelectorAll(".loading-text > span");

    // Animate each letter with stagger
    gsap.to(letters, {
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      onUpdate: function () {
        letters.forEach((el, i) => {
          gsap.to(el, {
            color: "#ffffff",
            duration: 0.2,
            delay: i * 0.15,
          });
          gsap.to(el, {
            color: "rgba(255,255,255,0.1)",
            duration: 0.2,
            delay: i * 0.15 + 0.4,
          });
          gsap.to(el.querySelector(".glow-overlay"), {
            opacity: 1,
            duration: 0.2,
            delay: i * 0.15,
          });
        });
      },
      onComplete: () => {
        gsap.to("#loading", {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          onComplete: () => {
            setShow(false);
          },
        });
      },
    });
  }, { scope: container });

  if (!show) return null;

  return (
    <div id="loading" ref={container}>
      <div className="loading-text" id="name-loader">
        {LETTERS.map((char, index) => (
          <span key={index} data-text={char}>
            {char}
            <span className="glow-overlay" data-text={char}>{char}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
