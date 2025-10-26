'use client';
import { useEffect } from 'react';
import { useBirthdayStore } from '@/lib/stores/birthdayStore';
import BirthdayIntro from '@/components/v4/Birthday/Intro';
import TokenView from '@/components/v4/Birthday/TokenView';
import ConfigCardsView from '@/components/v4/Birthday/ConfigCards';
import Component1 from '@/components/v4/Birthday/ConfigComponents/Component1';
import Component2 from '@/components/v4/Birthday/ConfigComponents/Component2';

const HappyBirthdayPage: React.FC = (): React.ReactElement => {
    const currentView = useBirthdayStore((state) => state.currentView);

    useEffect(() => {
        // Initialize store on mount
        useBirthdayStore.setState({ currentView: 'intro' });

        // Prevent scrolling on html and body
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        htmlElement.style.overflow = 'hidden';
        bodyElement.style.overflow = 'hidden';
        htmlElement.style.height = '100%';
        bodyElement.style.height = '100%';

        // Cleanup on unmount
        return () => {
            htmlElement.style.overflow = '';
            bodyElement.style.overflow = '';
            htmlElement.style.height = '';
            bodyElement.style.height = '';
        };
    }, []);

    console.log('Current View:', currentView);

    const renderView = (): React.ReactElement => {
        switch (currentView) {
            case 'intro':
                return <BirthdayIntro />;
            case 'token':
                return <TokenView />;
            case 'cards':
                return <ConfigCardsView />;
            case 'component1':
                return <Component1 />;
            case 'component2':
                return <Component2 />;
            default:
                return <BirthdayIntro />;
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-black">
            {renderView()}
        </div>
    );
};

export default HappyBirthdayPage;