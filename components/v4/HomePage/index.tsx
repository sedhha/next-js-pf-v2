import React from 'react';
import Header from '@/v4/Header'; // Keep existing v3 header for now
import IntroV4 from '@/v4/Intro';
import Work from '@/v4/Work';
import Blog from '@/v4/Blog';
import Contact from '@/v4/Contact';

type Props = {
    lastBuild: string;
};

// eslint-disable-next-line no-unused-vars
export default function HomePageV4({ lastBuild }: Props) {
    return (
        <>
            <Header />
            <IntroV4 />
            <Work />
            <Blog />
            <Contact />

        </>
    );
}