import React from 'react';
import Header from '@/components/header';
import Intro from '../Intro';
import { useAppSelector } from '../../redux/tools/hooks';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<React.Fragment>
			<div className={`headers ${darkMode ? 'darkMode' : 'lightMode'}`}>
				<Header />
			</div>
			<div className="body">
				<Intro />
			</div>
		</React.Fragment>
	);
}
