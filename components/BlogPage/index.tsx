import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Footer from '@/components/v2/Footer';
import Header from '@/components/v2/Header';
import BlogContent from './BlogContent';
import attributes from '@/constants/header-attr.json';
import { onNewSectionView } from '@/slices/analytics.slice';

type Props = {
	lastBuild: string;
};
export default function BlogPost({ lastBuild }: Props) {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(onNewSectionView(attributes.Blog));
	}, [dispatch]);
	return (
		<>
			<Header />
			<BlogContent />
			<Footer lastBuild={lastBuild} />
		</>
	);
}
