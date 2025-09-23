import React from 'react';
import Awards from '@/components/v4/Awards';
import Blog from '@/components/v4/Blog/index_v2';
import Contact from '@/components/v4/Contact';
import Footer from '@/components/v4/Footer';
import IntroV4 from '@/components/v4/Intro';
import Projects from '@/components/v4/Projects';
import TechStack from '@/components/v4/TechStack';
import Testimonials from '@/components/v4/Testimonials';
import Videos from '@/components/v4/Videos';
import Work from '@/components/v4/Work';

export default function HomePageV4() {
    return (
        <>
            <IntroV4 />
            <Work />
            <Blog />
            <Contact />
            <Projects />
            <Awards />
            <Videos />
            <Testimonials />
            <TechStack />
            <Footer />
        </>
    );
}