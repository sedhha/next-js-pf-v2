'use client';

import { useRouter } from "next/navigation";

type CategoriesProps = {
    categories: { slug?: string; title: string; }[];
    selectedCategory?: string;
}

export const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
    const router = useRouter();
    const onCategorySelect = (category?: string) => {
        const url = !category || category === 'All'
            ? '/portfolio-blog'
            : `/portfolio-blog?category=${encodeURIComponent(category)}`;
        router.push(url);
    }
    return <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
            <button
                key={category.slug}
                onClick={() => onCategorySelect(category.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                    : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                    }`}
            >
                {category.title === 'All' && '🌟'} {category.title}
            </button>
        ))}
    </div>;
}