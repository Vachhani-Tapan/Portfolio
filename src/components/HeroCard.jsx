import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages, Laptop, Rocket, GraduationCap, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/*
  Pixel-accurate recreation of the Arhaan.Dev hero card screenshot with added GSAP.
*/
const HeroCard = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-left", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".hero-right", {
      opacity: 0,
      x: 50,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      className="w-full rounded-2xl overflow-hidden"
      style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* ── top section ── */}
      <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8">
        {/* left: profile image */}
        <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] flex-shrink-0 rounded-3xl overflow-hidden transition-transform duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hero-left">
          <img
            src="https://res.cloudinary.com/dgcmeb8ec/image/upload/v1774767368/resize_image_g9upwd.jpg"
            alt="Hero Avatar"
            className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:opacity-100"
            style={{ transform: 'scale(1.3)', objectPosition: 'center 15%' }}
          />
        </div>

        {/* right: header + info */}
        <div className="flex-1 min-w-0 hero-right">
          {/* available badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(29,205,159,0.8)]" style={{ background: '#1DCD9F' }} />
            <span className="text-[#a0a0a0] text-xs font-semibold tracking-[0.15em] uppercase">AVAILABLE FOR HIRE</span>
          </div>

          {/* name */}
          <h1
            className="text-[2.5rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black uppercase tracking-tighter leading-none mb-8 flex items-center flex-wrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="text-gradient drop-shadow-md">TAPAN VACHHANI</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[4px] md:w-[6px] h-[0.85em] bg-[#1DCD9F] ml-1 md:ml-2"
            />
          </h1>

          {/* info grid – 3 cols × 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              {
                icon: (
                  <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-[18px] h-[13px] object-cover rounded-[2px] shadow-sm" />
                ),
                label: 'India',
                link: null
              },
              {
                icon: (
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-[18px] h-[18px] invert" />
                ),
                label: 'GitHub',
                link: 'https://github.com/Vachhani-Tapan',
                hoverClass: 'hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:text-white'
              },
              {
                icon: (
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-[18px] h-[18px]" />
                ),
                label: 'LinkedIn',
                link: 'https://www.linkedin.com/in/tapan-vachhani-691433394/',
                hoverClass: 'hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/10 hover:shadow-[0_0_15px_rgba(10,102,194,0.15)] hover:text-[#0a66c2]'
              },
              {
                icon: (
                  <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="LeetCode" className="w-[18px] h-[18px]" />
                ),
                label: 'LeetCode',
                link: 'https://leetcode.com/u/TapanVachhani/',
                hoverClass: 'hover:border-[#ffa116]/50 hover:bg-[#ffa116]/10 hover:shadow-[0_0_15px_rgba(255,161,22,0.15)] hover:text-[#ffa116]'
              },
              {
                icon: (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="GMail" className="w-[18px] h-[18px]" />
                ),
                label: 'GMail',
                link: 'mailto:tapan.vachhani.cg@gmail.com',
                hoverClass: 'hover:border-[#ea4335]/50 hover:bg-[#ea4335]/10 hover:shadow-[0_0_15px_rgba(234,67,53,0.15)] hover:text-[#ea4335]'
              },
              {
                icon: (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-[20px] h-[16px] object-contain" />
                ),
                label: 'YouTube',
                link: 'https://www.youtube.com/channel/UC78kvg8-eP25FxzQqD1skfQ',
                hoverClass: 'hover:border-[#ff0000]/50 hover:bg-[#ff0000]/10 hover:shadow-[0_0_15px_rgba(255,0,0,0.15)] hover:text-[#ff0000]'
              },
            ].map((item, i) => {
              const Tag = item.link ? 'a' : 'div';
              return (
                <Tag
                  key={i}
                  href={item.link ? item.link : undefined}
                  target={item.link && item.link !== '#' && !item.link.startsWith('mailto:') ? '_blank' : undefined}
                  rel={item.link && item.link !== '#' && !item.link.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 font-medium bg-[#1a1a1a] border border-white/5 transition-all duration-300 ${item.link ? 'cursor-pointer ' + (item.hoverClass || 'hover:bg-white/5') : ''}`}
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-[#111]">
                    {item.icon}
                  </span>
                  <span className="transition-colors duration-300">{item.label}</span>
                  {item.extra}
                </Tag>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── bottom section ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 px-6 md:px-8 pb-6 md:pb-8 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* About Me */}
        <div className="hero-left">
          <h2 className="text-sm font-bold tracking-[0.15em] uppercase mb-3">
            <span className="text-white">About</span> <span className="text-gray-500">Me</span>
          </h2>
          <div className="text-gray-400 text-base sm:text-lg md:text-[1.1rem] leading-[1.7] space-y-5">
            <p>
              I'm Tapan Vachhani, a Computer Science student and aspiring Full-Stack Developer based in India. I enjoy building practical web applications and working across both frontend and backend technologies, with interests in web development, databases, and cloud fundamentals.
            </p>
            <p>
              I work with React, JavaScript, Node.js, and MongoDB to turn ideas into functional projects. In my free time, I explore new technologies, play video games, and build personal projects. I'm always open to learning, collaboration, and new opportunities.
            </p>
          </div>
        </div>

        {/* Current Status */}
        <div className="hero-right flex flex-col md:mt-2 lg:mt-0">
          <h2 className="text-sm font-bold tracking-[0.15em] uppercase mb-4">
            <span className="text-white">Current</span> <span className="text-gray-500">Status</span>
          </h2>
          <div
            className="flex items-center gap-5 px-5 py-5 rounded-2xl transition-all group shadow-xl"
            style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="bg-[#1DCD9F] text-black w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(29,205,159,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Laptop size={22} />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[#1DCD9F] text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1DCD9F] animate-pulse"></span>
                Actively Building
              </div>
              <div className="text-white font-bold text-[17px] sm:text-lg leading-snug">
                Full-Stack Projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
