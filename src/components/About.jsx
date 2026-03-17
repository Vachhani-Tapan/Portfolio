import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (imageRef.current) {
                gsap.set(imageRef.current, { x: -100, opacity: 0 });
                gsap.to(imageRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    overwrite: 'auto'
                });
            }

            if (contentRef.current && contentRef.current.children) {
                gsap.set(contentRef.current.children, { y: 50, opacity: 0 });
                gsap.to(contentRef.current.children, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <div ref={imageRef} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-white/[0.02] rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8 border border-white/5">
                                <div className="text-center">
                                    <svg className="w-40 h-40 text-cyan-500/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <p className="text-gray-600 italic text-sm font-mono tracking-widest uppercase">Building with passion</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={contentRef} className="md:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
                            About <span className="text-cyan-400">Me</span>
                        </h2>
                        <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                            <p>
                                I’m Tapan Vachhani, a Computer Science student and aspiring Full-Stack Developer based in India. I enjoy building practical web applications and working across both frontend and backend technologies, with interests in web development, databases, and cloud fundamentals.
                            </p>
                            <p>
                                I work with React, JavaScript, Node.js, and MongoDB to turn ideas into functional projects. In my free time, I explore new technologies, play video games, and build personal projects. I’m always open to learning, collaboration, and new opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
