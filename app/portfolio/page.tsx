import IntroV4 from '@/components/v4/Intro';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function IntroPage() {
    return (
        <>
            <IntroV4 />
            <NavigationButtons
                nextPage={{ label: 'Explore My Work', href: '/portfolio-work' }}
            />
        </>
    );
}