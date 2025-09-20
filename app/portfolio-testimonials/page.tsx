import Testimonials from '@/components/v4/Testimonials';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function TestimonialsPage() {
    return (
        <>
            <Testimonials />
            <NavigationButtons
                prevPage={{ label: 'Back to Videos', href: '/portfolio-videos' }}
                nextPage={{ label: 'View Tech Stack', href: '/portfolio-techstack' }}
            />
        </>
    );
}