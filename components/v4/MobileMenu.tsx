'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

const navigationItems = [
    { label: 'Intro', href: '/portfolio' },
    { label: 'Work', href: '/portfolio-work' },
    { label: 'Projects', href: '/portfolio-projects' },
    { label: 'Blog', href: '/portfolio-blog' },
    { label: 'Awards', href: '/portfolio-awards' },
    { label: 'Videos', href: '/portfolio-videos' },
    { label: 'Testimonials', href: '/portfolio-testimonials' },
    { label: 'Tech Stack', href: '/portfolio-techstack' },
    { label: 'Contact', href: '/portfolio-contact' },
];

interface MobileMenuProps {
    currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body);
        const originalOverflow = originalStyle.overflow;
        const originalPaddingRight = originalStyle.paddingRight;

        if (isOpen) {
            // Get scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Apply styles to prevent scroll and layout shift
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            // Restore original styles
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        }

        // Cleanup on unmount - restore original styles
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isOpen]);

    const isActive = (href: string) => {
        return currentPath === href || (currentPath === '/' && href === '/portfolio');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button - Only visible on smaller screens */}
            <button
                onClick={toggleMenu}
                className="lg:hidden relative z-[60] p-2 rounded-xl transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Toggle mobile menu"
            >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span
                        className={`w-6 h-0.5 bg-white block transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[6px]' : 'rotate-0 translate-y-0'
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-white block transition-all duration-300 mt-1.5 ${isOpen ? 'opacity-0' : 'opacity-100'
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-white block transition-all duration-300 mt-1.5 origin-center ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'rotate-0 translate-y-0'
                            }`}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay - Rendered in portal */}
            {mounted && createPortal(
                <>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[51] lg:hidden animate-[fade-in-backdrop_0.3s_ease-out]"
                                onClick={closeMenu}
                            />

                            {/* Menu Panel */}
                            <div
                                className="fixed inset-0 w-full sm:w-80 sm:max-w-[85vw] sm:left-auto z-[52] lg:hidden animate-[slide-in-right_0.4s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
                            >
                                {/* Multi-layered background with cosmic theme */}
                                <div className="absolute inset-0 bg-black/90"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/60 to-violet-900/40"></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/30 via-transparent to-rose-900/30"></div>

                                {/* Border glow effect */}
                                <div className="absolute inset-0 border-l border-emerald-500/30 shadow-[-10px_0_50px_rgba(16,185,129,0.2)]"></div>

                                {/* Scrollable container */}
                                <div className="relative h-full overflow-y-auto overflow-x-hidden flex flex-col max-w-full">
                                    {/* Header with close button for mobile */}
                                    <div className="p-6 border-b border-white/10 flex items-center justify-between w-full overflow-hidden">
                                        <h2 className="text-xl font-bold text-emerald-400 truncate">Navigation</h2>
                                        <button
                                            onClick={closeMenu}
                                            className="sm:hidden p-2 rounded-xl transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex-shrink-0"
                                            aria-label="Close mobile menu"
                                        >
                                            <div className="w-6 h-6 flex items-center justify-center">
                                                <span className="w-6 h-0.5 bg-white block absolute rotate-45" />
                                                <span className="w-6 h-0.5 bg-white block absolute -rotate-45" />
                                            </div>
                                        </button>
                                    </div>

                                    {/* Navigation Items */}
                                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden w-full">
                                        {navigationItems.map((item, index) => (
                                            <div
                                                key={item.href}
                                                className="animate-[stagger-in_0.4s_ease-out_forwards] opacity-0"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={closeMenu}
                                                    className={`relative group block w-full px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${isActive(item.href)
                                                        ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40'
                                                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent'
                                                        }`}
                                                >
                                                    {/* Glow effect on hover */}
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-purple-500/20 group-hover:via-cyan-500/30 group-hover:to-emerald-500/20 transition-all duration-500"></div>

                                                    {/* Text content */}
                                                    <span className="relative z-10 font-medium">
                                                        {item.label}
                                                    </span>

                                                    {/* Shimmer sweep effect */}
                                                    <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                                    </div>

                                                    {/* Active indicator */}
                                                    {isActive(item.href) && (
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-r-full transition-all duration-300" />
                                                    )}
                                                </Link>
                                            </div>
                                        ))}
                                    </nav>

                                    {/* Footer */}
                                    <div className="p-6 border-t border-white/10">
                                        <div className="text-center text-gray-400 text-sm">
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                                <span>Portfolio v4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>,
                document.body
            )}
        </>
    );
}