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
            name: 'My Ether Wallet Clone',
            description: 'A frontend clone inspired by MyEtherWallet, developed using HTML and CSS, replicating its clean layout, wallet interface sections, and modern design while emphasizing responsive structure and a user-friendly cryptocurrency dashboard experience.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/myetherwallet',
            demo: 'https://myetherwalletclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773736872/etherwalleticon_zh065p.jpg'
        },
        {
            name: 'Udaan Website Clone',
            description: 'A frontend clone inspired by the Udaan website, built using HTML and CSS, recreating its business marketplace layout, product listing sections, and structured design while focusing on responsiveness and a clean user interface.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Udaan',
            demo: 'https://udaanwebclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773736813/udaanicon_rdoxcb.jpg'
        },
        {
            name: 'Urban Monkey Clone',
            description: 'A frontend clone inspired by the Urban Monkey website built using HTML and CSS, recreating its modern layout, product sections, and stylish design while focusing on responsive structure and clean user interface elements.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/urbanmonkey',
            demo: 'https://urbanmonkeyclone1.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773737038/urbanmonkeyicon_rnenqs.jpg'
        },
        {
            name: 'DataBricks Clone',
            description: 'A responsive Databricks-inspired frontend clone built using HTML and CSS, replicating the platform’s layout and UI components. Focuses on clean design, structured sections, and responsive styling to simulate a modern data platform interface.',
            tech: ['HTML', 'CSS'],
            repo: 'https://github.com/Vachhani-Tapan/Website_Clones/tree/main/Databricks',
            demo: 'https://databricksclone.netlify.app/',
            image: 'https://res.cloudinary.com/dgcmeb8ec/image/upload/v1773737037/databrickicon_vsh4ow.jpg'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRef.current && gridRef.current.children) {
                gsap.set(gridRef.current.children, { opacity: 0, y: 100 });
                gsap.to(gridRef.current.children, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.3,
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
                    <a href="https://github.com" target="_blank" className="text-cyan-400 hover:underline font-black text-sm tracking-widest uppercase">View All &rarr;</a>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, idx) => (
                        <div key={idx} className="group bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-cyan-400/30">
                            <div className="h-64 bg-white/[0.03] relative overflow-hidden">
                                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-700 z-10"></div>
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-7xl opacity-10 group-hover:opacity-30 transition-all duration-700 transform group-hover:scale-110">📁</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-[10px] uppercase font-black tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{project.name}</h3>
                                <p className="text-gray-500 mb-8 line-clamp-2 text-lg font-medium">{project.description}</p>

                                <div className="flex gap-6">
                                    <a href={project.repo} className="text-sm font-black uppercase tracking-widest text-white border-b-2 border-white/10 hover:border-cyan-400 transition-all pb-1">
                                        Repository
                                    </a>
                                    <a href={project.demo} className="text-sm font-black uppercase tracking-widest text-cyan-400 border-b-2 border-transparent hover:border-cyan-400 transition-all pb-1">
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
