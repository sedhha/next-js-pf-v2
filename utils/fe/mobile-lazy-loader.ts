'use client';

import React, { ComponentType } from 'react';

/**
 * Enhanced lazy loading utility for mobile-specific components
 * Uses media queries for optimal performance
 */
export class MobileComponentLoader {
	private static loadedComponents = new Map<string, ComponentType<any>>();
	public static mediaQuery: MediaQueryList | null = null;

	/**
	 * Initialize media query listener for mobile detection
	 */
	static initialize() {
		if (typeof window === 'undefined') return;

		this.mediaQuery = window.matchMedia('(max-width: 1023px)'); // lg breakpoint
	}

	/**
	 * Check if device is currently mobile
	 */
	static isMobileViewport(): boolean {
		return this.mediaQuery?.matches ?? false;
	}

	/**
	 * Dynamically import and cache mobile components
	 */
	static async loadMobileComponent<T = any>(
		componentName: string,
		importFn: () => Promise<{ default: ComponentType<T> }>
	): Promise<ComponentType<T> | null> {
		// Return null if not mobile
		if (!this.isMobileViewport()) {
			return null;
		}

		// Return cached component if available
		if (this.loadedComponents.has(componentName)) {
			return this.loadedComponents.get(componentName) as ComponentType<T>;
		}

		try {
			const componentModule = await importFn();
			const Component = componentModule.default;

			// Cache the loaded component
			this.loadedComponents.set(componentName, Component);

			return Component;
		} catch (error) {
			console.warn(`Failed to load mobile component: ${componentName}`, error);
			return null;
		}
	}

	/**
	 * Clear component cache (useful for cleanup)
	 */
	static clearCache() {
		this.loadedComponents.clear();
	}
}

/**
 * Higher-order component for lazy loading mobile components
 */
export function withMobileLazyLoading<P extends object>(
	componentName: string,
	importFn: () => Promise<{ default: ComponentType<P> }>,
	fallback?: React.ReactNode
) {
	return function LazyMobileComponent(props: P): React.ReactElement | null {
		const [MobileComponent, setMobileComponent] =
			React.useState<ComponentType<P> | null>(null);
		const [isLoading, setIsLoading] = React.useState(true);
		const [shouldRender, setShouldRender] = React.useState(false);

		React.useEffect(() => {
			// Initialize media query if not already done
			MobileComponentLoader.initialize();

			const loadComponent = async () => {
				setIsLoading(true);

				if (MobileComponentLoader.isMobileViewport()) {
					setShouldRender(true);
					const Component = await MobileComponentLoader.loadMobileComponent(
						componentName,
						importFn
					);
					setMobileComponent(() => Component);
				} else {
					setShouldRender(false);
					setMobileComponent(null);
				}

				setIsLoading(false);
			};

			// Initial load
			loadComponent();

			// Listen for viewport changes
			const mediaQuery = MobileComponentLoader.mediaQuery;
			if (mediaQuery) {
				mediaQuery.addEventListener('change', loadComponent);
				return () => mediaQuery.removeEventListener('change', loadComponent);
			}
		}, []);

		// Don't render anything if not mobile viewport
		if (!shouldRender) {
			return null;
		}

		// Show fallback while loading
		if (isLoading || !MobileComponent) {
			return React.createElement(React.Fragment, null, fallback || null);
		}

		// Render the loaded component
		return React.createElement(MobileComponent, props);
	};
}

/**
 * Hook for conditional mobile rendering
 */
export function useMobileConditionalRender() {
	const [isMobile, setIsMobile] = React.useState(false);
	const [isInitialized, setIsInitialized] = React.useState(false);

	React.useEffect(() => {
		MobileComponentLoader.initialize();

		const updateMobileState = () => {
			setIsMobile(MobileComponentLoader.isMobileViewport());
			if (!isInitialized) {
				setIsInitialized(true);
			}
		};

		updateMobileState();

		const mediaQuery = MobileComponentLoader.mediaQuery;
		if (mediaQuery) {
			mediaQuery.addEventListener('change', updateMobileState);
			return () => mediaQuery.removeEventListener('change', updateMobileState);
		}
	}, [isInitialized]);

	return { isMobile, isInitialized };
}
