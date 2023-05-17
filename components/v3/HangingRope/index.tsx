import classes from './HangingRope.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	onCommonClickDispatcher,
	onDarkModeTrigger
} from '@/slices/analytics.slice';
import allEvents from '@/constants/all-interaction-events.json';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';
const HangingRope = () => {
	const dispatch = useAppDispatch();
	const {
		navigation: { csrfToken },
		analytics: {
			staticContent: {
				themes: { darkMode },
				clickEvents
			}
		}
	} = useAppSelector((state) => state);
	const [ropeClass, setRopeClass] = useState(classes.rope);
	const onRopePull = () => {
		setRopeClass(classes.rope + ' ' + classes.ropePulled);
		setTimeout(() => setRopeClass(classes.rope), 1500);
		const value = !darkMode;
		dispatch(onDarkModeTrigger(value));
		const key = (value ? allEvents.darkModeEnabled : allEvents.darkModeDisabled)
			.identifier;
		const description = (
			value ? allEvents.darkModeEnabled : allEvents.darkModeDisabled
		).description;
		const payload = {
			clickIdentifier: key,
			clickPerformedAt: new Date().toISOString(),
			clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1,
			clickDescription: description
		};
		dispatch(
			onCommonClickDispatcher({
				key,
				value: payload
			})
		);
		if (csrfToken) logEvent(csrfToken, key, payload);
	};
	return (
		<div className={classes.container}>
			<section className={ropeClass} />
			<div className={classes.bulb} onClick={onRopePull} />
		</div>
	);
};

export default HangingRope;
