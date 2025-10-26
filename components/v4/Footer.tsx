'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
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
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
    ),
    wordpress: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.135-2.85-.135-.584-.031-.661.854-.08.899 0 0 .548.075 1.116.105l1.659 4.537-2.330 7.013-3.88-11.55c.645-.03 1.231-.105 1.231-.105.582-.075.515-.930-.067-.899 0 0-1.755.135-2.88.135-.206 0-.438-.008-.69-.015C4.911 2.015 8.235 0 12.015 0c2.972 0 5.691 1.1 7.754 2.906-.05-.006-.105-.016-.159-.016-.058 0-.12.008-.18.023-1.064 0-1.818.93-1.818 1.92 0 .9.514 1.659 1.065 2.56.412.72.899 1.635.899 2.97 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12.015 24C5.8 24 .705 18.665.705 12.015c0-1.52.165-3.015.465-4.445l4.881 13.378c1.395.455 2.88.7 4.435.7 1.808 0 3.54-.362 5.11-1.02-.045-.075-.075-.165-.105-.24L12.015 24zm6.9-19.665c.15.315.255.675.255 1.05 0 .645-.12 1.365-.48 2.265l-1.92 6.255c-.915 2.22-1.665 3.6-2.295 4.785C16.965 17.205 19.005 14.85 19.005 12.015c0-1.8-.48-3.495-1.32-4.95l.23.27z" />
        </svg>
    ),
    email: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    blog: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
    discord: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.195.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
        </svg>
    ),
    stackoverflow: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092L6.785 12.743zM24 22.887l-10.929-.002.002-2.194 10.927.002v2.194zm-10.927-5.424l-.003-2.194h10.927v2.194H13.073zm-4.548-2.2L8.52 13.073l10.906.26-.003 2.194-10.898-.264zm-.003-5.167l.006-2.194 10.927.005v2.194l-10.933-.005z" />
        </svg>
    ),
    devpost: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z" />
        </svg>
    )
};

// Social Constellation Component
const SocialConstellation: React.FC = (): React.ReactElement => {
    return (
        <div className="relative">
            {/* Constellation background */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-red-500/10 blur-2xl animate-pulse" />

            <div className="relative flex flex-wrap justify-center gap-8">
                {socialHandles.map((handle): React.ReactElement | null => {
                    // Use the platform field directly, fallback to string manipulation for backward compatibility
                    const platformKey = (handle.platform || handle.id.replace(/^(Bs|Ai|Fi|Si)/, '').toLowerCase()) as keyof typeof socialIcons;
                    const Icon = socialIcons[platformKey];

                    // Skip if no icon is available for this platform
                    if (!Icon) return null;

                    // Use platform field for display name, with proper formatting
                    const displayName = handle.platform
                        ? handle.platform.charAt(0).toUpperCase() + handle.platform.slice(1)
                        : handle.id.replace(/^(Bs|Ai|Fi|Si)/, '');

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
                                className="relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-700 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 group-hover:scale-110"
                                aria-label={displayName}
                            >
                                <div className="text-gray-400 group-hover:text-cyan-300 transition-colors">
                                    {Icon}
                                </div>
                            </a>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {displayName}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main Footer Component
const Footer: React.FC = (): React.ReactElement | null => {
    const pathname = usePathname() || '/';

    // Don't show footer on /happy-birthday routes
    if (pathname.includes('/happy-birthday')) {
        return null;
    }

    const lastBuild = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <footer className="relative bg-black/50 backdrop-blur-md border-t border-gray-800/50 py-16 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep space gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

                {/* Matrix rain effect */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i): React.ReactElement => (
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
                {[...Array(100)].map((_, i): React.ReactElement => {
                    // Use deterministic values based on index to prevent hydration mismatch
                    const seed = i * 17; // Simple seed based on index
                    const left = (seed % 100);
                    const top = ((seed * 7) % 100);
                    const delay = (seed % 5);
                    const duration = 2 + (seed % 3);

                    return (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-white rounded-full animate-pulse"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${duration}s`
                            }}
                        />
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;