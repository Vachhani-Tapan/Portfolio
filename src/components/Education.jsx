import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    const education = [
        {
            degree: 'B.Tech in Computer Science',
            institution: 'Swaminarayan University',
            duration: '2025 - 2029',
            details: 'Specializing in Software Engineering. Maintaining high excellence in core CS fundamentals.',
            coursework: ['Data Structures', 'Algorithms', 'DBMS', 'OS', 'MERN Stack']
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(timelineRef.current.children, {
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 85%',
                },
                x: -50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.4,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="education" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Academic <span className="text-cyan-400">Journey</span></h2>
                    <div className="w-24 h-1 bg-cyan-400 rounded-full"></div>
                </div>

                <div ref={timelineRef} className="max-w-4xl">
                    {education.map((edu, idx) => (
                        <div key={idx} className="relative pl-12 border-l border-white/10 pb-12 last:pb-0">
                            <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>

                            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2rem] hover:border-cyan-400/20 transition-all duration-500">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{edu.degree}</h3>
                                    <span className="text-cyan-400 text-xs font-black bg-cyan-400/10 px-4 py-1.5 rounded-full border border-cyan-400/20 tracking-widest">{edu.duration}</span>
                                </div>

                                <h4 className="text-lg text-gray-500 font-bold mb-4 uppercase tracking-tighter">{edu.institution}</h4>
                                <p className="text-gray-400 mb-8 leading-relaxed font-medium italic text-lg">{edu.details}</p>

                                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Core Focus:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {edu.coursework.map((course) => (
                                        <span key={course} className="text-[10px] font-black px-4 py-1.5 bg-white/[0.03] text-gray-400 rounded-lg border border-white/5 uppercase tracking-widest">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
