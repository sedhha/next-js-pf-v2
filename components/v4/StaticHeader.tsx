import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import MobileMenu from './MobileMenu';
import ClientNavUpdater from './ClientNavUpdater';

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

const StaticHeader = async () => {
    // Get current path from headers on server-side only
    let pathname = '/';
    try {
        const headersList = await headers();
        pathname = headersList.get('x-pathname') || '/';
    } catch {
        // Fallback for any header access issues
        pathname = '/';
    }

    const isActive = (href: string) => {
        return pathname === href || (pathname === '/' && href === '/portfolio-intro');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 overflow-hidden">
            {/* Multi-layered background with cosmic theme */}
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-black/50 to-violet-900/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-rose-900/20"></div>

            <div className="relative max-w-6xl mx-auto overflow-hidden">
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 text-white hover:text-cyan-300 transition-colors duration-300">
                        <Image
                            src="/morpankh.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-xl font-bold text-emerald-400">SS</span>
                    </Link>                    {/* Navigation - Desktop */}
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
                                {/* Multi-layered glow effects - only on hover */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-purple-500/30 group-hover:via-cyan-500/40 group-hover:to-emerald-500/30 transition-all duration-500 blur-sm"></div>

                                {/* Outer glow ring */}
                                <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-emerald-400/30 blur-lg"></div>

                                {/* Text content */}
                                <span className="relative z-10">
                                    {item.label}
                                </span>

                                {/* Shimmer sweep effect */}
                                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12"></div>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu - Server-side with current path */}
                    <MobileMenu currentPath={pathname} />
                </div>
            </div>

            {/* Client-side navigation updater */}
            <ClientNavUpdater />
        </header>
    );
};

export default StaticHeader;