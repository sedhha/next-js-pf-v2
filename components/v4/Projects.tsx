import React from "react";
import Image from "next/image";
import { IProject } from "@/interfaces/projects";
import fallbackProjects from "@/constants/cms-constants/projects.json";

// Server Component - fetches data directly
async function getProjects(): Promise<{ projects: IProject[]; total: number }> {
    return {
        projects: fallbackProjects,
        total: fallbackProjects.length,
    };
}

const Projects = async () => {
    const { projects, total } = await getProjects();

    return (
        <section
            className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Animated Background Elements - More vibrant */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Moving Grid with cyan tint */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />

                {/* Enhanced Floating Elements */}
                <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce delay-0 shadow-lg shadow-emerald-400/30" />
                <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce delay-500 shadow-lg shadow-cyan-400/30" />
                <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-violet-400/50 rounded-full animate-bounce delay-1000 shadow-lg shadow-violet-400/30" />

                {/* More vibrant gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
                <div className="absolute top-1/2 right-10 w-64 h-64 bg-[radial-gradient(var(--tw-gradient-stops))] from-violet-500/15 via-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-3000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4">
                {/* Enhanced Header with vibrant colors */}
                <div className="text-center mb-16 lg:mb-20 relative">
                    {/* More vibrant floating badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-emerald-400/40 rounded-full shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200 shadow-lg shadow-cyan-400/50" />
                        </div>
                        <span className="text-emerald-300 font-semibold tracking-wide">
                            SELECTED WORKS
                        </span>
                        <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-transparent" />
                    </div>

                    {/* Enhanced title with more vibrant gradients */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 px-4">
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-cyan-300 hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 transition-all duration-700 transform hover:scale-105 drop-shadow-lg">
                            Things
                        </span>
                        <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 hover:from-white hover:via-emerald-300 hover:to-cyan-300 transition-all duration-700 delay-100 transform hover:scale-105 drop-shadow-lg">
                            I&apos;ve Built
                        </span>
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-4 px-4">
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Crafting digital experiences that push boundaries and solve real
                            problems.
                        </p>
                        {total > 0 && (
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400/60 to-cyan-400/60" />
                                <span className="text-emerald-300 font-medium">Top {total} Most Recent Projects</span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent via-cyan-400/60 to-violet-400/60" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Projects grid with enhanced colors and better mobile alignment */}
                {projects.length === 0 ? (
                    <div className="text-center py-32 px-4">
                        <div className="relative mx-auto mb-8 w-32 h-32">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl rotate-12 animate-pulse shadow-lg shadow-emerald-500/20" />
                            <div className="relative bg-black/50 backdrop-blur-sm border border-emerald-400/20 rounded-3xl w-full h-full flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-emerald-400/60"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
                        <p className="text-gray-300 max-w-md mx-auto">
                            Amazing projects are in development. Check back soon for exciting
                            updates!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center mx-auto">
                        {projects.map((project, index) => {
                            return (
                                <article
                                    key={project.name}
                                    className="group relative bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-700 hover:scale-[1.02] h-full"
                                >
                                    {/* Background Image with consistent aspect ratio */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={project.img}
                                            alt={project.name}
                                            fill
                                            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-125"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            unoptimized
                                            priority={index === 0}
                                        />
                                        {/* Enhanced gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-700" />
                                    </div>

                                    {/* Enhanced floating action buttons */}
                                    {project.actionButtons && project.actionButtons.length > 0 && (
                                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                            {project.actionButtons.slice(0, 2).map((button, btnIndex) => (
                                                <a
                                                    key={btnIndex}
                                                    href={button.cta}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-emerald-400/40 rounded-xl flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-emerald-400/20"
                                                    title={button.label}
                                                >
                                                    {button.label.toLowerCase().includes('github') ? (
                                                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* Content area below image */}
                                    <div className="p-6 space-y-4">
                                        {/* Project title */}
                                        <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-lg text-xl line-clamp-2">
                                            {project.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                            {project.description.split("\n")[0]}
                                        </p>

                                        {/* Action buttons */}
                                        {project.actionButtons && project.actionButtons.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.actionButtons.map((button, btnIndex) => (
                                                    <a
                                                        key={btnIndex}
                                                        href={button.cta}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-400/40 hover:border-emerald-400 rounded-lg text-xs font-medium text-emerald-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-400/20"
                                                    >
                                                        <span>{button.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Enhanced border glow */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-violet-500/15 pointer-events-none" />
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Enhanced Bottom CTA */}
                <div className="mt-32 text-center">
                    <div className="relative inline-block">
                        {/* Enhanced background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-violet-500/30 rounded-3xl blur-xl scale-110 animate-pulse" />

                        {/* Enhanced content */}
                        <div className="relative bg-black/50 backdrop-blur-xl border border-emerald-400/30 rounded-3xl p-12 hover:border-emerald-400/50 hover:bg-black/60 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to create something amazing?
                            </h3>
                            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                                Let&apos;s collaborate and turn your vision into reality. Every
                                great project starts with a conversation.
                            </p>
                            <a
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-violet-400 text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40"
                            >
                                <span>Start a Project</span>
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;