'use client';

/**
 * Device detection utilities for lazy loading mobile-specific components
 */

export interface DeviceInfo {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	screenWidth: number;
	userAgent: string;
}

/**
 * Detects if the current device is likely mobile based on screen width and user agent
 */
export const isMobileDevice = (): boolean => {
	// SSR safe check
	if (typeof window === 'undefined') {
		return false;
	}

	// Check screen width (mobile breakpoint)
	const screenWidth = window.innerWidth;
	const isMobileScreen = screenWidth < 1024; // lg breakpoint

	// Check user agent for mobile indicators
	const userAgent = navigator.userAgent.toLowerCase();
	const mobileKeywords = [
		'mobile',
		'android',
		'iphone',
		'ipad',
		'ipod',
		'blackberry',
		'windows phone',
		'webos'
	];

	const isMobileUserAgent = mobileKeywords.some((keyword) =>
		userAgent.includes(keyword)
	);

	// Return true if either condition is met
	return isMobileScreen || isMobileUserAgent;
};

/**
 * Gets comprehensive device information
 */
export const getDeviceInfo = (): DeviceInfo | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	const screenWidth = window.innerWidth;
	const userAgent = navigator.userAgent;

	return {
		isMobile: screenWidth < 768,
		isTablet: screenWidth >= 768 && screenWidth < 1024,
		isDesktop: screenWidth >= 1024,
		screenWidth,
		userAgent
	};
};

/**
 * Hook to detect mobile device with real-time updates
 */
export const useMobileDetection = () => {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(isMobileDevice());
		};

		// Initial check
		checkMobile();

		// Listen for resize events
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
};

// Import React for the hook
import * as React from 'react';
