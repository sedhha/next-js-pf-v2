import Blog from '@/components/v4/Blog';
import NavigationButtons from '@/components/v4/NavigationButtons';


export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const params = await searchParams;
    return (
        <>
            <Blog category={params?.category} />
            <NavigationButtons
                prevPage={{ label: 'Back to Projects', href: '/portfolio-projects' }}
                nextPage={{ label: 'View Awards', href: '/portfolio-awards' }}
            />
        </>
    );
}
