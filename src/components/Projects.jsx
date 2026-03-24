import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    const projects = [
        {
            name: 'Expense Management System',
            description: 'A full-stack application for managing daily tasks with real-time updates and categorization features.',
            tech: ['React', 'Node.js', 'MongoDB'],
            repo: 'https://github.com/Vachhani-Tapan/Expense-Management-System',
            demo: 'https://expense-management-system-v1.render.com/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773736813/legdercoreimg_g8o3yp.jpg'
        },
        {
            name: 'FinWise AI',
            description: 'AI-powered personal finance system that analyzes spending, investments, and goals to deliver personalized insights, smart recommendations, alerts, and dynamic planning for improved financial health and future goal achievement.',
            tech: ['React', 'Node.js', 'MongoDB'],
            repo: 'https://github.com/Vachhani-Tapan/finwiseai-1',
            demo: 'https://finwiseai-1-yvg4.vercel.app/login',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1774370854/finwisescreenshot_vflxu5.jpg'
        },
        {
            name: 'Udaan Website Clone',
            description: 'A frontend clone inspired by the Udaan website, built using HTML and CSS, recreating its business marketplace layout and structured design.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Udaan',
            demo: 'https://udaanwebclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773736813/udaanicon_rdoxcb.jpg'
        },
        {
            name: 'Urban Monkey Clone',
            description: 'A frontend clone inspired by the Urban Monkey website built using HTML and CSS, recreating its modern layout and stylish design.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/urbanmonkey',
            demo: 'https://urbanmonkeyclone1.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773737038/urbanmonkeyicon_rnenqs.jpg'
        },
        {
            name: 'DataBricks Clone',
            description: 'A responsive Databricks-inspired frontend clone built using HTML and CSS, replicating the platforms layout and UI components.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Databricks',
            demo: 'https://databricksclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773737037/databrickicon_vsh4ow.jpg'
        },
        {
            name: 'My Ether Wallet Clone',
            description: 'A frontend clone inspired by MyEtherWallet, developed using HTML and CSS, replicating its clean layout, wallet interface sections, and modern design.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/myetherwallet',
            demo: 'https://myetherwalletclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773736872/etherwalleticon_zh065p.jpg'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRef.current && gridRef.current.children) {
                gsap.set(gridRef.current.children, { opacity: 0, y: 80 });
                gsap.to(gridRef.current.children, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power4.out',
                    overwrite: 'auto'
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Featured <span className="text-cyan-400">Projects</span></h2>
                        <p className="text-gray-500 font-medium">Pushing boundaries with code and creativity.</p>
                    </div>
                    <a href="https://github.com/Vachhani-Tapan" target="_blank" className="text-cyan-400 hover:underline font-black text-sm tracking-widest uppercase">View All &rarr;</a>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="group bg-white/[0.03] overflow-hidden border border-white/[0.06] rounded-lg transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/[0.05]"
                        >
                            {/* Image */}
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                                        <span className="text-5xl opacity-10 group-hover:opacity-30 transition-all duration-500">📁</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-sm border border-cyan-400/20">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 uppercase tracking-tight leading-tight">{project.name}</h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{project.description}</p>

                                {/* Links */}
                                <div className="flex gap-5 pt-3 border-t border-white/[0.06]">
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                        </svg>
                                        Repo
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                            <polyline points="15 3 21 3 21 9"/>
                                            <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
