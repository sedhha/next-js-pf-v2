import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Header from '@/v2/Header';
import Intro from '@/v2/Intro';
import Work from '@/v2/Work';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<Header />
			<Intro />
			<Work />
		</div>
	);
}
