import { WorkInProgressBar } from '@/components/v4/Blog/WorkInProgressBar';
import { HeroBlogCard } from '@/components/v4/Blog/HeroBlogCard';
import { TimelineBlogCard } from '@/components/v4/Blog/TimelineBlogCard';
import { StatsCard } from '@/components/v4/Blog/StatsCard';
import { Categories } from '@/components/v4/Blog/Categories';
import { SelectCategories } from '@/components/v4/Blog/SelectCategories';
import {
    getCategoriesWithBlogCount,
    queryAllCategories,
    queryBlogsByCategory
} from '@/backend/contentful';
import { toFEBlog, toFECategory } from '@/components/v4/Blog/utils';

// Main Blog Component
const Blog = async ({ category: selectedCategory }: { category?: string }) => {
    const categories = toFECategory(await queryAllCategories());
    const allBlogs = await queryBlogsByCategory(selectedCategory ?? '*', 100, 0);
    const [mainBlog, ...filteredBlogs] = toFEBlog(allBlogs);

    const categoryCount = await getCategoriesWithBlogCount();

    return (
        <section className="relative py-20 px-4 bg-black pb-32">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-violet-500/20 to-purple-500/10 blur-3xl animate-pulse [animation-delay:1s]"></div>
                <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 blur-3xl animate-pulse [animation-delay:3s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-rose-500/5 to-transparent blur-2xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-violet-500/20 mb-6">
                        <span className="text-2xl">🧠</span>
                        <span className="text-violet-300 font-medium">Mind Explorations</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6">
                        <span className="bg-gradient-to-r from-violet-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            Thoughts & Ideas
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        A collection of musings on technology, consciousness, and the beautiful
                        complexity of existence. Each piece a fragment of understanding in the
                        infinite puzzle of reality.
                    </p>
                </div>

                {/* Work in Progress Bar */}
                <WorkInProgressBar />

                {/* Hero Featured Story */}
                <div className="mb-20">
                    <HeroBlogCard blog={mainBlog} />
                </div>

                {/* Category Filter Pills */}
                <Categories categories={categories} selectedCategory={selectedCategory} />

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Timeline Stories - 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
                                <span className="text-black font-bold text-lg">⚡</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Story Timeline</h3>
                                <p className="text-gray-400">Chronological journey through ideas</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {filteredBlogs.map((blog, index) => (
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
                                    value={allBlogs.total.toString()}
                                    label="Total Stories"
                                    color="emerald-400"
                                />
                                <StatsCard
                                    icon="🏷️"
                                    value={categories.length.toString()}
                                    label="Categories"
                                    color="violet-400"
                                />
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

                            <SelectCategories categories={categoryCount} />
                        </div>

                        {/* Philosophy Quote */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
                                <div className="text-4xl mb-4">💭</div>
                                <blockquote className="text-gray-300 italic leading-relaxed">
                                    &quot;Every blog post is just a thought captured in words—simple,
                                    finite, yet able to spark new ideas.&quot;
                                </blockquote>
                                <div className="text-emerald-400 font-medium mt-4">
                                    — The Digital Philosopher
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
