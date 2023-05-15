import React from 'react';
import classes from './RadioToggle.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
	onCommonClickDispatcher,
	onDarkModeTrigger
} from '@/slices/analytics.slice';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import allEvents from '@/constants/all-interaction-events.json';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';

export default function DarkModeToggle() {
	const dispatch = useAppDispatch();

	const {
		navigation: { csrfToken },
		analytics: {
			staticContent: {
				themes: { darkMode }
			}
		}
	} = useAppSelector((state) => state);
	const setOn = async (value: boolean) => {
		dispatch(onDarkModeTrigger(value));
		const key = (value ? allEvents.darkModeEnabled : allEvents.darkModeDisabled)
			.identifier;
		const description = (
			value ? allEvents.darkModeEnabled : allEvents.darkModeDisabled
		).description;
		const payload = {
			clickIdentifier: key,
			clickPerformedAt: new Date().toISOString(),
			clickedTimes: 1,
			clickDescription: description
		};
		dispatch(
			onCommonClickDispatcher({
				key,
				value: payload
			})
		);
		console.log('CSRF = ', csrfToken);
		if (csrfToken) {
			console.log('Comes in ', csrfToken);
			logEvent(csrfToken, key, payload);
		}
	};
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
