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

	return <Component.type {...Component.props} ref={ref} />;
};

export default VisibilityHandler;
