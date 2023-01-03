import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import V2 from '@/v2/index';

export default function HomePage() {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<V2 />
		</div>
	);
}
