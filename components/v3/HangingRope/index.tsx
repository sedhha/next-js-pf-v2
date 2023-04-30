import classes from './HangingRope.module.css';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onDarkModeTrigger } from '@/slices/analytics.slice';
const HangingRope = () => {
	const dispatch = useAppDispatch();
	const {
		staticContent: {
			themes: { darkMode }
		}
	} = useAppSelector((state) => state.analytics);
	const [ropeClass, setRopeClass] = useState(classes.rope);
	const onRopePull = () => {
		setRopeClass(classes.rope + ' ' + classes.ropePulled);
		setTimeout(() => setRopeClass(classes.rope), 1500);
		dispatch(onDarkModeTrigger(!darkMode));
	};
	return (
		<div className={classes.container}>
			<section className={ropeClass} />
			<div className={classes.bulb} onClick={onRopePull} />
		</div>
	);
};

export default HangingRope;
