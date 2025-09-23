'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { HeroBlogCard } from '@/components/v4/Blog/HeroBlogCard';
import { WorkInProgressBar } from '@/components/v4/Blog/WorkInProgressBar';
import { TimelineBlogCard } from '@/components/v4/Blog/TimelineBlogCard';
import { StatsCard } from '@/components/v4/Blog/StatsCard';
import { getCategoryTheme } from '@/components/v4/Blog/utils';

type Props = {
    categories: string[];
    categoryFilteredBlogs: any[];
    selectedCategory: string;
};

export default function BlogView({ categories, categoryFilteredBlogs, selectedCategory }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [mainBlog, ...allBlogs] = categoryFilteredBlogs ?? [];

    const handleCategoryChange = (cat: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (cat === 'All') params.delete('category');
        else params.set('category', cat);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <section className="relative py-20 px-4 bg-black pb-32">
            {/* ... keep your JSX ... */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${selectedCategory === cat
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                            : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                            }`}
                    >
                        {cat === 'All' && '🌟'} {cat}
                    </button>
                ))}
            </div>

            <WorkInProgressBar />
            <div className="mb-20">
                <HeroBlogCard blog={mainBlog} />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="relative">
                        {allBlogs.map((blog, index) => (
                            <TimelineBlogCard key={blog.id} blog={blog} index={index} />
                        ))}
                    </div>
                </div>
                {/* Sidebar - 1 column */}
                <div className="space-y-8">
                    {/* Blog Statistics */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <span className="text-2xl">📊</span>
                            Blog Metrics
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <StatsCard
                                icon="📝"
                                value={allBlogs.length.toString()}
                                label="Total Stories"
                                color="emerald-400"
                            />
                            <StatsCard icon="🏷️" value="6" label="Categories" color="violet-400" />
                            <StatsCard
                                icon="📅"
                                value="2023"
                                label="Latest Year"
                                color="cyan-400"
                            />
                            <StatsCard icon="💡" value="∞" label="Ideas" color="purple-400" />
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-6 h-6 rounded bg-gradient-to-r from-violet-500 to-emerald-500"></span>
                            Quick Access
                        </h3>

                        <div className="space-y-3">
                            {categories.slice(1, 4).map((category) => {
                                const theme = getCategoryTheme(category);
                                const count = allBlogs.filter(
                                    (blog) => blog.mainCategory === category
                                ).length;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{theme.icon}</span>
                                            <span className="text-white font-medium">{category}</span>
                                        </div>
                                        <span className={`text-${theme.secondary} font-bold`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Philosophy Quote */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                        <div className="relative bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
                            <div className="text-4xl mb-4">💭</div>
                            <blockquote className="text-gray-300 italic leading-relaxed">
                                &quot;Every blog post is a quantum of thought—collapsing infinite
                                possibilities into finite words, yet somehow expanding
                                consciousness.&quot;
                            </blockquote>
                            <div className="text-emerald-400 font-medium mt-4">
                                — The Digital Philosopher
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
