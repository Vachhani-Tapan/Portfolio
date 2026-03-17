import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Profiles = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const achievementsRef = useRef(null);

    const stats = [
        { platform: 'LeetCode', count: '250+', label: 'Solved', color: 'from-orange-500 to-yellow-500' },
        { platform: 'GitHub', count: '500+', label: 'Commits', rating: 'Active Contributor', color: 'from-blue-600 to-cyan-400' },
        { platform: 'Hackathons', count: '5+', label: 'Wins/Participation', rating: 'Innovation Focus', color: 'from-indigo-500 to-purple-500' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(gridRef.current.children, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            });

            gsap.from(achievementsRef.current, {
                scrollTrigger: {
                    trigger: achievementsRef.current,
                    start: 'top 90%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="profiles" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Coding <span className="text-cyan-400">Profiles</span></h2>
                    <p className="text-gray-500 max-w-xl font-medium">Quantifying my progress and passion for problem-solving across various platforms.</p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-[2rem] blur opacity-[0.02] group-hover:opacity-10 transition duration-700`}></div>
                            <div className="relative bg-white/[0.02] border border-white/5 p-12 rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm">
                                <h3 className="text-sm font-black text-gray-500 mb-6 uppercase tracking-[0.2em]">{stat.platform}</h3>
                                <div className="text-6xl font-black text-white mb-4 transition-transform duration-500 group-hover:scale-110 tracking-tighter">
                                    {stat.count}
                                </div>
                                <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{stat.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={achievementsRef} className="mt-16 bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 text-center">
                    <h4 className="text-white font-black mb-8 uppercase tracking-widest text-sm">Notable Milestones</h4>
                    <div className="flex flex-wrap justify-center gap-10">
                        {['🏆 Local Hackathon Finalist', '📜 AWS Certified Cloud Practitioner', '🏅 Dean\'s List Excellence'].map((item) => (
                            <span key={item} className="text-gray-500 hover:text-white transition-colors cursor-default text-sm font-bold uppercase tracking-tighter">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profiles;
