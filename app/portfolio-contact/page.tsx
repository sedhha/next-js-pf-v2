import { ContactServer } from '@/components/v4/ContactServer';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function ContactPage() {
    return (
        <>
            <ContactServer />
            <NavigationButtons
                prevPage={{ label: 'Back to Tech Stack', href: '/portfolio-techstack' }}
            />
        </>
    );
}