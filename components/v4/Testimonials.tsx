import React from 'react';
import Image from 'next/image';
import { ITestimonials } from '@/interfaces/testimonials';
import testimonialsData from '@/constants/cms-constants/testimonial.json';

// Type the imported testimonials properly
const testimonials = testimonialsData as ITestimonials[];

// Pure CSS-based Testimonials Component with auto-rotation
const Testimonials = () => {
    if (testimonials.length === 0) {
        return (
            <section className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 border-2 border-red-500/20 border-t-red-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading testimonials...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Theme-consistent background atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Theme grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />

                {/* Floating orbs with smooth movement */}
                <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-400/40 rounded-full floating-orb blur-sm" />
                <div className="absolute top-40 right-20 w-2 h-2 bg-violet-400/60 rounded-full floating-orb blur-sm [animation-delay:1s]" />
                <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-cyan-400/30 rounded-full floating-orb blur-sm [animation-delay:2s]" />
                <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-purple-400/50 rounded-full floating-orb blur-sm [animation-delay:3s]" />

                {/* Theme energy vortexes */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/15 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-violet-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Mysterious header */}
                <div className="text-center mb-2 relative">
                    {/* Theme-consistent badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 backdrop-blur-xl border border-emerald-400/40 rounded-full shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                            <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse shadow-lg shadow-violet-400/50 [animation-delay:0.2s]" />
                        </div>
                        <span className="text-emerald-300 font-semibold tracking-wide">
                            TESTIMONIALS & FEEDBACK
                        </span>
                        <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-400 via-violet-400 to-transparent" />
                    </div>

                    {/* Title with theme-consistent colors */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-violet-300 via-purple-300 to-emerald-400 bg-clip-text text-transparent leading-tight">
                        Say About My Work</h2>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                        Voices from colleagues and collaborators sharing their experiences working together.
                    </p>
                </div>

                {/* CSS-only Testimonials carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative min-h-[600px] flex items-center justify-center">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full max-w-2xl mx-auto flex items-center justify-center transition-all duration-1000 ease-in-out ${index === 0 ? 'opacity-100 visible z-10' : 'opacity-0 invisible z-[-1]'
                                    }`}
                                style={{
                                    animation: `testimonial-show-${index + 1} 20s infinite`,
                                }}
                            >
                                {/* Testimonial Card */}
                                <div className="relative group w-full">
                                    {/* Theme-consistent border glow */}
                                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-violet-500/30 to-cyan-500/20 blur-xl animate-pulse" />

                                    {/* Main card with theme glass morphism */}
                                    <div className="relative bg-black/95 backdrop-blur-3xl border border-emerald-500/40 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 w-full">

                                        {/* Theme scanning lines */}
                                        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
                                            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/4 scanning-line" />
                                            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-3/4 scanning-line [animation-delay:1.5s]" />
                                        </div>

                                        {/* Profile section */}
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="relative">
                                                {/* Theme profile image glow */}
                                                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500/30 to-violet-500/30 blur-lg animate-pulse" />

                                                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700/50">
                                                    <Image
                                                        src={testimonial.img}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover brightness-110"
                                                        unoptimized
                                                    />

                                                    {/* Theme overlay effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-theme-emerald-500/20 to-theme-violet-500/20 mix-blend-overlay" />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-bold text-2xl mb-2 text-white glitch-text">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-sm font-medium text-theme-violet-300">
                                                    {testimonial.designation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Testimonial content */}
                                        <div className="relative">
                                            {/* Quote marks with theme glow */}
                                            <div className="absolute -top-4 -left-2 text-6xl font-serif text-theme-emerald-400/60">
                                                &ldquo;
                                            </div>

                                            <div className="relative z-10 space-y-4">
                                                {testimonial.content.split('\n').map((line, lineIndex) => (
                                                    <p
                                                        key={lineIndex}
                                                        className="text-lg leading-relaxed text-gray-200"
                                                    >
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>

                                            <div className="absolute -bottom-4 -right-2 text-6xl font-serif rotate-180 text-theme-emerald-400/60">
                                                &rdquo;
                                            </div>
                                        </div>

                                        {/* Social links */}
                                        {testimonial.contact && testimonial.contact.length > 0 && (
                                            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700/30">
                                                {testimonial.contact.map((contact, contactIndex) => (
                                                    <a
                                                        key={contactIndex}
                                                        href={contact.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-theme-violet-500/20 border border-theme-violet-400/40 text-theme-violet-300 hover:bg-theme-violet-500/30 hover:shadow-lg hover:shadow-theme-violet-500/20 hover:scale-110 transition-all duration-300"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                        </svg>
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {/* Theme energy particles */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="particle absolute w-1 h-1 bg-theme-emerald-400/60 rounded-full top-[20%] left-[10%] [animation-delay:0s]" />
                                            <div className="particle absolute w-1 h-1 bg-theme-violet-400/60 rounded-full top-[30%] left-[25%] [animation-delay:0.3s]" />
                                            <div className="particle absolute w-1 h-1 bg-theme-cyan-400/60 rounded-full top-[40%] left-[40%] [animation-delay:0.6s]" />
                                            <div className="particle absolute w-1 h-1 bg-theme-purple-400/60 rounded-full top-[50%] left-[55%] [animation-delay:0.9s]" />
                                            <div className="particle absolute w-1 h-1 bg-theme-emerald-400/60 rounded-full top-[60%] left-[70%] [animation-delay:1.2s]" />
                                            <div className="particle absolute w-1 h-1 bg-theme-violet-400/60 rounded-full top-[70%] left-[85%] [animation-delay:1.5s]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Testimonials;