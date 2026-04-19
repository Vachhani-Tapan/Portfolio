import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import projectsData from '../data/projectsData';
import figmaData from '../data/figmaData';
import gameData from '../data/gameData';

/* ── GitHub SVG icon ── */
const GithubSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const AllProjects = () => {
  const [activeTab, setActiveTab] = useState('web');

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
            Complete Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">All Projects</h2>
          <p className="text-gray-400 text-base max-w-xl">
            A comprehensive collection of every project I've built — from full-stack platforms to utility apps.
          </p>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab('web')}
            className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all duration-300 ${
              activeTab === 'web'
                ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.3)]'
                : 'bg-transparent text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            Web Projects
          </button>
          <button
            onClick={() => setActiveTab('uiux')}
            className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all duration-300 ${
              activeTab === 'uiux'
                ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.3)]'
                : 'bg-transparent text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            UI/UX & Figma
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all duration-300 ${
              activeTab === 'games'
                ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.3)]'
                : 'bg-transparent text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            Games
          </button>
        </motion.div>

        {/* ── Grid Area ── */}
        {activeTab === 'web' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]"
              style={{
                background: '#040404',
                border: '1px solid #2a2a2a',
              }}
            >
              {/* ── Image ── */}
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-[220px] overflow-hidden block"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                  style={{ objectPosition: 'left top' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    View Live ↗
                  </span>
                </div>
              </a>

              {/* ── Divider ── */}
              <div className="w-full h-px bg-[#2a2a2a]" />

              {/* ── Content ── */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-[1.6rem] md:text-[1.8rem] text-[#f2f2f2] leading-tight font-medium tracking-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  {project.title}
                </h3>

                <p className="text-gray-400 text-[13.5px] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* ── Points ── */}
                <ul className="space-y-1.5 mb-5">
                  {project.points.map((pt, i) => (
                    <li key={i} className="text-gray-300 text-[13px] font-medium flex items-start gap-2">
                      <span className="text-white/60 font-bold leading-none mt-0.5">{'>'}</span>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* ── Tags ── */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold px-2.5 py-1 min-h-[24px] rounded-full text-gray-300 border border-white/15 bg-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-white/40 cursor-default"
                    >
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* ── Buttons ── */}
                <div className="flex items-center gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                  >
                    GitHub <GithubSvg />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                  >
                    Live Site <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'uiux' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {figmaData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="group rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]"
                style={{
                  background: '#040404',
                  border: '1px solid #2a2a2a',
                }}
              >
                {/* ── Image ── */}
                <a
                  href={project.liveLink && project.liveLink !== '#' ? project.liveLink : project.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-[220px] overflow-hidden block border-b border-[#2a2a2a]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                    style={{ objectPosition: 'left top' }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      View Live ↗
                    </span>
                  </div>
                </a>

                {/* ── Content ── */}
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-[1.6rem] md:text-[1.8rem] text-[#f2f2f2] leading-tight font-medium tracking-tight mb-3"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-[13.5px] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* ── Points ── */}
                  <ul className="space-y-1.5 mb-5">
                    {project.points.map((pt, i) => (
                      <li key={i} className="text-gray-300 text-[13px] font-medium flex items-start gap-2">
                        <span className="text-white/60 font-bold leading-none mt-0.5">{'>'}</span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ── Tags ── */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold px-2.5 py-1 min-h-[24px] rounded-full text-gray-300 border border-white/15 bg-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-white/40 cursor-default"
                      >
                        {tag.icon}
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  {/* ── Buttons ── */}
                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" className="w-3.5 h-3.5" />
                      View UI
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'games' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gameData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="group rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]"
                style={{
                  background: '#040404',
                  border: '1px solid #2a2a2a',
                }}
              >
                {/* ── Image ── */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-[220px] overflow-hidden block border-b border-[#2a2a2a]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                    style={{ objectPosition: 'left top' }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      Play Live ↗
                    </span>
                  </div>
                </a>

                {/* ── Content ── */}
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-[1.6rem] md:text-[1.8rem] text-[#f2f2f2] leading-tight font-medium tracking-tight mb-3"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-[13.5px] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* ── Points ── */}
                  <ul className="space-y-1.5 mb-5">
                    {project.points.map((pt, i) => (
                      <li key={i} className="text-gray-300 text-[13px] font-medium flex items-start gap-2">
                        <span className="text-white/60 font-bold leading-none mt-0.5">{'>'}</span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ── Tags ── */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold px-2.5 py-1 min-h-[24px] rounded-full text-gray-300 border border-white/15 bg-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:border-white/40 cursor-default"
                      >
                        {tag.icon}
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  {/* ── Buttons ── */}
                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                    >
                      GitHub Repo <GithubSvg />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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

export default AllProjects;
