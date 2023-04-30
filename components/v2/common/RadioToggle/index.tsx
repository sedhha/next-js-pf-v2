import React from 'react';
import classes from './RadioToggle.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { onDarkModeTrigger } from '@/slices/analytics.slice';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

export default function DarkModeToggle() {
	const dispatch = useAppDispatch();
	const setOn = (value: boolean) => dispatch(onDarkModeTrigger(value));
	const {
		staticContent: {
			themes: { darkMode }
		}
	} = useAppSelector((state) => state.analytics);
	return (
		<div className={classes.SwitchBoard} onClick={() => setOn(!darkMode)}>
			<BsMoonStarsFill
				className={`${classes.nightIcon}${
					darkMode ? ' ' + classes.showSymbol : ''
				}`}
			/>
			<section className={darkMode ? classes.off : classes.on} />
			<BsFillSunFill
				className={`${classes.dayIcon}${!darkMode ? ' ' + classes.showSymbol : ''}`}
			/>
		</div>
	);
}
