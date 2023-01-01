import React from 'react';
import classes from './RadioToggle.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateDarkMode } from '@/slices/navigation.slice';

export default function DarkModeToggle() {
	const dispatch = useAppDispatch();
	const setOn = (value: boolean) => dispatch(updateDarkMode(value));
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={classes.SwitchBoard} onClick={() => setOn(!darkMode)}>
			<section className={darkMode ? classes.off : classes.on} />
		</div>
	);
}
