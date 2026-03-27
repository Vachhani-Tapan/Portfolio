import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                    <div>
                        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Portfolio<span className="text-cyan-400">.</span></h3>
                        <p className="text-gray-500 text-sm max-w-xs font-medium">
                            Pure Black Edition. Built with React, Tailwind, and Framer Motion.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 font-bold text-sm">
                        <div className="flex gap-6 md:gap-8">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                GITHUB
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                LINKEDIN
                            </a>
                            <a href="mailto:contact@example.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                EMAIL
                            </a>
                        </div>
                        <div className="hidden md:block w-px h-4 bg-white/10"></div>
                        <p className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <span className="text-cyan-400">CALL:</span> +91 92270 93044
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 flex justify-center items-center">
                    <p className="text-gray-500 text-xs text-center">
                        &copy; {new Date().getFullYear()} [Your Name]. All rights reserved. Made for B.Tech CS Portfolio.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
