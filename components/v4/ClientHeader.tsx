'use client'; // <-- important for client hook

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const navigationItems = [
    { label: 'Intro', href: '/portfolio' },
    { label: 'Work', href: '/portfolio-work' },
    { label: 'Projects', href: '/portfolio-projects' },
    { label: 'Blog', href: '/portfolio-blogs' },
    { label: 'Awards', href: '/portfolio-awards' },
    { label: 'Videos', href: '/portfolio-videos' },
    { label: 'Testimonials', href: '/portfolio-testimonials' },
    { label: 'Tech Stack', href: '/portfolio-techstack' },
    { label: 'Contact', href: '/portfolio-contact' }
];

const ClientHeader = () => {
    const pathname = usePathname() || '/';

    const normalize = (p: string) => (p === '/' ? '/' : p.replace(/\/+$/, ''));

    const isActive = (href: string) => {
        const p = normalize(pathname);
        const h = normalize(href);

        // Special case for Intro
        if (h === '/portfolio') {
            return p === '/' || p === h || p.startsWith(h + '/');
        }

        return p === h || p.startsWith(h + '/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-black/50 to-violet-900/30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-rose-900/20 pointer-events-none"></div>

            <div className="relative max-w-6xl mx-auto overflow-hidden">
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 text-white hover:text-cyan-300 transition-colors duration-300"
                    >
                        <Image src="/morpankh.svg" alt="Logo" width={40} height={40} />
                        <span className="text-xl font-bold text-emerald-400">SS</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-2 xl:gap-6 overflow-hidden">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                data-nav-link
                                className={`relative group font-medium px-2 xl:px-4 py-2 xl:py-3 rounded-xl transition-all duration-300 text-sm xl:text-base whitespace-nowrap ${isActive(item.href)
                                    ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40'
                                    : 'text-gray-300 hover:text-white hover:-translate-y-1 hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-2xl'
                                    }`}
                            >
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <MobileMenu currentPath={pathname} />
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
