import Videos from '@/components/v4/Videos';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function VideosPage() {
    return (
        <>
            <Videos />
            <NavigationButtons
                prevPage={{ label: 'Back to Awards', href: '/portfolio-awards' }}
                nextPage={{ label: 'Read Testimonials', href: '/portfolio-testimonials' }}
            />
        </>
    );
}