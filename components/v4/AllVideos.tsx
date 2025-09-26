'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis/public';
import { ITotal } from '@/interfaces/api';

// Types
interface VideoContent {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    authorAvatar?: string;
}

interface VideoCardProps {
    video: VideoContent;
    // eslint-disable-next-line no-unused-vars
    onPlayVideo: (videoId: string, title: string) => void;
}

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
    title: string;
}

// Helpers
const formatDate = (dateString: string) => {
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month - 1]} ${day}, ${year}`;
};

// Video Card
const VideoCard: React.FC<VideoCardProps> = ({ video, onPlayVideo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className="group relative bg-black/40 backdrop-blur-sm border border-emerald-900/30 rounded-2xl overflow-hidden hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 hover:scale-[1.02]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/0 via-emerald-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

            <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative overflow-hidden rounded-t-2xl">
                    <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:from-emerald-900/40 transition-all duration-700" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
                            <button
                                onClick={() => onPlayVideo(video.id, video.title)}
                                className="relative w-16 h-16 bg-emerald-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors border border-emerald-400/50 z-20"
                                aria-label="Play video"
                            >
                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

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
                                        animationDuration: `${2 + i * 0.5}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 p-6 space-y-4">
                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2 text-lg leading-tight">
                    {video.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {video.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse" />
                    <span className="text-gray-500 group-hover:text-emerald-400/80 transition-colors">
                        {formatDate(video.date)}
                    </span>
                </div>

                {/* YouTube CTA */}
                <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-30 inline-flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 border border-red-500/40 hover:border-red-400 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch on YouTube
                </a>
            </div>
        </article>
    );
};

// Video Modal
const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Close video"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="w-full max-w-6xl mx-auto">
                <div className="relative bg-black/60 backdrop-blur-xl border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    />
                </div>
            </div>

            <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close modal" />
        </div>
    );
};

// Main Infinite Scroll Component
const InfiniteVideoGrid: React.FC = () => {
    const [videos, setVideos] = useState<VideoContent[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [skip, setSkip] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [playingVideo, setPlayingVideo] = useState<{ id: string; title: string } | null>(null);

    const topObserverTarget = useRef<HTMLDivElement>(null);
    const bottomObserverTarget = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);

    const LIMIT = 6;
    const MAX_VIDEOS = 52;

    const fetchVideos = useCallback(
        (currentSkip: number, direction: 'top' | 'bottom' = 'bottom') => {
            if (loadingRef.current || currentSkip < 0) return;

            loadingRef.current = true;
            setLoading(true);
            setError(null);

            return feFetch<ITotal<VideoContent>>({
                url: `${PUBLIC_APIS.VIDEOS}?limit=${LIMIT}&skip=${currentSkip}`,
            })
                .then((res) => {
                    if (!res.error && res.json) {

                        if (direction === 'bottom') {
                            setVideos((prev) => {
                                const newVideos = [...prev, ...res.json!.items];
                                return newVideos.slice(-MAX_VIDEOS);
                            });
                            setSkip(currentSkip + LIMIT);
                            setHasMore(currentSkip + LIMIT < res.json.total);
                            setHasPrevious(currentSkip > 0);
                        } else {
                            setVideos((prev) => {
                                const merged = [...res.json!.items, ...prev];
                                const sliced = merged.slice(0, MAX_VIDEOS);
                                // after prepending, more-at-bottom exists if we haven't shown total yet
                                setHasMore(currentSkip + sliced.length < res.json!.total);
                                return sliced;
                            });
                            setSkip(currentSkip);
                            setHasPrevious(currentSkip > 0);
                        }

                        return res.json.items;
                    } else {
                        setError('Failed to load videos. Please try again.');
                        setHasMore(false);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching videos:', err);
                    setError('An unexpected error occurred. Please try again.');
                    setHasMore(false);
                })
                .finally(() => {
                    setLoading(false);
                    loadingRef.current = false;
                });
        },
        [] // LIMIT/MAX_VIDEOS are constants; states are from setters
    );

    // Initial load
    useEffect(() => {
        fetchVideos(0, 'bottom');
    }, [fetchVideos]);

    // Bottom sentinel (load next page)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchVideos(skip, 'bottom');
                }
            },
            { threshold: 0.1 }
        );

        const el = bottomObserverTarget.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, [skip, hasMore, loading, fetchVideos]);

    // Top sentinel (load previous page)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasPrevious && !loading && skip > 0) {
                    const newSkip = Math.max(0, skip - LIMIT);
                    fetchVideos(newSkip, 'top');
                }
            },
            { threshold: 0.1 }
        );

        const el = topObserverTarget.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
            observer.disconnect();
        };
    }, [skip, hasPrevious, loading, fetchVideos]);

    return (
        <>
            <VideoModal
                isOpen={!!playingVideo}
                onClose={() => setPlayingVideo(null)}
                videoId={playingVideo?.id || ''}
                title={playingVideo?.title || ''}
            />

            <section className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 backdrop-blur-xl border border-emerald-400/40 rounded-full">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-emerald-300 font-semibold tracking-wide text-sm">VIDEO LIBRARY</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300">
                                Video Gallery
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Explore our collection of tutorials and workshops
                        </p>
                    </div>

                    <div ref={topObserverTarget} className="h-4" />
                    {loading && hasPrevious && (
                        <div className="flex justify-center py-6">
                            <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {videos.map((video, index) => (
                            <VideoCard
                                key={`${video.id}-${index}`}
                                video={video}
                                onPlayVideo={(id, title) => setPlayingVideo({ id, title })}
                            />
                        ))}
                    </div>

                    {loading && hasMore && (
                        <div className="flex justify-center py-6">
                            <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="max-w-2xl mx-auto my-12">
                            <div className="relative bg-red-900/20 backdrop-blur-xl border border-red-500/40 rounded-2xl p-8 text-center shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-red-500/5 to-red-600/10 rounded-2xl blur-xl" />
                                <div className="relative">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Unable to Load Videos</h3>
                                    <p className="text-gray-300 mb-8 text-lg">{error}</p>
                                    <button
                                        onClick={() => {
                                            setError(null);
                                            setVideos([]);
                                            setSkip(0);
                                            setHasMore(true);
                                            setHasPrevious(false);
                                            fetchVideos(0, 'bottom');
                                        }}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomObserverTarget} className="h-4" />

                    {!hasMore && videos.length > 0 && !error && (
                        <div className="text-center py-12">
                            <div className="inline-block">
                                <div className="relative bg-black/60 backdrop-blur-xl border border-emerald-900/40 rounded-2xl px-8 py-6 shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-violet-500/10 to-emerald-600/10 rounded-2xl blur-xl" />
                                    <div className="relative flex items-center gap-4">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-white font-semibold text-lg">You&apos;ve reached the end</p>
                                            <p className="text-gray-400 text-sm">All videos have been loaded</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default InfiniteVideoGrid;
