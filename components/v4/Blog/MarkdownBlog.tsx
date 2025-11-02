import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import { lazy, ReactNode } from 'react';
import { MermaidDiagram } from '@/components/v4/Blog/MermaidClient';
import './markdown-blog.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownBlogProps {
    content: string;
}

interface ComponentProps {
    children?: ReactNode;
    className?: string;
    href?: string;
    [key: string]: any;
}

const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), ['className']],
        pre: [...(defaultSchema.attributes?.pre || []), ['className']],
        span: [...(defaultSchema.attributes?.span || []), ['className']]
    }
};

const BaseP: React.FC<ComponentProps> = ({ children, ...props }) => (
    <p
        className="text-zinc-100/95 leading-8 sm:leading-9 mb-4 sm:mb-6 lg:mb-8 text-[15px] sm:text-base lg:text-lg transition-all duration-300 hover:text-white"
        {...props}
    >
        {children}
    </p>
);

const CopyableCodeBlock = lazy(() =>
    import('@/components/v4/Blog/CopyCodeBlock').then((mod) => ({
        default: mod.CopyableCodeBlock
    }))
);

const MarkdownBlog = ({ content }: MarkdownBlogProps) => {
    return (
        <div className="markdown-container text-zinc-100 bg-black min-h-screen">
            <div className="relative mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 xl:p-12">
                {/* Enhanced animated background accents */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse [animation-delay:1s]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl animate-pulse [animation-delay:2s]" />
                </div>

                <article className="relative rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-emerald-500/20 hover:shadow-3xl group">
                    {/* Animated gradient border on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-violet-500/0 group-hover:from-emerald-500/20 group-hover:via-cyan-500/20 group-hover:to-violet-500/20 transition-all duration-700 -z-10 blur-xl" />

                    <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
                        <ReactMarkdown
                            rehypePlugins={[
                                rehypeRaw,
                                [rehypeHighlight, { detect: true, ignoreMissing: true }],
                                [rehypeSanitize, sanitizeSchema]
                            ]}
                            components={{
                                // Enhanced headings with animated underlines
                                h1: ({ children, ...props }: ComponentProps) => (
                                    <h1
                                        className="group/h1 mb-6 sm:mb-8 lg:mb-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight transition-all duration-300 hover:tracking-wide"
                                        {...props}
                                    >
                                        <span className="align-middle bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent transition-all duration-500 group-hover/h1:from-emerald-300 group-hover/h1:via-cyan-300 group-hover/h1:to-violet-300">
                                            {children}
                                        </span>
                                        <span className="ml-2 inline-block h-1 w-14 align-middle bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full transition-all duration-500 group-hover/h1:w-24 group-hover/h1:h-1.5" />
                                    </h1>
                                ),
                                h2: ({ children, ...props }: ComponentProps) => (
                                    <h2
                                        className="group/h2 mt-10 sm:mt-12 lg:mt-16 mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-200 drop-shadow transition-all duration-300 hover:text-emerald-100 hover:translate-x-2 hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                                        {...props}
                                    >
                                        <span className="relative">
                                            {children}
                                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 group-hover/h2:w-full" />
                                        </span>
                                    </h2>
                                ),
                                h3: ({ children, ...props }: ComponentProps) => (
                                    <h3
                                        className="group/h3 mt-8 sm:mt-10 lg:mt-12 mb-3 sm:mb-4 lg:mb-6 text-lg sm:text-xl md:text-2xl font-semibold text-cyan-200 transition-all duration-300 hover:text-cyan-100 hover:translate-x-1.5"
                                        {...props}
                                    >
                                        <span className="relative">
                                            <span className="absolute -left-4 opacity-0 transition-all duration-300 group-hover/h3:opacity-100 group-hover/h3:-left-6">›</span>
                                            {children}
                                        </span>
                                    </h3>
                                ),
                                h4: ({ children, ...props }: ComponentProps) => (
                                    <h4
                                        className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-semibold text-violet-200 transition-all duration-300 hover:text-violet-100 hover:scale-[1.02] origin-left"
                                        {...props}
                                    >
                                        {children}
                                    </h4>
                                ),
                                h5: ({ children, ...props }: ComponentProps) => (
                                    <h5
                                        className="mt-4 sm:mt-6 mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-semibold text-rose-200 transition-all duration-300 hover:text-rose-100"
                                        {...props}
                                    >
                                        {children}
                                    </h5>
                                ),
                                h6: ({ children, ...props }: ComponentProps) => (
                                    <h6
                                        className="mt-3 mb-2 text-sm sm:text-base md:text-lg font-semibold text-amber-200 transition-all duration-300 hover:text-amber-100"
                                        {...props}
                                    >
                                        {children}
                                    </h6>
                                ),

                                // Paragraphs
                                p: BaseP,

                                // Enhanced links with glow effect
                                a: ({ children, href, ...props }: ComponentProps) => (
                                    <a
                                        href={href}
                                        className="group/link relative text-sky-300 underline decoration-sky-400/70 underline-offset-4 transition-all duration-300 hover:text-emerald-200 hover:decoration-emerald-300 hover:underline-offset-8 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                                        {...props}
                                    >
                                        {children}
                                        <span className="absolute inset-0 -z-10 scale-0 rounded bg-emerald-500/10 blur-sm transition-transform duration-300 group-hover/link:scale-150" />
                                    </a>
                                ),

                                // Lists with hover animations
                                ul: ({ children, ...props }: ComponentProps) => (
                                    <ul
                                        className="mb-6 sm:mb-8 lg:mb-10 list-disc pl-6 marker:text-emerald-400 space-y-2 marker:transition-colors"
                                        {...props}
                                    >
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children, ...props }: ComponentProps) => (
                                    <ol
                                        className="mb-6 sm:mb-8 lg:mb-10 list-decimal pl-6 marker:text-emerald-400 space-y-2"
                                        {...props}
                                    >
                                        {children}
                                    </ol>
                                ),
                                li: ({ children, ...props }: ComponentProps) => (
                                    <li className="text-zinc-100/95 transition-all duration-300 hover:text-white hover:translate-x-1" {...props}>
                                        {children}
                                    </li>
                                ),

                                // Code blocks
                                pre: ({ children, className, ...props }: ComponentProps) => (
                                    <CopyableCodeBlock className={className} {...props}>
                                        {children}
                                    </CopyableCodeBlock>
                                ),

                                code: ({ children, className = '', ...props }: ComponentProps) => {
                                    const match = /language-(\w+)/.exec(className);
                                    const lang = match?.[1]?.toLowerCase() ?? '';

                                    if (lang === 'mermaid') {
                                        return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                                    }

                                    if (!match) {
                                        return (
                                            <code
                                                className="group/code rounded-md border border-emerald-500/30 bg-zinc-900/80 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300 transition-all duration-300 hover:border-emerald-400/60 hover:bg-zinc-800/90 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    }

                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },

                                // Enhanced blockquote with hover effect
                                blockquote: ({ children, ...props }: ComponentProps) => (
                                    <blockquote
                                        className="group/quote my-6 sm:my-8 lg:my-12 flex flex-col gap-3 border-l-4 border-emerald-400/70 bg-zinc-900/60 px-6 py-5 italic text-zinc-100 rounded-r-xl transition-all duration-500 hover:border-emerald-400 hover:bg-zinc-900/80 hover:translate-x-2 hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]"
                                        {...props}
                                    >
                                        <div className="-ml-1 text-4xl leading-none text-emerald-400/80 select-none transition-all duration-300 group-hover/quote:text-emerald-300 group-hover/quote:scale-110">
                                            &quot;
                                        </div>
                                        <div className="text-[15px] sm:text-base lg:text-lg not-italic transition-colors duration-300 group-hover/quote:text-white">
                                            {children}
                                        </div>
                                    </blockquote>
                                ),

                                // Enhanced tables
                                table: ({ children, ...props }: ComponentProps) => (
                                    <div className="mb-6 sm:mb-8 lg:mb-12 overflow-x-auto rounded-2xl border border-zinc-700/60 bg-zinc-900/60 shadow-xl transition-all duration-500 hover:border-zinc-600 hover:shadow-2xl hover:shadow-emerald-500/10">
                                        <table
                                            className="min-w-full text-sm text-left text-zinc-100"
                                            {...props}
                                        >
                                            {children}
                                        </table>
                                    </div>
                                ),
                                thead: ({ children, ...props }: ComponentProps) => (
                                    <thead className="bg-zinc-800/80 text-emerald-200 transition-colors duration-300 hover:bg-zinc-800" {...props}>
                                        {children}
                                    </thead>
                                ),
                                th: ({ children, ...props }: ComponentProps) => (
                                    <th className="px-4 py-3 font-semibold transition-colors duration-300 hover:text-emerald-100" {...props}>
                                        {children}
                                    </th>
                                ),
                                td: ({ children, ...props }: ComponentProps) => (
                                    <td className="px-4 py-3 text-zinc-100/95 transition-all duration-300 hover:bg-zinc-800/40 hover:text-white" {...props}>
                                        {children}
                                    </td>
                                ),

                                // Animated horizontal rule
                                hr: (props: ComponentProps) => (
                                    <div className="group/hr my-10">
                                        <div
                                            className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent transition-all duration-700 group-hover/hr:via-emerald-400 group-hover/hr:h-0.5 group-hover/hr:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                                            {...props}
                                        />
                                    </div>
                                ),

                                // Enhanced images with zoom effect
                                img: ({ src, alt, ...props }: ComponentProps) => (
                                    <span className="group/img my-6 sm:my-8 lg:my-12 overflow-hidden rounded-2xl block">
                                        <Image
                                            src={src || '/waiting.png'}
                                            alt={alt || 'image'}
                                            width={1200}
                                            height={800}
                                            className="w-full rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 group-hover/img:scale-105 group-hover/img:border-white/20 group-hover/img:shadow-emerald-500/20 group-hover/img:shadow-3xl"
                                            style={{ width: '100%', height: 'auto' }}
                                            {...props}
                                        />
                                    </span>
                                ),

                                // Enhanced emphasis
                                strong: ({ children, ...props }: ComponentProps) => (
                                    <strong className="font-bold text-emerald-200 transition-all duration-300 hover:text-emerald-100 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" {...props}>
                                        {children}
                                    </strong>
                                ),
                                em: ({ children, ...props }: ComponentProps) => (
                                    <em className="italic text-cyan-200 transition-colors duration-300 hover:text-cyan-100" {...props}>
                                        {children}
                                    </em>
                                )
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default MarkdownBlog;