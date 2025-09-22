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
	const [triggered, setTriggered] = React.useState(false);
	React.useEffect(() => {
		if (!triggered) {
			const componentObserver = new IntersectionObserver(
				(entries) => {
					const [entry] = entries;
					if (entry.isIntersecting && !triggered) {
						onVisibleCallback ? onVisibleCallback(entry) : null;
						setTriggered(true);
					}
				},
				{
					rootMargin: '0px',
					threshold: visibilityThreshold ?? 0.5
				}
			);
			const current = ref.current;

			if (current) componentObserver.observe(current);

			return () => {
				componentObserver.disconnect();
			};
		}
	}, [visibilityThreshold, onVisibleCallback, triggered]);

	return <div ref={ref}>{Component}</div>;
};

export default VisibilityHandler;
