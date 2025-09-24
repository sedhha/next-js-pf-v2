'use client';
import { getCategoryTheme } from '@/v4/Blog/utils';
import { useRouter } from 'next/navigation';
import { IBlog } from '@/v4/Blog/types';

type SelectCategoriesProps = {
    categories: { title: string; slug: string; }[];
    allBlogs: IBlog[];
}

export const SelectCategories = ({ categories, allBlogs }: SelectCategoriesProps) => {
    const router = useRouter();
    const onCategorySelect = (category: string) => {
        const url = category === 'All'
            ? '/portfolio-blog'
            : `/portfolio-blog?category=${encodeURIComponent(category)}`;
        router.push(url);
    }

    return <div className="space-y-3">
        {categories.slice(1, 4).map((category) => {
            const theme = getCategoryTheme(category.title);
            const count = allBlogs.filter(
                (blog) => blog.mainCategory === category.title
            ).length;
            return (
                <button
                    key={category.slug}
                    onClick={() => onCategorySelect(category.slug)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-lg">{theme.icon}</span>
                        <span className="text-white font-medium">{category.title}</span>
                    </div>
                    <span className={`text-${theme.secondary} font-bold`}>{count}</span>
                </button>
            );
        })}
    </div>;
}