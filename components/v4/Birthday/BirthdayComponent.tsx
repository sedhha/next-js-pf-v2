'use client';
import { useEffect, useState } from 'react';
import { useBirthdayStore } from '@/lib/stores/birthdayStore';
import BirthdayIntro from '@/components/v4/Birthday/Intro';
import TokenView from '@/components/v4/Birthday/TokenView';
import ConfigCardsView from '@/components/v4/Birthday/ConfigCards';
import ChatComponent from '@/components/v4/Birthday/ConfigComponents/ChatComponent';
import Component2 from '@/components/v4/Birthday/ConfigComponents/Component2';

const HappyBirthdayPage: React.FC = (): React.ReactElement => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { currentView, birthdayToken, setCurrentView } = useBirthdayStore();

    useEffect(() => {
        // Mark as hydrated after client-side mount
        setIsHydrated(true);

        // Initialize store on mount - only set initial view if not already set
        if (!birthdayToken) {
            setCurrentView('intro');
        }

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
    }, []); // Empty dependency array - only run once on mount

    const renderView = (): React.ReactElement => {
        switch (currentView) {
            case 'intro':
                return <BirthdayIntro />;
            case 'token':
                return <TokenView />;
            case 'cards':
                return <ConfigCardsView />;
            case 'component1':
                return <ChatComponent />;
            case 'component2':
                return <Component2 />;
            default:
                return <BirthdayIntro />;
        }
    };

    // Show loading state until hydration is complete
    if (!isHydrated) {
        return (
            <div className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                                style={{
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 overflow-hidden bg-black">
            {renderView()}
        </div>
    );
};

export default HappyBirthdayPage;