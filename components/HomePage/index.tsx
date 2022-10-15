import React from 'react';
import Header from '@/components/header';
import Intro from './Intro';
import WorkSection from './WorkSection';

export default function HomePage() {
	return (
		<React.Fragment>
			<div className="header">
				<Header />
			</div>
			<div className="body">
				<Intro />
				<WorkSection />
			</div>
		</React.Fragment>
	);
}
