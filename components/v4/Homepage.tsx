import React from 'react';
import IntroV4 from '@/components/v4/Intro';
import Work from '@/components/v4/Work';
import Blog from '@/components/v4/Blog';
import Contact from '@/components/v4/Contact';
import Projects from '@/components/v4/Projects';

type Props = {
    lastBuild: string;
};

// eslint-disable-next-line no-unused-vars
export default function HomePageV4({ lastBuild }: Props) {
    return (
        <>
            <IntroV4 />
            <Work />
            <Blog />
            <Contact />
            <Projects />

        </>
    );
}