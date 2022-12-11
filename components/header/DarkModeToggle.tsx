import React from 'react';
import classes from './DarkModeToggle.module.css';
import { useAppSelector, useAppDispatch } from '../../redux/tools/hooks';
import { updateDarkMode } from '@/slices/navigation.slice';

export default function DarkModeToggle() {
	const dispatch = useAppDispatch();
	const setOn = (value: boolean) => dispatch(updateDarkMode(value));
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={classes.SwitchBoard} onClick={() => setOn(!darkMode)}>
			<div
				className={[
					classes.ToggleSwitch,
					!darkMode ? classes.ToggleSwitch_on : classes.ToggleSwitch_off
				].join(' ')}
			></div>
		</div>
	);
}
