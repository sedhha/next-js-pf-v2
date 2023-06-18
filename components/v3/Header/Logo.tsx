import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onLogoHover } from '@/slices/analytics.slice';
import allEvents from '@/constants/all-interaction-events.json';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';
import { cacheFetch } from '@/utils/fe/cachedRequest';
const Logo = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const gotoHomeRoute = () => {
		router.push(`/`);
	};
	const {
		analytics: {
			staticContent: { clickEvents }
		},
		navigation: { csrfToken }
	} = useAppSelector((state) => state);
	const audioRef = useRef<HTMLAudioElement>(null);
	const [soundPlayed, setSoundPlayed] = useState(false);
	const playAudio = () => {
		const { current } = audioRef;
		if (current) {
			current
				.play()
				.then(() => setSoundPlayed(true))
				.catch(() => null);
		}
	};
	const stopAudio = () => {
		const { current } = audioRef;
		if (current) {
			current.pause();
			const key = (soundPlayed ? allEvents.soundPlayed : allEvents.soundPaused)
				.identifier;
			const description = (
				soundPlayed ? allEvents.soundPlayed : allEvents.soundPaused
			).description;

			const payload = {
				clickIdentifier: key,
				clickPerformedAt: new Date().toISOString(),
				clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1,
				clickDescription: description,
				identifier1: Math.max(
					+(clickEvents[key]?.identifier1 ?? 0),
					current.currentTime
				).toString()
			};
			dispatch(onLogoHover({ duration: current.currentTime, soundPlayed }));
			if (csrfToken) logEvent(csrfToken, key, payload);
			current.currentTime = 0;
		}
	};
	return (
		<>
			<LazyImage
				alt="Morpankh - Krishna"
				className={classes.LogoImage}
				src={'/morpankh.svg'}
				onMouseEnter={playAudio}
				onMouseLeave={stopAudio}
				onClick={gotoHomeRoute}
			/>
			<audio ref={audioRef} src="/chime-dust.wav" />
		</>
	);
};

export default Logo;
