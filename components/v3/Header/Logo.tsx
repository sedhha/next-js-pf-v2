import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { onLogoHover } from '@/slices/analytics.slice';
const Logo = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const gotoHomeRoute = () => {
		router.push(`/`);
	};
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
			dispatch(onLogoHover({ duration: current.currentTime, soundPlayed }));
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
