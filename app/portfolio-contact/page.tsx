import Contact from '@/components/v4/Contact';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function ContactPage() {
    return (
        <>
            <Contact />
            <NavigationButtons
                prevPage={{ label: 'Back to Tech Stack', href: '/portfolio-techstack' }}
            />
        </>
    );
}