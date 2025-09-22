import TechStack from '@/components/v4/TechStack';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function TechStackPage() {
    return (
        <>
            <TechStack />
            <NavigationButtons
                prevPage={{ label: 'Return to Testimonials', href: '/portfolio-testimonials' }}
                nextPage={{ label: 'Get In Touch', href: '/portfolio-contact' }}
            />
        </>
    );
}