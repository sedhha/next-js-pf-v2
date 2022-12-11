import Awards from './AwardsAndRecognitions';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';
import Header from '@/components/header';
import Intro from './Intro';
import Projects from './Projects';
import React from 'react';
import TechStack from './TechStacks';
import Testimonials from './Testimonials';
import Videos from './Videos';
import Work from './Work';
import { useAppSelector } from '@/redux/hooks';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<header className="header">
				<Header />
			</header>
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
				<Footer />
			</main>
		</div>
	);
}
