import React from 'react';

interface IVisibility {
	Component: JSX.Element;
	visibilityThreshold?: number;
	onVisibleCallback?: (entry: IntersectionObserverEntry) => void;
}

interface IVisibilityReturnProps {
	scrollToComponent: () => void;
	Component: JSX.Element;
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
		Component: <Component.type {...Component.props} ref={ref} />
	};
};

export default useVisibilityControlComponent;
