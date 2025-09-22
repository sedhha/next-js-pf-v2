import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogsByCategory, getCategoryBySlug, type BlogPost, type BlogCategory } from '@/lib/blog-service';
import BlogPagination from './BlogPagination';

interface Props {
    params: Promise<{
        category: string;
    }>;
    searchParams: Promise<{
        from?: string;
        to?: string;
    }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
    const categories = ['iot', 'mechanical', 'life', 'web-development', 'mobile-app-development', 'automation'];

    return categories.map((category) => ({
        category: category,
    }));
}

// Format date for display
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

// Blog card component with v4 styling
function BlogCard({ blog, category }: { blog: BlogPost; category: BlogCategory }) {
    return (
        <Link
            href={`/portfolio-blogs/${category.slug}/${blog.slug}`}
            className="group block"
        >
            <article className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-black/50 hover:border-gray-700/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                {/* Image and meta */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="80px"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{category.icon}</span>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full bg-${category.theme.bg} text-${category.theme.secondary} border border-${category.theme.border}`}>
                                {category.name}
                            </span>
                        </div>
                        <h2 className="text-white font-bold text-xl leading-tight line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300">
                            {blog.title}
                        </h2>
                    </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-gray-800/50 text-gray-300">
                            #{tag}
                        </span>
                    ))}
                    {blog.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-800/50 text-gray-400">
                            +{blog.tags.length - 3} more
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                                src={blog.author.avatar}
                                alt={blog.author.name}
                                fill
                                className="object-cover"
                                sizes="24px"
                            />
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-300">{blog.author.name}</span>
                            <span className="text-gray-500 mx-2">•</span>
                            <span className="text-gray-500">{formatDate(blog.publishDate)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>📖</span>
                        <span>{blog.readTime} min read</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// Loading skeleton
function BlogSkeleton() {
    return (
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl bg-gray-700"></div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 bg-gray-700 rounded"></div>
                        <div className="w-16 h-5 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
            </div>
            <div className="flex gap-2 mb-4">
                <div className="w-12 h-6 bg-gray-700 rounded"></div>
                <div className="w-16 h-6 bg-gray-700 rounded"></div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                    <div className="w-32 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="w-20 h-4 bg-gray-700 rounded"></div>
            </div>
        </div>
    );
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { category: categorySlug } = await params;
    const { from: fromParam, to: toParam } = await searchParams;

    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const from = parseInt(fromParam || '0', 10);
    const to = parseInt(toParam || '10', 10);

    const { blogs, total, currentPage, totalPages } = getBlogsByCategory(
        categorySlug,
        from,
        to
    );

    return (
        <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background - V4 Style */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Moving Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce delay-0 shadow-lg shadow-emerald-400/30" />
                <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce delay-500 shadow-lg shadow-cyan-400/30" />
                <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-violet-400/50 rounded-full animate-bounce delay-1000 shadow-lg shadow-violet-400/30" />

                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-emerald-400/40 rounded-full shadow-lg shadow-emerald-500/20">
                        <span className="text-3xl">{category.icon}</span>
                        <span className="text-emerald-300 font-semibold tracking-wide">
                            {category.name.toUpperCase()}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${category.theme.gradient} hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 transition-all duration-700 transform hover:scale-105 drop-shadow-lg`}>
                            {category.name} Stories
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                        {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400/60 to-cyan-400/60" />
                        <span className="text-emerald-300 font-medium">{total} Articles</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent via-cyan-400/60 to-violet-400/60" />
                    </div>
                </div>

                {/* Blog Grid */}
                <Suspense fallback={
                    <div className="grid gap-8 lg:gap-12">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <BlogSkeleton key={i} />
                        ))}
                    </div>
                }>
                    {blogs.length === 0 ? (
                        <div className="text-center py-32">
                            <div className="relative mx-auto mb-8 w-32 h-32">
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.theme.gradient} opacity-30 rounded-3xl rotate-12 animate-pulse shadow-lg`} />
                                <div className="relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl w-full h-full flex items-center justify-center">
                                    <span className="text-4xl">{category.icon}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No articles yet</h3>
                            <p className="text-gray-300 max-w-md mx-auto">
                                Articles in the {category.name} category are coming soon. Check back later for exciting content!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 lg:gap-12">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} category={category} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16">
                                    <BlogPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        categorySlug={categorySlug}
                                        from={from}
                                        to={to}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </Suspense>
            </div>
        </section>
    );
}