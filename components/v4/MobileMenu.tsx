'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navigationItems = [
    { label: 'Intro', href: '/portfolio-intro' },
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

const MobileMenu = ({ currentPath }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Progressive enhancement: start with CSS-only, enhance with JS
    useEffect(() => {
        setIsClient(true);
    }, []);

    const isActive = (href: string) => {
        return currentPath === href || (currentPath === '/' && href === '/portfolio-intro');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Use a stable ID that won't cause hydration issues
    const menuId = 'mobile-menu-toggle';

    return (
        <div className="md:hidden">
            {/* Consistent DOM structure that works both with CSS-only and JS enhancement */}
            <input
                type="checkbox"
                id={menuId}
                className="sr-only peer"
                checked={isOpen}
                onChange={toggleMenu}
                suppressHydrationWarning
            />
            <label
                htmlFor={menuId}
                className="mobile-menu-button flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-50"
            >
                <span className={`hamburger-line-1 block w-5 h-0.5 bg-white transition-all duration-200 ${isClient && isOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`hamburger-line-2 block w-5 h-0.5 bg-white mt-1 transition-all duration-200 ${isClient && isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`hamburger-line-3 block w-5 h-0.5 bg-white mt-1 transition-all duration-200 ${isClient && isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
            </label>

            {/* Mobile menu dropdown - works with both CSS-only and JS */}
            <div className={`mobile-menu-dropdown fixed top-20 left-0 right-0 z-40 transition-all duration-200 backdrop-blur-md border-b border-white/10 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto ${isClient && isOpen ? '!opacity-100 !pointer-events-auto' : ''
                }`}>
                {/* Multi-layered cosmic background for mobile menu */}
                <div className="absolute inset-0 bg-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/60 to-violet-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/25 via-transparent to-rose-900/25"></div>

                <nav className="relative max-w-6xl mx-auto px-6 py-6 space-y-4">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={isClient ? () => setIsOpen(false) : undefined}
                            data-mobile-nav-link
                            className={`block transition-colors duration-200 font-medium px-3 py-2 rounded-lg ${isActive(item.href)
                                ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;