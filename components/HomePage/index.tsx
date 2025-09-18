import React from 'react';
// import V2 from '@/v2/index';
import V4HomePage from '@/components/v4';

type Props = {
	lastBuild: string;
};

export default function HomePage({ lastBuild }: Props) {
	// Temporarily use v4 to test the new Intro component
	// Change back to V2 when needed: return <V2 lastBuild={lastBuild} />;
	return <V4HomePage lastBuild={lastBuild} />;
}
