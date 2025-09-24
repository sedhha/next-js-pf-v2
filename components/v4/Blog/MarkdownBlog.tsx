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
        <div className="markdown-container max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
            <div className="relative backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                {/* Cosmic background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black/60 to-violet-900/20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/15 via-transparent to-rose-900/15 pointer-events-none"></div>

                {/* Content area */}
                <div className="relative p-8 sm:p-12 lg:p-16">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSanitize]}
                        components={{
                            // Headings with glowy effects
                            h1: ({ children, ...props }: ComponentProps) => (
                                <h1
                                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 leading-tight"
                                    {...props}
                                >
                                    <span className="relative inline-block">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 blur-xl -z-10"></div>
                                    </span>
                                </h1>
                            ),
                            h2: ({ children, ...props }: ComponentProps) => (
                                <h2
                                    className="text-3xl sm:text-4xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 leading-tight"
                                    {...props}
                                >
                                    <span className="relative inline-block">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/15 to-emerald-300/15 blur-lg -z-10"></div>
                                    </span>
                                </h2>
                            ),
                            h3: ({ children, ...props }: ComponentProps) => (
                                <h3
                                    className="text-2xl sm:text-3xl font-semibold mt-10 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300"
                                    {...props}
                                >
                                    <span className="relative inline-block">
                                        {children}
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-300/10 to-purple-300/10 blur-md -z-10"></div>
                                    </span>
                                </h3>
                            ),
                            h4: ({ children, ...props }: ComponentProps) => (
                                <h4 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-emerald-200" {...props}>
                                    {children}
                                </h4>
                            ),
                            h5: ({ children, ...props }: ComponentProps) => (
                                <h5 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-cyan-200" {...props}>
                                    {children}
                                </h5>
                            ),
                            h6: ({ children, ...props }: ComponentProps) => (
                                <h6 className="text-base sm:text-lg font-semibold mt-4 mb-2 text-violet-200" {...props}>
                                    {children}
                                </h6>
                            ),

                            // Paragraphs with cosmic styling and better typography
                            p: ({ children, ...props }: ComponentProps) => (
                                <div className="text-gray-200 leading-relaxed mb-6 text-base sm:text-lg font-light tracking-wide" {...props}>
                                    {children}
                                </div>
                            ),

                            // Links with hover effects
                            a: ({ children, href, ...props }: ComponentProps) => (
                                <a
                                    href={href}
                                    className="relative inline-block text-cyan-400 hover:text-emerald-300 transition-all duration-300 group"
                                    {...props}
                                >
                                    <span className="relative z-10 border-b border-cyan-400/50 hover:border-emerald-300/50 transition-colors duration-300">
                                        {children}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md blur-sm"></div>
                                </a>
                            ),

                            // Lists with cosmic bullets
                            ul: ({ children, ...props }: ComponentProps) => (
                                <ul className="space-y-2 mb-6 pl-6" {...props}>
                                    {children}
                                </ul>
                            ),
                            ol: ({ children, ...props }: ComponentProps) => (
                                <ol className="space-y-2 mb-6 pl-6 list-decimal" {...props}>
                                    {children}
                                </ol>
                            ),
                            li: ({ children, ...props }: ComponentProps) => (
                                <li className="text-gray-200 text-base sm:text-lg relative" {...props}>
                                    <span className="absolute -left-6 top-1.5 w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-400/50"></span>
                                    {children}
                                </li>
                            ),

                            // Code blocks with clean dark theme syntax highlighting
                            pre: ({ children, ...props }: ComponentProps) => (
                                <div className="relative group mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <pre
                                        className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 overflow-x-auto text-sm sm:text-base font-mono shadow-2xl"
                                        {...props}
                                    >
                                        <div className="absolute top-4 right-4 flex space-x-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                                            <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                                        </div>
                                        {children}
                                    </pre>
                                </div>
                            ),
                            code: ({ children, className, ...props }: ComponentProps) => {
                                const isInline = !className?.includes('language-');

                                if (isInline) {
                                    return (
                                        <code
                                            className="bg-gray-800/60 text-emerald-300 px-2 py-1 rounded-md text-sm font-mono border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }

                                // For code blocks, let rehype-highlight handle the styling
                                return (
                                    <code className={`${className || ''} font-mono`} {...props}>
                                        {children}
                                    </code>
                                );
                            },

                            // Blockquotes with cosmic border
                            blockquote: ({ children, ...props }: ComponentProps) => (
                                <blockquote
                                    className="relative border-l-4 border-gradient-to-b from-emerald-400 via-cyan-400 to-violet-400 bg-black/20 backdrop-blur-sm pl-6 py-4 my-8 italic text-gray-200 rounded-r-xl"
                                    {...props}
                                >
                                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-violet-400 rounded-full shadow-lg"></div>
                                    <div className="absolute left-2 top-4 text-4xl text-emerald-400/50">&ldquo;</div>
                                    <div className="pl-4">
                                        {children}
                                    </div>
                                </blockquote>
                            ),

                            // Tables with cosmic styling
                            table: ({ children, ...props }: ComponentProps) => (
                                <div className="overflow-x-auto mb-8 rounded-xl border border-gray-700/50 bg-black/20 backdrop-blur-sm">
                                    <table className="min-w-full" {...props}>
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children, ...props }: ComponentProps) => (
                                <thead className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50" {...props}>
                                    {children}
                                </thead>
                            ),
                            th: ({ children, ...props }: ComponentProps) => (
                                <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 border-b border-gray-600/50" {...props}>
                                    {children}
                                </th>
                            ),
                            td: ({ children, ...props }: ComponentProps) => (
                                <td className="px-6 py-4 text-sm text-gray-200 border-b border-gray-700/30" {...props}>
                                    {children}
                                </td>
                            ),

                            // Horizontal rule with cosmic gradient
                            hr: ({ ...props }: ComponentProps) => (
                                <div className="relative my-12" {...props}>
                                    <hr className="border-none h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-sm"></div>
                                </div>
                            ),

                            // Images with cosmic frame
                            img: ({ src, alt, ...props }: ComponentProps) => (
                                <div className="relative group my-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <Image
                                        src={src || ''}
                                        alt={alt || ''}
                                        width={800}
                                        height={600}
                                        className="relative w-full rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm"
                                        style={{ width: '100%', height: 'auto' }}
                                        {...props}
                                    />
                                </div>
                            ),

                            // Strong/bold text with glow
                            strong: ({ children, ...props }: ComponentProps) => (
                                <span className="font-bold text-emerald-200 relative" {...props}>
                                    <span className="relative z-10">{children}</span>
                                    <span className="absolute inset-0 bg-emerald-400/10 blur-sm rounded"></span>
                                </span>
                            ),

                            // Emphasis/italic with subtle glow
                            em: ({ children, ...props }: ComponentProps) => (
                                <span className="italic text-cyan-200 relative" {...props}>
                                    <span className="relative z-10">{children}</span>
                                    <span className="absolute inset-0 bg-cyan-400/5 blur-sm rounded"></span>
                                </span>
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Cosmic particle effect overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownBlog;