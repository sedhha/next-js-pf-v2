// app/blogs/page.tsx
import { queryAllCategories, queryBlogsByCategory } from '@/backend/contentful';
import BlogView from '@/components/v4/Blog/BlogView';

type Category = { category?: string; };

export default async function BlogsPage({ category }: Category) {

    const categoriesRes = await queryAllCategories();
    const categories = ['All', ...categoriesRes.data.output.items.map((i: any) => i.slug)];

    const blogs =
        category === 'All'
            ? await queryBlogsByCategory('*', 100, 0)
            : await queryBlogsByCategory(category ?? '*', 100, 0);

    const categoryFilteredBlogs = blogs.items.reduce((acc: any[], blog: any) => {
        const { title = '', slug = '' } = blog.categories?.[0] ?? {};
        if (!title || !slug) return acc;
        acc.push({
            id: blog.id,
            title: blog.title,
            mainCategory: title,
            featuredImage: blog.img,
            postDate: blog.date,
            categoryID: slug,
            excerpt: blog.excerpt,
        });
        return acc;
    }, []);

    return (
        <BlogView
            categories={categories}
            categoryFilteredBlogs={categoryFilteredBlogs}
            selectedCategory={category ?? 'All'}
        />
    );
}

// If you want SSR always (no cache):
export const dynamic = 'force-dynamic';
// Or ISR: export const revalidate = 60;
