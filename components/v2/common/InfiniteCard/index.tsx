import React, { WheelEventHandler } from 'react';
import { println } from '../../../../utils/dev-utils';

interface InfiniteCardProps {
	Component: JSX.Element;
	onReachedTopCallback?: () => void;
	onReachedBottomCallback?: () => void;
	onReachedLeftCallback?: () => void;
	onReachedRightCallback?: () => void;
}

const clearancePixel = 0.5;
const inRange = (value: number, min: number, max: number): boolean =>
	value >= min && value <= max;

interface IWheel {
	nativeEvent: {
		wheelDelta: number;
	};
	deltaX: number;
	deltaY: number;
}

const InfiniteCardComponent = ({
	Component,
	onReachedTopCallback,
	onReachedBottomCallback,
	onReachedLeftCallback,
	onReachedRightCallback
}: InfiniteCardProps) => {
	const ref = React.useRef(null);
	const [isScrollingUp, setScrollingUp] = React.useState(true);
	const onWheelEvent = (event: IWheel) => {
		const { deltaY } = event;
		if (deltaY) setScrollingUp(event.nativeEvent.wheelDelta > 0);
	};
	const onScroll = () => {
		const { current } = ref;
		if (current) {
			const {
				scrollTop,
				clientHeight,
				scrollHeight,
				scrollLeft,
				scrollWidth,
				clientWidth
			} = current;
			const reachedBottom = inRange(
				scrollTop + clientHeight,
				scrollHeight - clearancePixel,
				scrollHeight + clearancePixel
			);
			const reachedRight = inRange(
				scrollLeft + clientWidth,
				scrollWidth - clearancePixel,
				scrollWidth + clearancePixel
			);

			if (scrollTop === 0) onReachedTopCallback?.();
			else if (reachedBottom && !isScrollingUp) onReachedBottomCallback?.();

			if (scrollLeft === 0) {
				if (onReachedLeftCallback) onReachedLeftCallback?.();
			} else if (reachedRight) {
				if (onReachedRightCallback) onReachedRightCallback?.();
			}
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
