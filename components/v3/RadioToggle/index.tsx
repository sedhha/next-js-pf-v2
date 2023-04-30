import React from 'react';
import classes from './RadioToggle.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateDarkMode } from '@/slices/navigation.slice';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

export default function DarkModeToggle() {
	const dispatch = useAppDispatch();
	const setOn = (value: boolean) => dispatch(updateDarkMode(value));
	const { darkMode } = useAppSelector((state) => state.navigation);
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
