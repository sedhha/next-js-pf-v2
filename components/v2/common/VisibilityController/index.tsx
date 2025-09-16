import React, { ReactElement } from 'react';

interface IVisibility {
	Component: ReactElement;
	visibilityThreshold?: number;
	// eslint-disable-next-line no-unused-vars
	onVisibleCallback?: (entry: IntersectionObserverEntry) => void;
}

const VisibilityHandler = ({
	Component,
	visibilityThreshold,
	onVisibleCallback
}: IVisibility): ReactElement => {
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
				threshold: visibilityThreshold ?? 0.7
			}
		);
		const current = ref.current;

		if (current) componentObserver.observe(current);

		return () => {
			componentObserver.disconnect();
		};
	}, [visibilityThreshold, onVisibleCallback]);

	return <div ref={ref}>{Component}</div>;
};

export default VisibilityHandler;
