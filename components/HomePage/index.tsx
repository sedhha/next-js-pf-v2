import React from 'react';
import Header from '@/components/header';
import Intro from './Intro';
import Work from './Work';
import Contact from './Contact';
import Projects from './Projects';
import { useAppSelector } from '@/redux/hooks';
import Blog from './Blog';
import Awards from './AwardsAndRecognitions';
import Videos from './Videos';
import Testimonials from './Testimonials';
import TechStack from './TechStacks';

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
				<Awards />
				<Videos />
				<Testimonials />
				<TechStack />
			</main>
		</div>
	);
}
