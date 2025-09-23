import Blog from '@/components/v4/Blog/index_v2';
import NavigationButtons from '@/components/v4/NavigationButtons';


export default function BlogPage() {
    return (
        <>
            <Blog />
            <NavigationButtons
                prevPage={{ label: 'Back to Projects', href: '/portfolio-projects' }}
                nextPage={{ label: 'View Awards', href: '/portfolio-awards' }}
            />
        </>
    );
}
