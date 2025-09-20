import Work from '@/components/v4/Work';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function WorkPage() {
    return (
        <>
            <Work />
            <NavigationButtons
                prevPage={{ label: 'Back to Intro', href: '/portfolio-intro' }}
                nextPage={{ label: 'View Projects', href: '/portfolio-projects' }}
            />
        </>
    );
}