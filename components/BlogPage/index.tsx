import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Header from '@/v2/Header';
import BlogSection from './BlogSections';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<Header />
			<BlogSection />
		</div>
	);
}
