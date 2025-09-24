// app/blogs/page.tsx
import { queryAllCategories, queryBlogsByCategory } from '@/backend/contentful';
import BlogView from '@/components/v4/Blog/BlogView';
import { toFEBlog } from '@/components/v4/Blog/utils';

type Category = { category?: string; };

export default async function BlogsPage({ category }: Category) {

    const categoriesRes = await queryAllCategories();
    const categories = ['All', ...categoriesRes.data.output.items.map((i: any) => i.slug)];

    const blogs =
        category === 'All'
            ? await queryBlogsByCategory('*', 100, 0)
            : await queryBlogsByCategory(category ?? '*', 100, 0);

    const categoryFilteredBlogs = toFEBlog(blogs);

    return (
        <BlogView
            categories={categories}
            categoryFilteredBlogs={categoryFilteredBlogs}
            selectedCategory={category ?? 'All'}
        />
    );
}

// SSR always (no cache):
export const dynamic = 'force-dynamic';
// Or ISR: export const revalidate = 60;
