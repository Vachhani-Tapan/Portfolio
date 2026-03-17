import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(6); // Start with 6

    const certificates = [
        {
            id: 1,
            title: "Introduction to Generative AI",
            issuer: "Google Cloud",
            date: "1st Jan 2026",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770454142/Introduction_to_Generative_AI_page-0001_rcqrli.jpg", // Placeholder
            linkImg: "#",
            linkPdf: "#",
            color: "from-orange-400 to-yellow-500" // Custom gradient matching AWS
        },
        {
            id: 2,
            title: "Github Copilot Fundamentals",
            issuer: "Microsoft",
            date: "25th Dec 2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770454138/Github_Copilot_Certificate_iekyjm.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-blue-400 to-purple-500"
        },
        // Add more placeholders to test "Load More"
        {
            id: 3,
            title: "Solution Architecture Job Simulation",
            issuer: "AWS",
            date: "5th Feb 2026",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770456036/AWS_simulator_Certificate_page-0001_wzcgpp.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-pink-500 to-rose-500"
        },
        {
            id: 4,
            title: "Software Engineering Job Simulation",
            issuer: "JP Morgan Chase & Co.",
            date: "5th Feb 2026",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770456037/JP_MORGAN_simulator_Certificate_page-0001_fm8glw.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-green-400 to-emerald-600"
        },
        {
            id: 5,
            title: "Digital Skills: User Experience",
            issuer: "Future Learn",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770454138/digital-skills-user-experience_certificate_of_achievement_7fjpjgq_page-0001_uo0yqn.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-green-400 to-emerald-600"
        },
        {
            id: 6,
            title: "Artificial Intelligence",
            issuer: "Future Learn",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770467275/artificial-intelligence_certificate_of_achievement_2efdmsq_page-0001_y8q5gf.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-green-400 to-emerald-600"
        },
        {
            id: 7,
            title: "RepoReboot Hackathon",
            issuer: "DAIICT",
            date: "1st-Runner Up",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770454142/Repo_reboot_daiict_certificate_page-0001_kgmmlq.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 8,
            title: "TechExpo Hackathon",
            issuer: "Parul University",
            date: "3rd Feb 2026",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770470435/Parul_University_certificate_page-0001_out5w7.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 9,
            title: "CodeMatrix Hackathon Participation",
            issuer: "GDG DR AITD, Kanpur",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770467872/CodeMatrix_Cert._of_Participation_page-0001_uocy5l.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 10,
            title: "CodeMatrix Hackathon Excellence",
            issuer: "GDG DR AITD, Kanpur",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770467872/CodeMatrix_Cert._of_Excellence_page-0001_m8oxov.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 11,
            title: "Hack4Us Hackathon",
            issuer: "Maharaja Surajmal Institute of Technology(MSI),New Delhi",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770468828/Hack4Us_Cert._of_Participation_page-0001_sgyi0q.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 12,
            title: "Build With Gemini Hackathon",
            issuer: "Cluster Innovation Centre, University of Delhi",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770469817/Build_with_Gemini_nbjjcz.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 13,
            title: "FinAgent Hackathon",
            issuer: "IIT BOMBAY",
            date: "2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770468828/FInAgent_IIT_BOMBAY_Certificate_page-0001_w2t6if.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
        {
            id: 14,
            title: "Problem Solving",
            issuer: "HackerRank",
            date: "21st Dec 2025",
            img: "https://res.cloudinary.com/dgcmeb8ec/image/upload/v1770454140/HackerRank_Problem_Solving_page-0001_dudn0i.jpg",
            linkImg: "#",
            linkPdf: "#",
            color: "from-cyan-400 to-blue-600"
        },
    ];

    const showMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.certificate-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        ScrollTrigger.refresh();
    }, [visibleCount]); // Re-animate when more are added? Or just animate new ones. 
    // Actually, re-running animation on all might be jarring. 
    // Better to just let simple CSS transition handle new ones or specific GSAP.
    // For simplicity, let's stick to CSS fade-in for "Load More" items or simple keyframes.

    return (
        <section ref={sectionRef} id="certificates" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
                        Certificates
                    </h2>
                    <div className="w-24 h-1 bg-cyan-400 rounded-full mx-auto"></div>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {certificates.slice(0, visibleCount).map((cert) => (
                        <div key={cert.id} className="certificate-card group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 flex flex-col">
                            {/* Certificate Image Area */}
                            <div className={`h-64 w-full bg-gradient-to-br ${cert.color} p-1 relative flex items-center justify-center overflow-hidden`}>
                                {/* Inner white card look */}
                                <div className="bg-white w-full h-full rounded-t-xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                    {/* Placeholder content if no real image */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-white p-2">
                                        {cert.img2 ? (
                                            <div className="w-full h-full flex gap-2">
                                                <img src={cert.img} alt={`${cert.title} Page 1`} className="w-1/2 h-full object-contain hover:scale-105 transition-transform duration-500 cursor-pointer" onClick={() => window.open(cert.img, '_blank')} />
                                                <img src={cert.img2} alt={`${cert.title} Page 2`} className="w-1/2 h-full object-contain hover:scale-105 transition-transform duration-500 cursor-pointer" onClick={() => window.open(cert.img2, '_blank')} />
                                            </div>
                                        ) : cert.img ? (
                                            <img src={cert.img} alt={cert.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <div className="text-gray-900 font-bold text-xl uppercase tracking-widest opacity-20 transform -rotate-12 select-none">
                                                    CERTIFICATE
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-cyan-400 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    {cert.issuer} <span className="text-cyan-400 mx-2">•</span> {cert.date}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                    {cert.img2 ? (
                                        <>
                                            <a href={cert.linkImg && cert.linkImg !== '#' ? cert.linkImg : cert.img} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 hover:underline underline-offset-4">
                                                Page 1
                                            </a>
                                            <span className="text-gray-600">|</span>
                                            <a href={cert.linkImg2 && cert.linkImg2 !== '#' ? cert.linkImg2 : cert.img2} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 hover:underline underline-offset-4">
                                                Page 2
                                            </a>
                                        </>
                                    ) : (
                                        (cert.linkImg && cert.linkImg !== '#') || cert.img ? (
                                            <a href={cert.linkImg && cert.linkImg !== '#' ? cert.linkImg : cert.img} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 hover:underline underline-offset-4">
                                                Download Image
                                            </a>
                                        ) : null
                                    )}

                                    {(cert.linkPdf && cert.linkPdf !== '#') ? (
                                        <>
                                            {(cert.img || cert.img2) && <span className="text-gray-600">|</span>}
                                            <a href={cert.linkPdf} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 hover:underline underline-offset-4">
                                                Download PDF
                                            </a>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < certificates.length && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={showMore}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300 uppercase tracking-widest text-sm"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certificates;
