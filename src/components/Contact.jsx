import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import gsap from 'gsap';
import { SiLeetcode } from 'react-icons/si';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const infoRef = useRef(null);
    const formRef = useRef(null);
    const [state, handleSubmit] = useForm("xqegzzvb");

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

                        <svg width="0" height="0" className="absolute">
                            <linearGradient id="leetcodeColorsContact" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFA116" />
                                <stop offset="35%" stopColor="#FFA116" />
                                <stop offset="35%" stopColor="#000000" />
                                <stop offset="45%" stopColor="#000000" />
                                <stop offset="45%" stopColor="#ffffff" />
                                <stop offset="55%" stopColor="#ffffff" />
                                <stop offset="55%" stopColor="#000000" />
                                <stop offset="70%" stopColor="#000000" />
                                <stop offset="70%" stopColor="#FFA116" />
                                <stop offset="100%" stopColor="#FFA116" />
                            </linearGradient>
                        </svg>
                        <div className="space-y-8">
                            {[
                                {
                                    label: 'Gmail',
                                    value: 'tapan.vachhani.cg@gmail.com',
                                    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.636 21h3.819V11.73L0 7.82v11.544c0 .904.732 1.636 1.636 1.636z" fill="#4285F4" /><path d="M18.545 21h3.819c.904 0 1.636-.732 1.636-1.636V7.82l-5.455 3.91z" fill="#34A853" /><path d="M18.545 4.636v7.093L24 7.82V5.457c0-2.023-2.31-3.178-3.927-1.964z" fill="#FBBC05" /><path d="M5.455 11.73V4.637L12 9.548l6.545-4.91v7.093L12 16.636z" fill="#EA4335" /><path d="M0 5.457v2.363l5.455 3.91V4.636L3.927 3.493C2.31 2.279 0 3.434 0 5.457z" fill="#C5221F" /></svg>,
                                    url: 'mailto:tapan.vachhani.cg@gmail.com',
                                    hoverBorder: 'group-hover:border-[#EA4335]',
                                    hoverBg: 'group-hover:bg-[#EA4335]/10',
                                    hoverText: 'group-hover:text-[#EA4335]',
                                    hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(234,67,53,0.15)]'
                                },
                                {
                                    label: 'LinkedIn',
                                    value: 'tapan-vachhani',
                                    icon: <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5z" fill="#0A66C2" /><path d="M8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#ffffff" /></svg>,
                                    url: 'https://www.linkedin.com/in/tapan-vachhani/',
                                    hoverBorder: 'group-hover:border-[#0A66C2]',
                                    hoverBg: 'group-hover:bg-[#0A66C2]/10',
                                    hoverText: 'group-hover:text-[#0A66C2]',
                                    hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(10,102,194,0.15)]'
                                },
                                {
                                    label: 'LeetCode',
                                    value: 'TapanVachhani',
                                    icon: <SiLeetcode className="w-6 h-6" />,
                                    url: 'https://leetcode.com/u/TapanVachhani/',
                                    hoverBorder: 'group-hover:border-[#FFA116]',
                                    hoverBg: 'group-hover:bg-[#FFA116]/10',
                                    hoverText: 'group-hover:text-[#FFA116]',
                                    hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(255,161,22,0.15)]'
                                },
                                {
                                    label: 'GitHub',
                                    value: 'Vachhani-Tapan',
                                    icon: <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
                                    url: 'https://github.com/Vachhani-Tapan',
                                    hoverBorder: 'group-hover:border-white/40',
                                    hoverBg: 'group-hover:bg-white/5',
                                    hoverText: 'group-hover:text-white',
                                    hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.url}
                                    target={item.label === 'Email' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-6 group cursor-pointer"
                                >
                                    <div className={`w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 ${item.hoverBorder} ${item.hoverBg} ${item.hoverShadow}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">{item.label}</p>
                                        <p className={`text-white transition-colors font-bold text-lg ${item.hoverText}`}>{item.value}</p>
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
