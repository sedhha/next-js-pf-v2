import classes from './HangingRope.module.css';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateDarkMode } from '@/slices/navigation.slice';
const HangingRope = () => {
	const dispatch = useAppDispatch();
	const { darkMode } = useAppSelector((state) => state.navigation);
	const [ropeClass, setRopeClass] = useState(classes.rope);
	const onRopePull = () => {
		setRopeClass(classes.rope + ' ' + classes.ropePulled);
		setTimeout(() => setRopeClass(classes.rope), 1500);
		dispatch(updateDarkMode(!darkMode));
	};
	return (
		<div className={classes.container}>
			<section className={ropeClass} />
			<div className={classes.bulb} onClick={onRopePull} />
		</div>
	);
};

export default HangingRope;
