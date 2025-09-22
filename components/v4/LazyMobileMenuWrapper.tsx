'use client';

import React from 'react';
import { withMobileLazyLoading } from '../../utils/fe/mobile-lazy-loader';

interface MobileMenuProps {
    currentPath: string;
}

/**
 * Mobile Menu Button Fallback - shown while mobile menu loads
 */
const MobileMenuFallback = () => (
    <div className="lg:hidden relative z-[60] p-2 rounded-xl">
        <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="w-6 h-0.5 bg-white/50 block animate-pulse" />
            <span className="w-6 h-0.5 bg-white/50 block mt-1.5 animate-pulse" />
            <span className="w-6 h-0.5 bg-white/50 block mt-1.5 animate-pulse" />
        </div>
    </div>
);

/**
 * Lazy-loaded mobile menu using the enhanced mobile component loader
 */
const LazyMobileMenuWrapper = withMobileLazyLoading<MobileMenuProps>(
    'MobileMenu',
    () => import('./MobileMenu'),
    <MobileMenuFallback />
);

export default LazyMobileMenuWrapper;