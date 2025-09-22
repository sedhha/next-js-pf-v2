import React, { ReactElement } from 'react';

interface IVisibility {
	Component: ReactElement;
	visibilityThreshold?: number;
	// eslint-disable-next-line no-unused-vars
	onVisibleCallback?: (entry: IntersectionObserverEntry) => void;
}

interface IVisibilityReturnProps {
	scrollToComponent: () => void;
	Component: ReactElement;
}

const useVisibilityControlComponent = ({
	Component,
	visibilityThreshold,
	onVisibleCallback
}: IVisibility): IVisibilityReturnProps => {
	const ref = React.useRef(null);
	React.useEffect(() => {
		const componentObserver = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					onVisibleCallback ? onVisibleCallback(entry) : null;
				}
			},
			{
				rootMargin: '0',
				threshold: visibilityThreshold ?? 0.95
			}
		);
		const current = ref.current;

		if (current) componentObserver.observe(current);

		return () => {
			componentObserver.disconnect();
		};
	}, [visibilityThreshold, onVisibleCallback]);

	const scrollToComponent = React.useCallback(() => {
		const current = ref.current;
		if (current) {
			//@ts-ignore
			current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}, []);
	return {
		scrollToComponent,
		Component: <div ref={ref}>{Component}</div>
	};
};

export default useVisibilityControlComponent;
