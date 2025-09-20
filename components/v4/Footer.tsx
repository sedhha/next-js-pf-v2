import React from 'react';
import { ISocialHandles } from '@/interfaces/testimonials';
import myHandles from '@/constants/handles.json';

// Type the social handles
const socialHandles = myHandles as ISocialHandles[];

// Social media icons mapping
const socialIcons = {
    linkedin: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    github: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    twitter: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
    ),
    youtube: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
    instagram: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    )
};

// Social Constellation Component - Pure server component
const SocialConstellation = () => {

    return (
        <div className="relative">
            {/* Constellation background */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-red-500/10 blur-2xl animate-pulse" />

            <div className="relative flex flex-wrap justify-center gap-8">
                {socialHandles.map((handle, index) => {
                    const platformName = handle.id.replace(/^(Bs|Ai|Fi|Si)/, '').toLowerCase();
                    const platformKey = platformName as keyof typeof socialIcons;
                    const Icon = socialIcons[platformKey];

                    if (!Icon) return null;

                    return (
                        <div
                            key={handle.id}
                            className="relative group"
                        >
                            {/* Star glow */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                            {/* Social link star */}
                            <a
                                href={handle.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-14 h-14 bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all duration-500 hover:scale-110 hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-cyan-500/30"
                            >
                                {Icon}

                                {/* Energy pulse */}
                                <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-0 group-hover:opacity-100" />

                                {/* Platform label */}
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="px-3 py-1 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-lg text-xs text-white whitespace-nowrap">
                                        {platformName}
                                    </div>
                                </div>
                            </a>

                            {/* Connecting energy lines - CSS hover only */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: -1 }}>
                                <defs>
                                    <linearGradient id={`energy-line-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
                                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                                        <stop offset="100%" stopColor="rgba(239, 68, 68, 0.8)" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="40"
                                    fill="none"
                                    stroke={`url(#energy-line-${index})`}
                                    strokeWidth="2"
                                    opacity="0.6"
                                    className="animate-pulse"
                                />
                            </svg>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main Footer Component
const Footer = () => {
    const lastBuild = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return (
        <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
            {/* Cosmic background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep space gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

                {/* Matrix rain effect */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse"
                            style={{
                                left: `${(i * 5)}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i % 3}s`
                            }}
                        />
                    ))}
                </div>

                {/* Floating cosmic particles */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-400/40 rounded-full floating-orb blur-sm" />
                <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400/60 rounded-full floating-orb blur-sm [animation-delay:1s]" />
                <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-red-400/30 rounded-full floating-orb blur-sm [animation-delay:2s]" />
                <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-green-400/50 rounded-full floating-orb blur-sm [animation-delay:3s]" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400/40 rounded-full floating-orb blur-sm [animation-delay:4s]" />

                {/* Energy vortexes */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-purple-500/5 via-red-500/5 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

                {/* Dimensional rifts */}
                <div className="absolute top-1/3 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent scanning-line" />
                <div className="absolute top-2/3 right-1/4 w-px h-24 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent scanning-line [animation-delay:1.5s]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main content grid */}
                <div className="mb-16">
                    {/* Social constellation */}
                    <div className="flex justify-center">
                        <SocialConstellation />
                    </div>
                </div>

                {/* Bottom: Copyright & Build info */}
                <div className="border-t border-gray-800/50 pt-2">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="text-center sm:text-left">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500">
                                    © {new Date().getFullYear()} All rights reserved.
                                </span>
                            </div>

                            <div className="hidden sm:block w-px h-4 bg-gray-700" />

                            <div className="text-center sm:text-left">
                                <span className="text-gray-500">
                                    🚀 Last build: <span className="text-cyan-400 font-mono">{lastBuild}</span>
                                </span>
                            </div>
                        </div>

                        {/* Quantum signature */}
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                            <span>QUANTUM NETWORK ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cosmic dust overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-px bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
        </footer>
    );
};

export default Footer;