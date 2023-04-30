import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';
import { useRef } from 'react';
import { useRouter } from 'next/router';
const Logo = () => {
	const router = useRouter();
	const gotoHomeRoute = () => {
		router.push(`/`);
	};
	const audioRef = useRef<HTMLAudioElement>(null);
	const playAudio = () => {
		const { current } = audioRef;
		if (current) current.play();
	};
	const stopAudio = () => {
		const { current } = audioRef;
		if (current) {
			current.pause();
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
