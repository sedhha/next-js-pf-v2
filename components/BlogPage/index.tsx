import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Footer from '@/components/v2/Footer';
import Header from '@/components/v2/Header';
import BlogContent from './BlogContent';
import { useRouter } from 'next/router';
export default function BlogPost() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	const router = useRouter();
	const { blogID } = router.query;
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<Header />
			<BlogContent />
			<Footer />
		</div>
	);
}
