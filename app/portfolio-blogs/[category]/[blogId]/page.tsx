import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/blog-service';
import { queryAllBlogs, queryBlogWithCategoryAndID } from '@/backend/contentful';
import MarkdownBlog from '@/components/v4/Blog/MarkdownBlog';

const calculateReadTime = (content: string, wordsPerMinute: number = 150): number => {
    if (!content) return 1;

    // Count words (split by whitespace and filter empty strings)
    const wordCount = content
        .split(/\s+/)
        .filter(word => word.length > 0).length;

    // Calculate read time in minutes, minimum 1 minute
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, readTime);
}

interface Props {
    params: Promise<{
        category: string;
        blogId: string;
    }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const allBlogs = await queryAllBlogs();

    return allBlogs.map((blog) => ({
        category: blog.category,
        blogId: blog.slug,
    }));
}

// Format date for display
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

// Helper function to get consistent theme classes
const getCategoryClasses = (themeKey: string) => {
    const themes: Record<string, { bg: string; border: string; text: string }> = {
        'emerald-400': {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/30',
            text: 'text-emerald-300'
        },
        'cyan-400': {
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500/30',
            text: 'text-cyan-300'
        },
        'purple-400': {
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/30',
            text: 'text-purple-300'
        },
        'violet-400': {
            bg: 'bg-violet-500/10',
            border: 'border-violet-500/30',
            text: 'text-violet-300'
        }
    };
    return themes[themeKey] || themes['emerald-400'];
};

export default async function BlogPage({ params }: Props) {
    const { category: categorySlug, blogId } = await params;
    const blog = await queryBlogWithCategoryAndID(categorySlug, blogId);
    const category = getCategoryBySlug(categorySlug);

    if (!blog || !category) {
        notFound();
    }

    const categoryClasses = getCategoryClasses(category.theme.primary);
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Animated Background - V4 Style */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Moving Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />

                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce delay-0 shadow-lg shadow-emerald-400/30" />
                    <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce delay-500 shadow-lg shadow-cyan-400/30" />

                    {/* Gradient orbs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Link
                                href="/portfolio-blogs"
                                className="hover:text-emerald-400 transition-colors duration-200"
                            >
                                Blog
                            </Link>
                            <span>→</span>
                            <Link
                                href={`/portfolio-blogs/${category.slug}`}
                                className="hover:text-emerald-400 transition-colors duration-200"
                            >
                                {category.name}
                            </Link>
                            <span>→</span>
                            <span className="text-gray-300">{blog.title}</span>
                        </div>
                    </nav>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${categoryClasses.bg} border ${categoryClasses.border} backdrop-blur-sm`}>
                            <span className="text-xl">{category.icon}</span>
                            <span className={`${categoryClasses.text} font-semibold text-sm`}>
                                {category.name}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                        {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={blog.author.avatar?.url || '/user.png'}
                                    alt={blog.author.authorName}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <div className="text-white font-semibold">{blog.author.authorName}</div>
                                <div className="text-gray-400 text-sm">{blog.author.bio}</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-px bg-gray-700"></div>

                        {/* Date & Read Time */}
                        <div className="text-gray-400 text-sm">
                            <div>{formatDate(blog.publishDate)}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <span>📖</span>
                                <span>{calculateReadTime(blog.content)} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {blog.categoriesCollection.items.map((tag, index) => (
                            <span
                                key={tag.slug}
                                className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${index % 2 === 0
                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                                    : 'bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-lg shadow-purple-500/10'
                                    }`}
                            >
                                #{tag.slug}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-gray-800/50">
                        <Image
                            src={blog.primaryImage?.url || '/cover-photo.png'}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <MarkdownBlog content={blog.content} />

            {/* Navigation Footer */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Back to Category */}
                            <Link
                                href={`/portfolio-blogs?category=${category.slug}`}
                                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium transition-all duration-300 hover:scale-105"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to {category.name}
                            </Link>

                            {/* Share Section */}
                            <div className="text-center">
                                <h3 className="text-white font-semibold mb-2">Enjoyed this article?</h3>
                                <p className="text-gray-400 text-sm">Share it with others or explore more content</p>
                            </div>

                            {/* Blog Home */}
                            <Link
                                href="/portfolio-blogs"
                                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:scale-105 transition-all duration-300"
                            >
                                All Blogs
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}