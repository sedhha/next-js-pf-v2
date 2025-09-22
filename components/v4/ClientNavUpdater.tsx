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
            const isActive = pathname === href || (pathname === '/' && href === '/portfolio');

            // Instead of completely overriding className, update the active state classes
            const element = link as HTMLElement;

            if (isActive) {
                // Remove all border classes first, then add active ones
                element.classList.remove(
                    'border-transparent', 'border-white', 'border-white/10', 'border-white/20',
                    'border-emerald-500/20', 'border-emerald-400', 'border-emerald-500/40',
                    'text-gray-300', 'hover:text-white', 'hover:-translate-y-1',
                    'hover:scale-105', 'hover:shadow-cyan-500/50', 'hover:shadow-2xl'
                );
                // Add active classes with explicit border
                element.classList.add('text-emerald-300', 'bg-emerald-500/20', 'border', 'border-emerald-500/40');
            } else {
                // Remove all active classes including all border variations
                element.classList.remove(
                    'text-emerald-300', 'bg-emerald-500/20',
                    'border', 'border-emerald-500/40', 'border-emerald-500/20', 'border-emerald-400',
                    'border-white', 'border-white/10', 'border-white/20'
                );
                // Add inactive classes - NOTE: no border class for inactive state
                element.classList.add('text-gray-300', 'hover:text-white', 'hover:-translate-y-1', 'hover:scale-105', 'hover:shadow-cyan-500/50', 'hover:shadow-2xl');
            }
        });

        // Update active states for mobile navigation - keep the existing logic for mobile as it's simpler
        const mobileLinks = document.querySelectorAll('[data-mobile-nav-link]');
        mobileLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            const isActive = pathname === href || (pathname === '/' && href === '/portfolio');

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