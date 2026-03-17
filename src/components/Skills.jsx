import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    // Default to the first skill
    const defaultSkill = {
        name: 'C++',
        desc: 'High-performance application development, system programming, and competitive coding.',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
    };
    const [selectedSkill, setSelectedSkill] = React.useState(defaultSkill);

    const categories = [
        {
            title: 'Programming',
            skills: [
                { name: 'C', desc: 'Foundational programming and algorithmic problem solving.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
                { name: 'C++', desc: 'High-performance application development, system programming, and competitive coding.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
                { name: 'JavaScript', desc: 'Modern ES6+ syntax, asynchronous programming, and DOM manipulation.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            ]
        },
        {
            title: 'Web Dev',
            skills: [
                { name: 'HTML', desc: 'The standard markup language for documents designed to be displayed in a web browser.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                { name: 'CSS', desc: 'Style sheet language used for describing the presentation of a document written in HTML.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                { name: 'JavaScript', desc: 'Modern ES6+ syntax, asynchronous programming, and DOM manipulation.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'Node.js', desc: 'Server-side JavaScript runtime for building scalable network applications.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Express', desc: 'Fast, unopinionated, minimalist web framework for Node.js.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                { name: 'React', desc: 'Building dynamic, component-based user interfaces with Hooks and Context API.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'Tailwind', desc: 'Utility-first CSS framework for rapid UI development and custom designs.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' }
            ]
        },
        {
            title: 'Tools',
            skills: [
                { name: 'Git', desc: 'Distributed version control system for tracking changes and collaboration.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                { name: 'GitHub', desc: 'Hosting service for version control and collaboration.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                { name: 'VS Code', desc: 'Powerful code editor with extensive extension ecosystem.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                { name: 'Postman', desc: 'API platform for building and using APIs.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' }
            ]
        },
        {
            title: 'Databases',
            skills: [
                { name: 'MongoDB', desc: 'NoSQL database for flexible JSON-like data storage and rapid iteration.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'Redis', desc: 'In-memory data structure store, used as a database, cache, and message broker.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
            ]
        },
        {
            title: 'Deployment',
            skills: [
                { name: 'Netlify', desc: 'Platform for automating modern web projects recommended for static sites.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
                { name: 'Vercel', desc: 'Cloud platform for static sites and Serverless component deployment.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
                { name: 'Render', desc: 'Unified cloud to build and run all your apps and websites.', img: 'https://cdn.simpleicons.org/render/white' },
            ]
        },
        {
            title: 'Design',
            skills: [
                { name: 'Figma', desc: 'Interface design tool for vector graphics and prototyping.', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' }
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRef.current && gridRef.current.children) {
                gsap.set(gridRef.current.children, { opacity: 0, y: 60 }); // Ensure initial state
                gsap.to(gridRef.current.children, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    overwrite: 'auto' // Prevent conflict
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Technical <span className="text-cyan-400">Skills</span></h2>
                    <div className="w-24 h-1 bg-cyan-400 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Skills Grid - LEFT SIDE */}
                    <div ref={gridRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {categories.map((category) => (
                            <div key={category.title} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 group h-full flex flex-col shadow-lg backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center group-hover:text-cyan-400 transition-colors">
                                    <span className="w-8 h-8 bg-cyan-400/10 text-cyan-400 rounded-lg flex items-center justify-center mr-3 font-mono text-xs uppercase">
                                        {category.icon}
                                    </span>
                                    {category.title}
                                </h3>

                                <div className="grid grid-cols-4 gap-3">
                                    {category.skills.map((skill) => (
                                        <button
                                            key={skill.name}
                                            onClick={() => setSelectedSkill(skill)}
                                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 group/skill aspect-square ${selectedSkill?.name === skill.name
                                                ? 'bg-cyan-400/20 border-cyan-400 scale-105 shadow-xl shadow-cyan-400/20'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105'
                                                }`}
                                            title={skill.name}
                                        >
                                            <div className="w-8 h-8 mb-2 flex items-center justify-center">
                                                <img
                                                    src={skill.img}
                                                    alt={skill.name}
                                                    className={`w-full h-full object-contain filter transition-all duration-300 ${(skill.name === 'Express' || skill.name === 'GitHub' || skill.name === 'Vercel' || skill.name === 'Next.js' || skill.name === 'Render' || skill.name === 'Unix' || skill.name === 'Bash')
                                                        ? 'invert opacity-80 group-hover/skill:opacity-100'
                                                        : ''
                                                        }`}
                                                />
                                            </div>
                                            <span className={`text-[10px] font-bold text-center truncate w-full ${selectedSkill?.name === skill.name ? 'text-cyan-400' : 'text-gray-500 group-hover/skill:text-gray-300'
                                                }`}>
                                                {skill.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Details Panel - RIGHT SIDE (Sticky) */}
                    <div className="lg:w-1/3 w-full lg:sticky lg:top-32">
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl min-h-[400px] flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none"></div>

                            <div className="mb-8 relative z-10">
                                <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase border border-cyan-400/30 px-3 py-1 rounded-full">Skill Details</span>
                            </div>

                            {selectedSkill ? (
                                <div className="animate-fade-in w-full flex flex-col items-center relative z-10">
                                    <div className="w-28 h-28 bg-white/5 rounded-3xl p-6 mb-6 ring-1 ring-white/10 shadow-lg flex items-center justify-center">
                                        <img
                                            src={selectedSkill.img}
                                            alt={selectedSkill.name}
                                            className={`w-full h-full object-contain filter drop-shadow-lg ${(selectedSkill.name === 'Express' || selectedSkill.name === 'GitHub' || selectedSkill.name === 'Vercel' || selectedSkill.name === 'Next.js' || selectedSkill.name === 'Render' || selectedSkill.name === 'Unix' || selectedSkill.name === 'Bash')
                                                ? 'invert'
                                                : ''
                                                }`}
                                        />
                                    </div>

                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight">{selectedSkill.name}</h3>

                                    <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/5 text-left">
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            {selectedSkill.desc}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 italic">
                                    Select a skill to view details
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
