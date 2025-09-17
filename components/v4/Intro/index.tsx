import React from 'react';
import Image from 'next/image';
import attributes from '@/constants/header-attr.json';

const Intro = () => {
    return (
        <div className="relative">
            {/* Hidden checkbox for theme switching */}
            <input
                type="checkbox"
                id="theme-toggle"
                className="sr-only peer"
            />
            {/* Lights off transition overlay */}
            <div className="fixed inset-0 bg-gradient-radial from-transparent via-black/80 to-black opacity-0 pointer-events-none transition-opacity duration-1000 ease-in-out peer-checked:opacity-100 peer-checked:animate-pulse z-50"></div>            {/* Creative Theme Toggle Button */}
            <label
                htmlFor="theme-toggle"
                className="fixed top-6 right-6 z-40 group cursor-pointer"
                aria-label="Toggle between light and dark mode"
            >
                <div className="relative p-3 rounded-full transition-all duration-500 bg-slate-800 peer-checked:bg-white hover:bg-slate-700 peer-checked:hover:bg-gray-100 shadow-lg hover:shadow-xl">
                    {/* Background glow effect */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon container */}
                    <div className="relative w-6 h-6">
                        {/* Sun icon (visible in dark mode) */}
                        <svg
                            className="w-6 h-6 absolute inset-0 text-yellow-400 transition-all duration-500 rotate-0 scale-100 peer-checked:rotate-180 peer-checked:scale-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>

                        {/* Moon icon (visible in light mode) */}
                        <svg
                            className="w-6 h-6 absolute inset-0 text-slate-700 transition-all duration-500 -rotate-180 scale-0 peer-checked:rotate-0 peer-checked:scale-100"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </label>

            <section
                className="page-flip min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-16 lg:py-24 relative overflow-hidden transition-all duration-1000 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 peer-checked:from-gray-50 peer-checked:via-white peer-checked:to-gray-100"
                id={attributes.About}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-4 w-72 h-72 rounded-full blur-3xl animate-pulse transition-all duration-1000 bg-emerald-500/20 peer-checked:bg-emerald-400/30"></div>
                    <div className="absolute bottom-1/4 -right-4 w-96 h-96 rounded-full blur-3xl animate-pulse transition-all duration-1000 [animation-delay:2s] bg-violet-500/20 peer-checked:bg-violet-400/30"></div>
                    <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full blur-3xl animate-pulse transition-all duration-1000 [animation-delay:4s] bg-cyan-500/20 peer-checked:bg-cyan-400/30"></div>
                </div>

                {/* Content Section */}
                <div className="flex-1 max-w-4xl space-y-8 lg:space-y-12 text-center lg:text-left relative z-10 px-2 sm:px-4">
                    {/* Main Heading */}
                    <div className="space-y-4 lg:space-y-6">
                        <div className="relative">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight bg-clip-text text-transparent transition-all duration-1000 bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-400 peer-checked:from-emerald-600 peer-checked:via-cyan-600 peer-checked:to-violet-600">
                                Tat Tvam Asi
                            </h1>
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold blur-sm -z-10 transition-all duration-1000 opacity-20 text-emerald-400 peer-checked:text-emerald-600">
                                Tat Tvam Asi
                            </div>
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-relaxed transition-all duration-1000 text-gray-200 peer-checked:text-gray-800">
                            The cosmos might not be
                            <br />
                            <span className="font-semibold bg-clip-text text-transparent transition-all duration-1000 bg-gradient-to-r from-violet-400 to-pink-400 peer-checked:from-violet-600 peer-checked:to-pink-600">
                                or it might be? ☢️🐱
                            </span>
                        </h2>
                    </div>

                    {/* Intro Paragraphs */}
                    <div className="space-y-6 lg:space-y-8 max-w-3xl mx-auto lg:mx-0">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 peer-checked:from-emerald-400/40 peer-checked:to-cyan-400/40"></div>
                            <p className="relative text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-wide rounded-lg p-6 backdrop-blur-sm transition-all duration-1000 text-gray-300 bg-slate-800/50 border border-slate-700/50 peer-checked:text-gray-700 peer-checked:bg-white/50 peer-checked:border-gray-300/50">
                                Still figuring out why am I here? What is that elusive force, entangled
                                so deeply within me, that dares to project the infinite onto the canvas
                                of my being? <span className="font-medium transition-all duration-1000 text-emerald-400 peer-checked:text-emerald-600">Re-discovering the things but from inside this time.</span>
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-violet-500/30 to-pink-500/20 peer-checked:from-violet-400/40 peer-checked:to-pink-400/30"></div>
                            <p className="relative text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-wide rounded-lg p-6 backdrop-blur-sm transition-all duration-1000 text-gray-300 bg-slate-800/50 border border-slate-700/50 peer-checked:text-gray-700 peer-checked:bg-white/50 peer-checked:border-gray-300/50">
                                The universe might just be a quantum computer where whatever that can
                                happen will happen! <span className="font-medium transition-all duration-1000 text-violet-400 peer-checked:text-violet-600">Wondering if my choices are algorithms in motion or
                                    merely outcomes of probabilities collapsing into reality.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                {/* Image Section */}
                <div className="flex-shrink-0 w-full lg:w-1/2 xl:w-2/5 relative">
                    <div className="relative max-w-md mx-auto lg:max-w-lg xl:max-w-xl">
                        {/* Background Glow Effects */}
                        <div className="absolute inset-0 group">
                            <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-700 animate-pulse bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 peer-checked:from-emerald-400/40 peer-checked:via-cyan-400/40 peer-checked:to-blue-400/40"></div>
                            <div className="absolute -inset-3 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 bg-gradient-to-br from-violet-500/40 to-pink-500/40 peer-checked:from-violet-400/50 peer-checked:to-pink-400/50"></div>
                        </div>

                        {/* Main Image Container */}
                        <div className="relative group cursor-pointer">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 transition-all duration-500 [perspective:1000px] ring-slate-700/50 hover:ring-emerald-500/50 bg-slate-800 peer-checked:ring-gray-300/50 peer-checked:hover:ring-emerald-400/50 peer-checked:bg-white peer-checked:shadow-xl">
                                <Image
                                    src="/intro-image.jpeg"
                                    alt="Shivam Sahil"
                                    width={500}
                                    height={600}
                                    className="w-full h-auto transition-all duration-700 group-hover:scale-105 group-hover:[transform:rotateY(5deg)_rotateX(2deg)]"
                                    priority
                                    quality={95}
                                />

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/20 via-transparent to-cyan-500/20 peer-checked:from-emerald-400/30 peer-checked:to-cyan-400/30"></div>
                                </div>

                                {/* Reflection Effect */}
                                <div className="absolute -bottom-1 left-0 right-0 h-8 opacity-30">
                                    <Image
                                        src="/intro-image.jpeg"
                                        alt=""
                                        width={500}
                                        height={600}
                                        className="w-full h-full object-cover scale-y-[-1] blur-sm"
                                        quality={50}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent peer-checked:from-gray-50 peer-checked:via-white/80"></div>
                                </div>
                            </div>

                            {/* Floating Decorative Elements */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full opacity-70 animate-pulse shadow-lg bg-gradient-to-br from-emerald-400 to-cyan-500 peer-checked:from-emerald-500 peer-checked:to-cyan-600 transition-all duration-1000"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-60 animate-pulse [animation-delay:1.5s] shadow-lg bg-gradient-to-br from-violet-400 to-pink-500 peer-checked:from-violet-500 peer-checked:to-pink-600 transition-all duration-1000"></div>
                            <div className="absolute top-1/4 -left-2 w-3 h-3 rounded-full opacity-50 animate-pulse [animation-delay:3s] bg-cyan-400 peer-checked:bg-cyan-500 transition-all duration-1000"></div>
                            <div className="absolute bottom-1/3 -right-1 w-4 h-4 rounded-full opacity-40 animate-pulse [animation-delay:2s] bg-emerald-400 peer-checked:bg-emerald-500 transition-all duration-1000"></div>

                            {/* Tiny sparkles */}
                            <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full opacity-60 animate-pulse [animation-delay:4s] bg-white peer-checked:bg-gray-800 transition-all duration-1000"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full opacity-50 animate-pulse [animation-delay:5s] bg-emerald-300 peer-checked:bg-emerald-600 transition-all duration-1000"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Intro;