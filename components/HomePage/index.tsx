import React from 'react';
import Header from '@/components/header';
import Intro from './Intro';
import Work from './Work';
import Contact from './Contact';
import Projects from './Projects';
import { useAppSelector } from '../../redux/tools/hooks';
import Blog from './Blog';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<div className="header">
				<Header />
			</div>
			<main className="body">
				<Intro />
				<Work />
				<Blog />
				<Contact />
				<Projects />
			</main>
		</div>
	);
}
