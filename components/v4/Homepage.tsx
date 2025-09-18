import React from 'react';
import Awards from '@/components/v4/Awards';
import Blog from '@/components/v4/Blog';
import Contact from '@/components/v4/Contact';
import IntroV4 from '@/components/v4/Intro';
import Projects from '@/components/v4/Projects';
import Work from '@/components/v4/Work';

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
            <Awards />

        </>
    );
}