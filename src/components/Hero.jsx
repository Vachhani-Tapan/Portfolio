import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const containerRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const socialsRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(title1Ref.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
        )
            .fromTo(title2Ref.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                '-=1'
            )
            .fromTo(".socials-link",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                '-=0.5'
            );
    }, []);

    return (
        <section ref={containerRef} id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center">
                    <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-6 tracking-tighter overflow-hidden">
                        <span ref={title1Ref} className="inline-block">TAPAN</span>
                        <br />
                        <span className="inline-block text-cyan-400">VACHHANI</span>
                    </h1>

                    <div className="overflow-hidden mb-12">
                        <p ref={title2Ref} className="text-xl md:text-3xl text-gray-400 uppercase tracking-[0.3em] font-bold">
                            Developer <span className="text-cyan-400">+</span> Programmer
                        </p>
                    </div>

                    <div ref={socialsRef} className="flex justify-center gap-6 md:gap-10">
                        {[
                            { id: 'github', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, url: 'https://github.com/Vachhani-Tapan' },
                            { id: 'linkedin', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, url: 'https://www.linkedin.com/in/tapan-vachhani-691433394/' },
                            { id: 'leetcode', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.828.662s-1.363-.195-1.835-.662l-9.032-8.729c-.466-.467-.714-1.071-.714-1.675 0-.604.248-1.208.714-1.675l9.032-8.729c.472-.467 1.118-.662 1.835-.662s1.362.195 1.828.662l2.697 2.606c.514.515.514 1.396 0 1.911-.514.515-1.353.515-1.867 0l-2.32-2.279L5.344 10.158l7.658 7.393 2.32-2.279c.514-.515 1.353-.515 1.867 0 .514.515.514 1.396 0 1.911v-.153z" fill="white" />
                                <path d="M22 13h-7.5c-.552 0-1-.448-1-1s.448-1 1-1H22c.552 0 1 .448 1 1s-.448 1-1 1z" fill="#9CA3AF" />
                                <path d="M18.371 5.586l-1.252 1.252-4.008-4.008 1.252-1.252a1.414 1.414 0 112 2l2.008 2.008z" fill="#FFA116" />
                              </svg>, url: 'https://leetcode.com/u/TapanVachhani/' },
                            { id: 'email', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, url: 'mailto:tapan.vachhani.cg@gmail.com' },
                            { id: 'resume', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-6 4h6m-6-8h1"/></svg>, url: 'https://drive.google.com/file/d/1AlNn6g29CZ5SJ9PW6xf23Te-H2KT5lk_/view' },
                            { id: 'youtube', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, url: 'https://www.youtube.com/channel/UC78kvg8-eP25FxzQqD1skfQ' }
                        ].map((social, idx) => (
                            <a 
                                key={social.id}
                                href={social.url}
                                target={social.id === 'email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-500 group socials-link"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center p-1">
                <div className="w-1.5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
        </section>
    );
};

export default Hero;
