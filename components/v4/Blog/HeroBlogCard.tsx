import Image from 'next/image';
import { BlogDate } from "@/components/v4/Blog/BlogDate";
import { getCategoryTheme } from '@/components/v4/Blog/utils';


import type { IBlog } from '@/components/v4/Blog/types';


export const HeroBlogCard = ({ blog }: { blog: IBlog }) => {
    const theme = getCategoryTheme(blog.mainCategory);

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-700">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={blog.featuredImage || '/cover-photo.png'}
                    alt={blog.title}
                    fill
                    priority
                    className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700`}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 lg:p-12 h-full flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
                {/* Featured Badge - Responsive positioning to prevent mobile collision */}
                <div className="absolute top-4 right-4 md:top-8 md:left-8 md:right-auto">
                    <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-lg md:text-xl">{theme.icon}</span>
                        <span className="text-white font-medium text-xs md:text-sm">
                            Featured Story
                        </span>
                    </div>
                </div>

                {/* Category */}
                <div className="mb-4 mt-16 md:mt-4">
                    <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-${theme.bg} text-${theme.secondary} border border-${theme.border} backdrop-blur-sm`}
                    >
                        {blog.mainCategory}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors duration-500">
                    {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                    {'excerpt' in blog && typeof blog.excerpt === 'string'
                        ? blog.excerpt.split('\n')[0]
                        : 'No excerpt available'}
                </p>

                {/* Meta and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <BlogDate date={blog.postDate} />
                    <button
                        className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${theme.gradient} text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer w-fit sm:w-auto`}
                    >
                        Read Story
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};