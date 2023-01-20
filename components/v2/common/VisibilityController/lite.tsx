import React from 'react';

interface IVisibility {
	Component: JSX.Element;
	onVisibleCallback?: () => void;
}

const VisibilityHandler = ({
	Component,
	onVisibleCallback
}: IVisibility): JSX.Element => {
	const ref = React.useRef(null);
	const visibleCallBack = React.useCallback(() => {
		if (onVisibleCallback) onVisibleCallback();
	}, [onVisibleCallback]);
	React.useEffect(() => {
		const checkVisibility = () => {
			const { current } = ref;
			if (current) {
				//@ts-ignore
				const { top, left, bottom, right } = current.getBoundingClientRect();
				if (
					top >= 0 &&
					left >= 0 &&
					bottom <= window.innerHeight &&
					right <= window.innerWidth
				) {
					visibleCallBack();
					window.removeEventListener('scroll', checkVisibility);
				}
			}
		};
		checkVisibility();
		window.addEventListener('scroll', checkVisibility);
		return () => {
			window.removeEventListener('scroll', checkVisibility);
		};
	}, [ref, visibleCallBack]);

	return <Component.type {...Component.props} ref={ref} />;
};

export default VisibilityHandler;
