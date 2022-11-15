import React from 'react';
import classes from './DarkModeToggle.module.css';

export default function DarkModeToggle() {
	const [on, setOn] = React.useState(true);
	return (
		<div className={classes.SwitchBoard} onClick={() => setOn((prev) => !prev)}>
			<div
				className={[
					classes.ToggleSwitch,
					on ? classes.ToggleSwitch_on : classes.ToggleSwitch_off
				].join(' ')}
			></div>
		</div>
	);
}
