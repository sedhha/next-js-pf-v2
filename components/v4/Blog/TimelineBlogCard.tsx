import Image from 'next/image';
import Link from 'next/link';

import { getCategoryTheme } from '@/components/v4/Blog/utils';
import { BlogDate } from "@/components/v4/Blog/BlogDate";

import { IBlog } from "@/components/v4/Blog/types";


export const TimelineBlogCard = ({
    blog,
    index
}: {
    blog: IBlog;
    index: number;
}) => {
    const theme = getCategoryTheme(blog.mainCategory);

    return (
        <div className="group relative">
            {/* Timeline connector */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"></div>

            {/* Timeline dot */}
            <div
                className={`absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient} border-2 border-black z-10 group-hover:scale-125 transition-transform duration-300`}
            ></div>

            {/* Card */}
            <div className="ml-16 mb-8">
                <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:bg-black/50 hover:border-gray-700/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={blog.featuredImage || '/writing.png'}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="64px"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg">{theme.icon}</span>
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full bg-${theme.bg} text-${theme.secondary}`}
                                >
                                    {blog.mainCategory}
                                </span>
                                <span className="text-xs text-gray-500">#{index + 2}</span>
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300">
                                {blog.title}
                            </h3>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {'excerpt' in blog && typeof blog.excerpt === 'string'
                            ? blog.excerpt.split('\n')[0]
                            : 'No excerpt available'}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <BlogDate date={blog.postDate} />
                        <Link
                            href={`/portfolio-blog/${blog.categoryID}/${blog.id}`}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm font-medium cursor-pointer"
                        >
                            Read more →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};