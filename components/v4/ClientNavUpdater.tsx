'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// This component updates the active navigation states on client-side navigation
const ClientNavUpdater = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Update active states for desktop navigation
        const navLinks = document.querySelectorAll('[data-nav-link]');
        navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            const isActive = pathname === href || (pathname === '/' && href === '/portfolio-intro');

            if (isActive) {
                link.className = 'transition-all duration-300 font-medium px-3 py-2 rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 shadow-emerald-500/20 shadow-lg';
            } else {
                link.className = 'transition-all duration-300 font-medium px-3 py-2 rounded-lg text-gray-300 hover:text-emerald-200 hover:bg-emerald-900/20 hover:border-emerald-500/10 border border-transparent';
            }
        });

        // Update active states for mobile navigation
        const mobileLinks = document.querySelectorAll('[data-mobile-nav-link]');
        mobileLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            const isActive = pathname === href || (pathname === '/' && href === '/portfolio-intro');

            if (isActive) {
                link.className = 'block transition-colors duration-200 font-medium px-3 py-2 rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/20';
            } else {
                link.className = 'block transition-colors duration-200 font-medium px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5';
            }
        });
    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ClientNavUpdater;