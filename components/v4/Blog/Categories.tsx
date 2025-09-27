'use client';

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type CategoriesProps = {
    categories: { slug?: string; title: string; }[];
    selectedCategory?: string;
}
const MAX_VISIBLE_CATEGORIES = 6;

export const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
    const hiddenCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

    const onCategorySelect = (category?: string) => {
        const url = !category || category === 'All'
            ? '/portfolio-blogs'
            : `/portfolio-blogs?category=${encodeURIComponent(category)}`;
        router.push(url);
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const CategoryButton = ({ category, isSelected }: { category: { slug?: string; title: string; }, isSelected: boolean }) => (
        <button
            onClick={() => onCategorySelect(category.slug)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap ${isSelected
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                }`}
        >
            {category.title === 'All' && '🌟'} {category.title}
        </button>
    );

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {/* Visible categories */}
            {visibleCategories.map((category) => (
                <CategoryButton
                    key={category.slug}
                    category={category}
                    isSelected={selectedCategory === category.slug}
                />
            ))}

            {/* Dropdown for additional categories */}
            {hiddenCategories.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 ${hiddenCategories.some(cat => cat.slug === selectedCategory)
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                            : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                            }`}
                    >
                        <span>More</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 py-2 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
                            {hiddenCategories.map((category) => (
                                <button
                                    key={category.slug}
                                    onClick={() => onCategorySelect(category.slug)}
                                    className={`w-full text-left px-4 py-3 transition-all duration-200 hover:bg-gray-800/50 ${selectedCategory === category.slug
                                        ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-l-2 border-emerald-500'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {category.title === 'All' && '🌟 '}{category.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};