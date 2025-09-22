import Projects from '@/components/v4/Projects';
import NavigationButtons from '@/components/v4/NavigationButtons';

export default function ProjectsPage() {
    return (
        <>
            <Projects />
            <NavigationButtons
                prevPage={{ label: 'Back to Work', href: '/portfolio-work' }}
                nextPage={{ label: 'Read My Thoughts', href: '/portfolio-blog' }}
            />
        </>
    );
}