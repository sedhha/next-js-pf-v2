import React from 'react';
import V2 from '@/v2/index';

type Props = {
	lastBuild: string;
};

export default function HomePage({ lastBuild }: Props) {
	return <V2 lastBuild={lastBuild} />;
}
