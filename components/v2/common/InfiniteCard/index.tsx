import React, { WheelEventHandler } from 'react';

interface InfiniteCardProps {
	Component: JSX.Element;
	onReachedTopCallback?: () => void;
	onReachedBottomCallback?: () => void;
}

const clearancePixel = 0.5;
const inRange = (value: number, min: number, max: number): boolean =>
	value >= min && value <= max;

interface IWheel {
	nativeEvent: {
		wheelDelta: number;
	};
}

const InfiniteCardComponent = ({
	Component,
	onReachedTopCallback,
	onReachedBottomCallback
}: InfiniteCardProps) => {
	const ref = React.useRef(null);
	const [isScrollingUp, setScrollingUp] = React.useState(true);
	const onWheelEvent = (event: IWheel) =>
		setScrollingUp(event.nativeEvent.wheelDelta > 0);
	const onScroll = () => {
		const { current } = ref;
		if (current) {
			const { scrollTop, clientHeight, scrollHeight } = current;
			const reachedBottom = inRange(
				scrollTop + clientHeight,
				scrollHeight - clearancePixel,
				scrollHeight + clearancePixel
			);

			if (scrollTop === 0) onReachedTopCallback?.();
			else if (reachedBottom && !isScrollingUp) onReachedBottomCallback?.();
		}
	};
	return (
		<Component.type
			{...Component.props}
			ref={ref}
			onScroll={onScroll}
			onWheel={onWheelEvent}
		/>
	);
};
export default InfiniteCardComponent;
