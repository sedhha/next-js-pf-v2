import React from 'react';
import Header from '@/v3/Header'; // Keep existing v3 header for now
import IntroV4 from '@/v4/Intro';
// Import other v2 components as needed
import Work from '@/v2/Work';
import Blog from '@/v2/Blog';
import Contact from '@/v2/Contact';
import Projects from '@/v2/Projects';
import Awards from '@/v2/Awards';
import Videos from '@/v2/Videos';
import Testimonials from '@/v2/Testimonials';
import TechStack from '@/v2/TechStack';
import Footer from '@/v2/Footer';
import MobileNavigator from '@/v2/MobileNavigator';

type Props = {
    lastBuild: string;
};

export default function HomePageV4({ lastBuild }: Props) {
    return (
        <>
            <Header />
            <MobileNavigator />
            {/* New v4 Intro component */}
            <IntroV4 />
            {/* Keep other components as v2 for now */}
            <Work />
            <Blog />
            <Contact />
            <Projects />
            <Awards />
            <Videos />
            <Testimonials />
            <TechStack />
            <Footer lastBuild={lastBuild} />
        </>
    );
}