import React, { ReactElement, useRef, useState } from 'react';

interface InfiniteCardProps {
	Component: ReactElement;
	onReachedTopCallback?: () => void;
	onReachedBottomCallback?: () => void;
	onReachedLeftCallback?: () => void;
	onReachedRightCallback?: () => void;
}

const clearancePixel = 0.5;
const inRange = (v: number, min: number, max: number) => v >= min && v <= max;

const InfiniteCardComponent = ({
	Component,
	onReachedTopCallback,
	onReachedBottomCallback,
	onReachedLeftCallback,
	onReachedRightCallback
}: InfiniteCardProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isScrollingUp, setScrollingUp] = useState(true);

	const onWheelEvent: React.WheelEventHandler<HTMLDivElement> = (event) => {
		// deltaY < 0 => scrolling up; > 0 => down
		setScrollingUp(event.deltaY < 0);
	};

	const onScroll: React.UIEventHandler<HTMLDivElement> = () => {
		const current = ref.current;
		if (!current) return;

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

		if (scrollLeft === 0) onReachedLeftCallback?.();
		else if (reachedRight) onReachedRightCallback?.();
	};

	return (
		<div
			ref={ref}
			onScroll={onScroll}
			onWheel={onWheelEvent}
			// ensure the wrapper can actually scroll:
			style={{ overflow: 'auto', maxHeight: '100%', maxWidth: '100%' }}
		>
			{Component}
		</div>
	);
};

export default InfiniteCardComponent;
