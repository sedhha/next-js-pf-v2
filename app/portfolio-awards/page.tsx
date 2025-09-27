import Awards from '@/components/v4/Awards';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function AwardsPage() {
    return (
        <>
            <Awards />
            <NavigationButtons
                prevPage={{ label: 'Back to Blog', href: '/portfolio-blogs' }}
                nextPage={{ label: 'Watch Videos', href: '/portfolio-videos' }}
            />
        </>
    );
}