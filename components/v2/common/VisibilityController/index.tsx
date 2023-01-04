import React from 'react';

interface IVisibility {
	Component: JSX.Element;
	visibilityThreshold?: number;
	onVisibleCallback?: (entry: IntersectionObserverEntry) => void;
}

const VisibilityHandler = ({
	Component,
	visibilityThreshold,
	onVisibleCallback
}: IVisibility): JSX.Element => {
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
				rootMargin: '0px',
				threshold: visibilityThreshold ?? 0
			}
		);
		const current = ref.current;

		if (current) componentObserver.observe(current);

		return () => {
			componentObserver.disconnect();
		};
	}, [visibilityThreshold, onVisibleCallback]);

	return <Component.type {...Component.props} ref={ref} />;
};

export default VisibilityHandler;
