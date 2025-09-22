'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import topVideos from '@/constants/cms-constants/featured-videos.json';

const { highlighted, top4 } = topVideos;

// Consistent date formatting to prevent hydration mismatch
const formatDate = (dateString: string) => {
    // Parse the date string directly to avoid timezone issues
    // Format: "2022-07-26T00:00:00.000+05:30"
    const datePart = dateString.split('T')[0]; // Get "2022-07-26"
    const [year, month, day] = datePart.split('-').map(Number);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return {
        short: `${months[month - 1]} ${day}, ${year}`,
        long: `${longMonths[month - 1]} ${day}, ${year}`
    };
};

// YouTube Embed Component
interface YouTubeEmbedProps {
    videoId: string;
    title: string;
    className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative aspect-video rounded-2xl overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400 text-sm">Loading video...</p>
                    </div>
                </div>
            )}
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsLoaded(true)}
                className="absolute inset-0"
            />
        </div>
    );
};

// Video Card Component for the grid
interface VideoCardProps {
    video: typeof top4[0];
    // eslint-disable-next-line no-unused-vars
    onPlayVideo: (videoId: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlayVideo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className="group relative bg-black/40 backdrop-blur-sm border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 hover:scale-[1.02]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Theme-consistent glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/0 via-emerald-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

            {/* Video thumbnail area */}
            <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative overflow-hidden rounded-t-2xl">
                    {/* YouTube thumbnail */}
                    <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 25vw"
                        unoptimized
                    />

                    {/* Theme-consistent overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:from-emerald-900/40 transition-all duration-700" />

                    {/* Theme-consistent play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
                            <button
                                onClick={() => onPlayVideo(video.id, video.title)}
                                className="relative w-16 h-16 bg-emerald-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors cursor-pointer border border-emerald-400/50 z-20"
                            >
                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Theme-consistent floating particles */}
                    {isHovered && (
                        <div className="absolute inset-0">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-emerald-400/60 rounded-full animate-pulse"
                                    style={{
                                        top: `${20 + i * 10}%`,
                                        left: `${10 + i * 15}%`,
                                        animationDelay: `${i * 0.3}s`,
                                        animationDuration: `${2 + i * 0.5}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content area */}
            <div className="relative z-10 p-6 space-y-4">
                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2 text-lg leading-tight">
                    {video.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {video.excerpt}
                </p>

                {/* Date with mysterious styling */}
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse" />
                    <span className="text-gray-500 group-hover:text-emerald-400/80 transition-colors">
                        {formatDate(video.date).short}
                    </span>
                </div>

                {/* Watch on YouTube button */}
                <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-30 inline-flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 border border-red-500/40 hover:border-red-400 rounded-lg text-sm font-medium text-white hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30 cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch on YouTube
                </a>
            </div>

            {/* Subtle border animation */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse" />
            </div>
        </article>
    );
};

// Video Modal Component
interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
    title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 cursor-pointer"
                aria-label="Close video"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Video container */}
            <div className="w-full max-w-6xl mx-auto">
                <div className="relative bg-black/60 backdrop-blur-xl border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl">
                    <YouTubeEmbed
                        videoId={videoId}
                        title={title}
                        className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh]"
                    />
                </div>
            </div>

            {/* Click outside to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
                aria-label="Close video modal"
            />
        </div>
    );
};

const Videos = () => {
    const [playingVideo, setPlayingVideo] = useState<{ id: string; title: string } | null>(null);

    const openVideoModal = (videoId: string, title: string) => {
        setPlayingVideo({ id: videoId, title });
    };

    const closeVideoModal = () => {
        setPlayingVideo(null);
    };

    // Predefined eerie particle positions
    const eerieParticles = [
        { top: '10%', left: '15%', delay: '0s', duration: '4s', size: 'w-1 h-1' },
        { top: '20%', left: '85%', delay: '1s', duration: '3s', size: 'w-0.5 h-0.5' },
        { top: '35%', left: '25%', delay: '2s', duration: '5s', size: 'w-1.5 h-1.5' },
        { top: '50%', left: '75%', delay: '0.5s', duration: '3.5s', size: 'w-1 h-1' },
        { top: '65%', left: '40%', delay: '3s', duration: '4.5s', size: 'w-0.5 h-0.5' },
        { top: '80%', left: '60%', delay: '1.5s', duration: '2.5s', size: 'w-1 h-1' },
        { top: '25%', left: '90%', delay: '4s', duration: '3s', size: 'w-0.5 h-0.5' },
        { top: '45%', left: '10%', delay: '2.5s', duration: '4s', size: 'w-1.5 h-1.5' },
        { top: '70%', left: '30%', delay: '0.2s', duration: '5.5s', size: 'w-1 h-1' },
        { top: '90%', left: '80%', delay: '3.5s', duration: '2s', size: 'w-0.5 h-0.5' }
    ];

    return (
        <>
            {/* Video Modal */}
            <VideoModal
                isOpen={!!playingVideo}
                onClose={closeVideoModal}
                videoId={playingVideo?.id || ''}
                title={playingVideo?.title || ''}
            />

            <section
                className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                {/* Mysterious Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Blood-red moving grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />

                    {/* Eerie floating particles */}
                    <div className="absolute inset-0">
                        {eerieParticles.map((particle, i) => (
                            <div
                                key={i}
                                className={`absolute ${particle.size} bg-emerald-400/30 rounded-full animate-pulse`}
                                style={{
                                    top: particle.top,
                                    left: particle.left,
                                    animationDelay: particle.delay,
                                    animationDuration: particle.duration
                                }}
                            />
                        ))}
                    </div>

                    {/* Mysterious gradient orbs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,rgba(220,38,38,0.05)_50%,transparent_100%)] rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(139,69,19,0.1)_0%,rgba(139,69,19,0.03)_50%,transparent_100%)] rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[radial-gradient(circle,rgba(75,0,130,0.08)_0%,rgba(75,0,130,0.02)_50%,transparent_100%)] rounded-full blur-3xl animate-pulse [animation-delay:4s]" />

                    {/* Subtle scanning lines */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse [animation-duration:8s]" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-pulse [animation-duration:12s] [animation-delay:4s]" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 px-4">
                    {/* Mysterious Header */}
                    <div className="text-center mb-16 lg:mb-20 relative">
                        {/* Theme-consistent badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 backdrop-blur-xl border border-emerald-400/40 rounded-full shadow-lg shadow-emerald-500/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                                <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse [animation-delay:300ms] shadow-lg shadow-violet-400/50" />
                            </div>
                            <span className="text-emerald-300 font-semibold tracking-wide">
                                VIDEO TRANSMISSIONS
                            </span>
                            <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-400 via-violet-400 to-transparent" />
                        </div>

                        {/* Theme-consistent title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 px-4">
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-cyan-300 hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 transition-all duration-700 transform hover:scale-105 drop-shadow-lg">
                                Digital
                            </span>
                            <br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 hover:from-white hover:via-emerald-300 hover:to-cyan-300 transition-all duration-700 delay-100 transform hover:scale-105 drop-shadow-lg">
                                Chronicles
                            </span>
                        </h1>

                        <div className="max-w-3xl mx-auto space-y-4 px-4">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Exploring the depths of technology, consciousness, and the mysteries that bind them.
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400/60 to-violet-400/60" />
                                <span className="text-emerald-300 font-medium">Knowledge Transmissions</span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent via-cyan-400/60 to-violet-400/60" />
                            </div>
                        </div>
                    </div>

                    {/* Featured Video Section */}
                    <div className="mb-20 relative">
                        <div className="group relative max-w-5xl mx-auto">
                            {/* Mysterious glow around featured video */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/30 via-violet-500/20 to-emerald-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />

                            <div className="relative bg-black/60 backdrop-blur-xl border border-red-800/40 rounded-3xl p-8 hover:border-red-600/60 transition-all duration-700 shadow-2xl">
                                {/* Featured label */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                                    <span className="text-emerald-300 font-semibold text-sm tracking-wider">FEATURED TRANSMISSION</span>
                                </div>

                                {/* Video embed */}
                                <YouTubeEmbed
                                    videoId={highlighted.id}
                                    title={highlighted.title}
                                    className="mb-6 border border-emerald-900/30 shadow-2xl shadow-emerald-900/20"
                                />

                                {/* Video details */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-200 transition-colors duration-300">
                                        {highlighted.title}
                                    </h2>

                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {highlighted.excerpt}
                                    </p>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse" />
                                            <span>{formatDate(highlighted.date).long}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>By</span>
                                            <span className="text-red-300 font-medium">{highlighted.author}</span>
                                        </div>
                                    </div>

                                    {/* Watch on YouTube button */}
                                    <div className="pt-4">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${highlighted.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30 cursor-pointer"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            Watch on YouTube
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* More Videos Grid */}
                    <div className="space-y-12">
                        {/* Section header */}
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300">
                                    More Chronicles
                                </span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Dive deeper into the digital realm with these carefully curated explorations
                            </p>
                        </div>

                        {/* Videos grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                            {top4.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    onPlayVideo={openVideoModal}
                                />
                            ))}
                        </div>

                        {/* View all videos CTA */}
                        <div className="text-center mt-16">
                            <div className="relative inline-block">
                                {/* Mysterious background glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 via-violet-500/20 to-emerald-600/30 rounded-3xl blur-xl scale-110 animate-pulse" />

                                <div className="relative bg-black/60 backdrop-blur-xl border border-red-700/40 rounded-3xl p-10 hover:border-red-500/60 hover:bg-black/70 transition-all duration-500 shadow-2xl">
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        Explore All Transmissions
                                    </h3>
                                    <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                                        Journey through the complete archive of digital chronicles and unlock hidden knowledge
                                    </p>
                                    <Link
                                        href="/videos"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30"
                                    >
                                        <span>View All Videos</span>
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
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Videos;
