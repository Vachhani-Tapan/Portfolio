import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import projectsData from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

/* ── GitHub SVG icon ── */
const GithubSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ProjectCard = ({ project, index, total }) => {
  const stickyTop = 80 + index * 40;

  return (
    <div
      className="sticky mb-24 md:mb-32 journey-card opacity-0"
      style={{ top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      <div
        className="w-full rounded-[24px] overflow-hidden flex flex-col shadow-2xl h-auto"
        style={{
          background: '#040404',
          border: '1px solid #2a2a2a',
          minHeight: '380px',
        }}
      >
        {/* ── Top Row: Title ── */}
        <div className="w-full px-6 pt-6 pb-3 md:px-8 md:pt-8 md:pb-4 flex flex-col justify-center">
          <h3
            className="text-[2.2rem] md:text-[2.8rem] text-[#f2f2f2] leading-none font-medium tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            {project.title}
          </h3>
        </div>

        {/* ── Full Width Divider ── */}
        <div className="w-full h-px bg-[#2a2a2a]" />

        {/* ── Bottom Row: Content & Image ── */}
        <div className="w-full flex flex-col lg:flex-row flex-1">
          {/* Bottom Left: text content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center border-r border-[#2a2a2a]">
            <p className="text-white text-[14.5px] md:text-[16px] font-bold tracking-wide mb-4">
              {project.description}
            </p>

            <ul className="space-y-2 mb-5 w-full">
              {project.points.map((pt, i) => (
                <li key={i} className="text-gray-300 text-[14px] font-medium flex items-start gap-2.5">
                  <span className="text-white font-bold leading-none mt-1">{`>`}</span>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center gap-2 text-[11px] font-bold px-3 py-1.5 min-h-[28px] rounded-full text-gray-300 border border-white/20 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white hover:border-white/50 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] cursor-default"
                >
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 min-h-[38px] rounded-full text-[13px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
              >
                GitHub <GithubSvg />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 min-h-[38px] rounded-full text-[13px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
              >
                Live Site <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Bottom Right: project image */}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:w-[50%] flex-shrink-0 relative group min-h-[250px] lg:min-h-full overflow-hidden block"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
              style={{ objectPosition: 'left top' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

// Extracted normal mobile card identical to AllProjects to satisfy mobile view
const MobileProjectCard = ({ project }) => (
  <div
    className="group rounded-[20px] overflow-hidden flex flex-col shadow-2xl mb-8"
    style={{
      background: '#040404',
      border: '1px solid #2a2a2a',
    }}
  >
    {/* ── Image at Top ── */}
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
    </a>

    {/* ── Divider ── */}
    <div className="w-full h-px bg-[#2a2a2a]" />

    {/* ── Content ── */}
    <div className="p-6 flex flex-col flex-1">
      <h3
        className="text-[1.6rem] text-[#f2f2f2] leading-tight font-medium tracking-tight mb-3"
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
            className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold px-2.5 py-1 min-h-[24px] rounded-full text-gray-300 border border-white/15 bg-transparent"
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
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent"
        >
          GitHub <GithubSvg />
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 min-h-[34px] rounded-full text-[12px] font-bold text-white border border-white/25 bg-transparent"
        >
          Live <ExternalLink size={14} />
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const container = useRef(null);

  // Apply GSAP animation ONLY to desktop elements
  useGSAP(() => {
    // Media query equivalent matching our md: breakpoint
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray(".journey-card").forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, container);

    return () => ctx.revert();
  }, { scope: container });

  return (
    <div className="w-full" ref={container}>
      <div className="mb-4">
        <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Explore My Creations
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white">Project Showcase</h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-6 mb-2" />
      </div>

      {/* Mobile Layout: Normal vertical stacking like AllProjects.jsx */}
      <div className="mt-8 flex md:hidden flex-col">
        {projectsData.slice(0, 4).map((project, index) => (
          <MobileProjectCard
            key={index}
            project={project}
          />
        ))}
      </div>

      {/* Desktop/Tablet Layout: Sticky Stacking cards */}
      <div className="mt-12 relative pb-4 md:pb-8 hidden md:block">
        {projectsData.slice(0, 4).map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            total={4}
          />
        ))}
      </div>

      {/* ── All Projects Button ── */}
      <div className="flex justify-center mt-4">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[15px] font-bold text-white border border-white/25 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_4px_24px_rgba(255,255,255,0.3)]"
        >
          All Projects
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Projects;
