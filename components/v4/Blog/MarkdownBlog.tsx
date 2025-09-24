import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import { ReactNode } from 'react';
import './markdown-blog.css';

interface MarkdownBlogProps {
    content: string;
}

interface ComponentProps {
    children?: ReactNode;
    className?: string;
    href?: string;
    [key: string]: any;
}

const MarkdownBlog = ({ content }: MarkdownBlogProps) => {
    return (
        <div className="markdown-container max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 xl:p-12 relative">
            {/* Enhanced cosmic background with animated gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-emerald-500/5 via-transparent to-transparent animate-pulse-slow"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-violet-500/5 via-transparent to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/3 via-transparent to-rose-500/3 animate-float"></div>
            </div>

            <article className="relative backdrop-blur-lg bg-black/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 transition-all duration-700 hover:shadow-emerald-500/20 hover:border-white/20">
                {/* Enhanced layered cosmic backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 via-black/70 to-violet-900/15 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-transparent to-rose-900/10 pointer-events-none animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/5 via-transparent to-violet-900/5 pointer-events-none"></div>

                {/* Floating orbs animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-emerald-400/40 rounded-full blur-sm animate-float-1"></div>
                    <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-float-2"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-violet-400/20 rounded-full blur-sm animate-float-3"></div>
                    <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-rose-400/25 rounded-full blur-sm animate-float-4"></div>
                    <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-amber-400/35 rounded-full blur-sm animate-float-5"></div>
                </div>

                {/* Main content area with improved spacing */}
                <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
                        components={{
                            // Enhanced headings with better mobile scaling and glow effects
                            h1: ({ children, ...props }: ComponentProps) => (
                                <h1
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 lg:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 leading-tight tracking-tight"
                                    {...props}
                                >
                                    <span className="relative inline-block hover:scale-105 transition-transform duration-500">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 blur-2xl -z-10 animate-pulse-glow"></div>
                                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/5 via-cyan-400/5 to-violet-400/5 blur-3xl -z-20 animate-pulse-glow-outer"></div>
                                    </span>
                                </h1>
                            ),
                            h2: ({ children, ...props }: ComponentProps) => (
                                <h2
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6 lg:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300 leading-tight"
                                    {...props}
                                >
                                    <span className="relative inline-block hover:scale-105 transition-transform duration-300">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-emerald-300/20 to-violet-300/20 blur-xl -z-10"></div>
                                    </span>
                                </h2>
                            ),
                            h3: ({ children, ...props }: ComponentProps) => (
                                <h3
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 sm:mt-8 lg:mt-12 mb-3 sm:mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300"
                                    {...props}
                                >
                                    <span className="relative inline-block hover:scale-105 transition-transform duration-300">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-300/15 via-purple-300/15 to-pink-300/15 blur-lg -z-10"></div>
                                    </span>
                                </h3>
                            ),
                            h4: ({ children, ...props }: ComponentProps) => (
                                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4 text-emerald-200 hover:text-emerald-100 transition-colors duration-300" {...props}>
                                    {children}
                                </h4>
                            ),
                            h5: ({ children, ...props }: ComponentProps) => (
                                <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-cyan-200 hover:text-cyan-100 transition-colors duration-300" {...props}>
                                    {children}
                                </h5>
                            ),
                            h6: ({ children, ...props }: ComponentProps) => (
                                <h6 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-4 mb-2 text-violet-200 hover:text-violet-100 transition-colors duration-300" {...props}>
                                    {children}
                                </h6>
                            ),

                            // Enhanced paragraphs with better mobile typography
                            p: ({ children, ...props }: ComponentProps) => (
                                <div className="text-gray-200 leading-relaxed sm:leading-loose mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg xl:text-xl font-light tracking-wide hover:text-gray-100 transition-colors duration-300" {...props}>
                                    {children}
                                </div>
                            ),

                            // Enhanced links with magnetic hover effect
                            a: ({ children, href, ...props }: ComponentProps) => (
                                <a
                                    href={href}
                                    className="relative inline-block text-cyan-400 hover:text-emerald-300 transition-all duration-500 group transform hover:scale-105"
                                    {...props}
                                >
                                    <span className="relative z-10 border-b border-cyan-400/50 hover:border-emerald-300/80 transition-all duration-500">
                                        {children}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-emerald-400/15 to-violet-400/10 scale-x-0 group-hover:scale-x-110 transition-all duration-500 origin-left rounded-lg blur-sm"></div>
                                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/5 via-emerald-400/10 to-violet-400/5 scale-0 group-hover:scale-100 transition-all duration-500 rounded-xl blur-md"></div>
                                </a>
                            ),

                            // Enhanced lists with animated bullets
                            ul: ({ children, ...props }: ComponentProps) => (
                                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8 pl-4 sm:pl-6 lg:pl-8" {...props}>
                                    {children}
                                </ul>
                            ),
                            ol: ({ children, ...props }: ComponentProps) => (
                                <ol className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8 pl-4 sm:pl-6 lg:pl-8 list-decimal" {...props}>
                                    {children}
                                </ol>
                            ),
                            li: ({ children, ...props }: ComponentProps) => (
                                <li className="text-gray-200 text-sm sm:text-base lg:text-lg xl:text-xl relative hover:text-gray-100 transition-colors duration-300 group" {...props}>
                                    <span className="absolute -left-4 sm:-left-6 lg:-left-8 top-1.5 sm:top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-400/50 group-hover:shadow-emerald-400/80 group-hover:scale-125 transition-all duration-300"></span>
                                    <span className="absolute -left-4 sm:-left-6 lg:-left-8 top-1.5 sm:top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full blur-sm animate-pulse"></span>
                                    {children}
                                </li>
                            ),

                            // Enhanced code blocks with improved mobile handling
                            pre: ({ children, ...props }: ComponentProps) => (
                                <div className="relative group mb-6 sm:mb-8 lg:mb-12">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-xl sm:rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
                                    <pre
                                        className="relative bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 overflow-x-auto text-xs sm:text-sm lg:text-base font-mono shadow-2xl transition-all duration-500 group-hover:shadow-emerald-500/20"
                                        {...props}
                                    >
                                        {/* Enhanced window controls */}
                                        <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 flex space-x-1.5 sm:space-x-2">
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50 group-hover:shadow-red-400/80 transition-all duration-300 hover:scale-110"></div>
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 group-hover:shadow-yellow-400/80 transition-all duration-300 hover:scale-110" style={{ transitionDelay: '50ms' }}></div>
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50 group-hover:shadow-green-400/80 transition-all duration-300 hover:scale-110" style={{ transitionDelay: '100ms' }}></div>
                                        </div>
                                        <div className="pt-6 sm:pt-8">
                                            {children}
                                        </div>
                                    </pre>
                                </div>
                            ),
                            code: ({ children, className, ...props }: ComponentProps) => {
                                const isInline = !className?.includes('language-');

                                if (isInline) {
                                    return (
                                        <code
                                            className="bg-gray-800/70 text-emerald-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm lg:text-base font-mono border border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:bg-gray-800/90 hover:border-emerald-500/50 hover:shadow-emerald-500/20 transition-all duration-300"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }

                                return (
                                    <code className={`${className || ''} font-mono`} {...props}>
                                        {children}
                                    </code>
                                );
                            },

                            // Enhanced blockquotes with floating effect
                            blockquote: ({ children, ...props }: ComponentProps) => (
                                <blockquote
                                    className="relative border-l-4 border-gradient-to-b from-emerald-400 via-cyan-400 to-violet-400 bg-black/30 backdrop-blur-md pl-4 sm:pl-6 lg:pl-8 py-4 sm:py-6 lg:py-8 my-6 sm:my-8 lg:my-12 italic text-gray-200 rounded-r-xl sm:rounded-r-2xl shadow-xl hover:shadow-2xl hover:bg-black/40 transition-all duration-500 group"
                                    {...props}
                                >
                                    <div className="absolute left-0 top-0 w-1 sm:w-1.5 h-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-violet-400 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-500"></div>
                                    <div className="absolute left-2 sm:left-3 top-2 sm:top-4 lg:top-6 text-2xl sm:text-3xl lg:text-4xl text-emerald-400/60 group-hover:text-emerald-400/80 transition-colors duration-500">&ldquo;</div>
                                    <div className="pl-4 sm:pl-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                                        {children}
                                    </div>
                                </blockquote>
                            ),

                            // Enhanced tables with better mobile responsiveness
                            table: ({ children, ...props }: ComponentProps) => (
                                <div className="overflow-x-auto mb-6 sm:mb-8 lg:mb-12 rounded-xl sm:rounded-2xl border border-gray-700/50 bg-black/30 backdrop-blur-md shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                                    <table className="min-w-full text-xs sm:text-sm lg:text-base" {...props}>
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children, ...props }: ComponentProps) => (
                                <thead className="bg-gradient-to-r from-emerald-900/60 to-cyan-900/60 backdrop-blur-sm" {...props}>
                                    {children}
                                </thead>
                            ),
                            th: ({ children, ...props }: ComponentProps) => (
                                <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs sm:text-sm lg:text-base font-semibold text-emerald-200 border-b border-gray-600/50 hover:text-emerald-100 transition-colors duration-300" {...props}>
                                    {children}
                                </th>
                            ),
                            td: ({ children, ...props }: ComponentProps) => (
                                <td className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base text-gray-200 border-b border-gray-700/30 hover:text-gray-100 hover:bg-gray-800/20 transition-all duration-300" {...props}>
                                    {children}
                                </td>
                            ),

                            // Enhanced horizontal rule with particle effect
                            hr: ({ ...props }: ComponentProps) => (
                                <div className="relative my-8 sm:my-12 lg:my-16 group" {...props}>
                                    <hr className="border-none h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-sm group-hover:blur-md transition-all duration-500"></div>
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
                                </div>
                            ),

                            // Enhanced images with improved mobile handling
                            img: ({ src, alt, ...props }: ComponentProps) => (
                                <div className="relative group my-6 sm:my-8 lg:my-12">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-violet-400/10 rounded-xl sm:rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
                                    <Image
                                        src={src || '/waiting.png'}
                                        alt={alt || 'unknown image'}
                                        width={1200}
                                        height={800}
                                        className="relative w-full rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm hover:border-white/20 hover:scale-[1.02] transition-all duration-700"
                                        style={{ width: '100%', height: 'auto' }}
                                        {...props}
                                    />
                                </div>
                            ),

                            // Enhanced text styling with micro-interactions
                            strong: ({ children, ...props }: ComponentProps) => (
                                <span className="font-bold text-emerald-200 relative hover:text-emerald-100 transition-colors duration-300 group" {...props}>
                                    <span className="relative z-10">{children}</span>
                                    <span className="absolute inset-0 bg-emerald-400/10 blur-sm rounded group-hover:bg-emerald-400/20 transition-all duration-300"></span>
                                </span>
                            ),

                            em: ({ children, ...props }: ComponentProps) => (
                                <span className="italic text-cyan-200 relative hover:text-cyan-100 transition-colors duration-300 group" {...props}>
                                    <span className="relative z-10">{children}</span>
                                    <span className="absolute inset-0 bg-cyan-400/5 blur-sm rounded group-hover:bg-cyan-400/15 transition-all duration-300"></span>
                                </span>
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Enhanced floating particle system */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                    <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-emerald-300 rounded-full animate-twinkle"></div>
                    <div className="absolute top-[25%] right-[20%] w-0.5 h-0.5 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-[45%] left-[80%] w-1.5 h-1.5 bg-violet-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-[30%] left-[25%] w-0.5 h-0.5 bg-rose-300 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-[15%] right-[30%] w-1 h-1 bg-amber-300 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-[60%] left-[10%] w-0.5 h-0.5 bg-purple-300 rounded-full animate-twinkle" style={{ animationDelay: '2.5s' }}></div>
                </div>

                {/* Subtle scan line effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan-line"></div>
                </div>
            </article>
        </div>
    );
};

export default MarkdownBlog;