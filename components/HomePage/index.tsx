import React from 'react';
import Header from '@/components/header';
import Intro from '../Intro';
import { useAppSelector } from '../../redux/tools/hooks';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<div className="header">
				<Header />
			</div>
			<div className="body">
				<Intro />
			</div>
		</div>
	);
}
