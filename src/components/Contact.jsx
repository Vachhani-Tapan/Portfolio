import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const infoRef = useRef(null);
    const formRef = useRef(null);
    const [state, handleSubmit] = useForm("mdawyeqw");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(infoRef.current.children, {
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: 'top 85%',
                },
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            });

            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 85%',
                },
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    <div ref={infoRef} className="lg:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">Let's <span className="text-cyan-400">Connect</span></h2>
                        <p className="text-gray-500 text-xl mb-12 leading-relaxed font-medium">
                            Open for discussions on internships, open-source collaborations, or just a technical chat. Let's build something impactful together.
                        </p>

                        <div className="space-y-8">
                            {[
                                { 
                                    label: 'Email', 
                                    value: 'tapan.vachhani.cg@gmail.com', 
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                                    url: 'mailto:tapan.vachhani.cg@gmail.com'
                                },
                                { 
                                    label: 'LinkedIn', 
                                    value: 'tapan-vachhani', 
                                    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
                                    url: 'https://www.linkedin.com/in/tapan-vachhani/'
                                },
                                { 
                                    label: 'LeetCode', 
                                    value: 'TapanVachhani', 
                                    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.828.662s-1.363-.195-1.835-.662l-9.032-8.729c-.466-.467-.714-1.071-.714-1.675 0-.604.248-1.208.714-1.675l9.032-8.729c.472-.467 1.118-.662 1.835-.662s1.362.195 1.828.662l2.697 2.606c.514.515.514 1.396 0 1.911-.514.515-1.353.515-1.867 0l-2.32-2.279L5.344 10.158l7.658 7.393 2.32-2.279c.514-.515 1.353-.515 1.867 0 .514.515.514 1.396 0 1.911v-.153z" fill="white" />
                                        <path d="M22 13h-7.5c-.552 0-1-.448-1-1s.448-1 1-1H22c.552 0 1 .448 1 1s-.448 1-1 1z" fill="#9CA3AF" />
                                        <path d="M18.371 5.586l-1.252 1.252-4.008-4.008 1.252-1.252a1.414 1.414 0 112 2l2.008 2.008z" fill="#FFA116" />
                                      </svg>,
                                    url: 'https://leetcode.com/u/TapanVachhani/'
                                },
                                { 
                                    label: 'GitHub', 
                                    value: 'Vachhani-Tapan', 
                                    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                                    url: 'https://github.com/Vachhani-Tapan'
                                }
                            ].map((item, idx) => (
                                <a 
                                    key={idx} 
                                    href={item.url} 
                                    target={item.label === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-6 group cursor-pointer"
                                >
                                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:bg-cyan-400/5 transition-all duration-500 text-gray-400">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">{item.label}</p>
                                        <p className="text-white group-hover:text-cyan-400 transition-colors font-bold text-lg">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div ref={formRef} className="bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden backdrop-blur-sm">
                            {state.succeeded ? (
                                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-cyan-400/10 border border-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-400 mb-8 font-medium">Thank you for reaching out. I'll <span className="text-cyan-400">contact soon to you</span>.</p>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="text-cyan-400 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-600 mb-3 uppercase tracking-[0.2em]">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="full-name"
                                            placeholder="Enter your name"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
                                        />
                                        <ValidationError 
                                            prefix="Name" 
                                            field="name"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-600 mb-3 uppercase tracking-[0.2em]">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
                                        />
                                        <ValidationError 
                                            prefix="Email" 
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-600 mb-3 uppercase tracking-[0.2em]">Message</label>
                                        <textarea
                                            rows="5"
                                            name="message"
                                            id="message"
                                            placeholder="Write something..."
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-all font-medium resize-none"
                                        ></textarea>
                                        <ValidationError 
                                            prefix="Message" 
                                            field="message"
                                            errors={state.errors}
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={state.submitting}
                                        className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-cyan-400 transition-all tracking-widest uppercase text-sm shadow-xl shadow-cyan-400/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {state.submitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
