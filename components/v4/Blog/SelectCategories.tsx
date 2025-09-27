'use client';
import { getCategoryTheme } from '@/v4/Blog/utils';
import { useRouter } from 'next/navigation';

type SelectCategoriesProps = {
    categories: { slug: string; title: string; total: number }[];
}

export const SelectCategories = ({ categories }: SelectCategoriesProps) => {
    const router = useRouter();
    const onCategorySelect = (category: string) => {
        const url = category === 'All'
            ? '/portfolio-blogs'
            : `/portfolio-blogs?category=${encodeURIComponent(category)}`;
        router.push(url);
    }

    return <div className="space-y-3">
        {categories.map((category) => {
            const theme = getCategoryTheme(category.title);
            const count = category.total ?? 0;
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