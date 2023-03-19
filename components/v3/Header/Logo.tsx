import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';
import { useRef } from 'react';
const Logo = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const playAudio = () => {
		const { current } = audioRef;
		if (current) current.play();
	};
	const pauseAudio = () => {
		const { current } = audioRef;
		if (current) current.pause();
	};
	return (
		<>
			<LazyImage
				alt="Morpankh - Krishna"
				className={classes.LogoImage}
				src={'/morpankh.svg'}
				// onMouseEnter={playAudio}
				// onMouseLeave={pauseAudio}
			/>
			<audio ref={audioRef} src="/chime-dust.wav" />
		</>
	);
};

export default Logo;
