import React from 'react';

interface InfiniteCardProps {
	Component: JSX.Element;
	onReachedTopCallback?: () => void;
	onReachedBottomCallback?: () => void;
}

const clearancePixel = 0;
const inRange = (value: number, min: number, max: number): boolean =>
	value >= min && value <= max;

const InfiniteCardComponent = ({
	Component,
	onReachedTopCallback,
	onReachedBottomCallback
}: InfiniteCardProps) => {
	const ref = React.useRef(null);
	const onScroll = () => {
		const { current } = ref;
		if (current) {
			const { scrollTop, clientHeight, scrollHeight } = current;
			const reachedBottom =
				Math.round(scrollTop + clientHeight) >= scrollHeight + clearancePixel;

			if (scrollTop === 0) onReachedTopCallback?.();
			else if (reachedBottom) onReachedBottomCallback?.();
		}
	};
	return <Component.type {...Component.props} ref={ref} onScroll={onScroll} />;
};
export default InfiniteCardComponent;
