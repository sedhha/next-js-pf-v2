'use client';

import React from 'react';
import { useMobileConditionalRender } from '../../utils/fe/mobile-lazy-loader';

interface MobileMenuProps {
    currentPath: string;
}

/**
 * Mobile Menu Button Fallback - shown while detecting device type
 */
const MobileMenuFallback = () => (
    <div className="lg:hidden relative z-[60] p-2 rounded-xl opacity-50">
        <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="w-6 h-0.5 bg-white/50 block animate-pulse" />
            <span className="w-6 h-0.5 bg-white/50 block mt-1.5 animate-pulse" />
            <span className="w-6 h-0.5 bg-white/50 block mt-1.5 animate-pulse" />
        </div>
    </div>
);

/**
 * Hook-based mobile menu wrapper with conditional rendering
 */
export default function HookBasedMobileMenuWrapper({ currentPath }: MobileMenuProps) {
    const { isMobile, isInitialized } = useMobileConditionalRender();
    const [MobileMenu, setMobileMenu] = React.useState<React.ComponentType<MobileMenuProps> | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (isInitialized && isMobile && !MobileMenu && !isLoading) {
            setIsLoading(true);

            // Dynamically import the mobile menu only when needed
            import('./MobileMenu')
                .then((module) => {
                    setMobileMenu(() => module.default);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.warn('Failed to load MobileMenu:', error);
                    setIsLoading(false);
                });
        } else if (isInitialized && !isMobile) {
            // Clean up mobile component when switching to desktop
            setMobileMenu(null);
        }
    }, [isMobile, isInitialized, MobileMenu, isLoading]);

    // Don't render anything until initialized
    if (!isInitialized) {
        return <MobileMenuFallback />;
    }

    // Don't render anything if we're on desktop
    if (!isMobile) {
        return null;
    }

    // Show fallback while loading
    if (isLoading || !MobileMenu) {
        return <MobileMenuFallback />;
    }

    // Render the loaded mobile menu
    return <MobileMenu currentPath={currentPath} />;
}