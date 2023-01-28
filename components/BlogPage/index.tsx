import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Footer from '@/components/v2/Footer';
import Header from '@/components/v2/Header';
import BlogContent from './BlogContent';
import attributes from '@/constants/header-attr.json';
import { updateActiveSection } from '@/slices/navigation.slice';
export default function BlogPost() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(updateActiveSection(attributes.Blog));
	}, [dispatch]);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<Header />
			<BlogContent />
			<Footer />
		</div>
	);
}
