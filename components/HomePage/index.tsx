import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import V2 from '@/v2/index';

type Props = {
	lastBuild: string;
};

export default function HomePage({ lastBuild }: Props) {
	const { darkMode } = useAppSelector((state) => state.navigation);
	return (
		<div className={darkMode ? 'darkMode' : 'lightMode'}>
			<V2 lastBuild={lastBuild} />
		</div>
	);
}
