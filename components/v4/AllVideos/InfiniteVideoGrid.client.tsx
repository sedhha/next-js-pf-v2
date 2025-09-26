// components/v4/AllVideos/InfiniteVideoGrid.client.tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VideoCard } from '@/components/v4/AllVideos/VideoCardV2';
import { VideoModal } from '@/components/v4/AllVideos/VideoModal';
import { VideoContent } from '@/components/v4/AllVideos/types';
import { V2_APIS } from '@/utils/fe/apis/public'; // ensure this points to '/api/videos'

type Direction = 'top' | 'bottom';

export default function InfiniteVideoGridClient({
    initialItems,
    total,
    limit = 6,
    maxKeep = 52,
}: {
    initialItems: VideoContent[];
    total: number;
    limit?: number;
    maxKeep?: number;
}) {
    const [videos, setVideos] = useState<VideoContent[]>(initialItems);
    const [skip, setSkip] = useState(initialItems.length);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialItems.length < total);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [playing, setPlaying] = useState<{ id: string; title: string } | null>(null);

    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);
    const lastKeyRef = useRef<string>(''); // guard repeated IO fires

    const fetchPage = useCallback(
        async (currentSkip: number, direction: Direction) => {
            if (loadingRef.current || currentSkip < 0) return;
            const key = `${direction}:${currentSkip}`;
            if (lastKeyRef.current === key) return; // prevent double-fire on same page
            lastKeyRef.current = key;

            loadingRef.current = true;
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${V2_APIS.VIDEOS}?limit=${limit}&skip=${currentSkip}`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();

                const items: VideoContent[] = json.items ?? [];
                const totalCount: number = json.total ?? 0;

                if (direction === 'bottom') {
                    setVideos((prev) => {
                        // de-dupe by id
                        const m = new Map(prev.map((v) => [v.id, v]));
                        for (const it of items) m.set(it.id, it);
                        const list = Array.from(m.values());
                        return list.slice(-maxKeep);
                    });
                    const nextSkip = currentSkip + items.length; // advance by actual returned size
                    setSkip(nextSkip);
                    setHasMore(nextSkip < totalCount);
                    setHasPrevious(nextSkip > limit);
                } else {
                    setVideos((prev) => {
                        const m = new Map(prev.map((v) => [v.id, v]));
                        for (const it of items) m.set(it.id, it);
                        const list = Array.from(m.values());
                        const sliced = list.slice(0, maxKeep);
                        setHasMore(currentSkip + sliced.length < totalCount);
                        return sliced;
                    });
                    setSkip(currentSkip);
                    setHasPrevious(currentSkip > 0);
                }
            } catch {
                setError('Failed to load videos. Please try again.');
                setHasMore(false);
            } finally {
                setLoading(false);
                loadingRef.current = false;
            }
        },
        [limit, maxKeep]
    );

    // bottom observer
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchPage(skip, 'bottom');
                }
            },
            { threshold: 0.1 }
        );
        const el = bottomRef.current;
        if (el) obs.observe(el);
        return () => {
            if (el) obs.unobserve(el);
            obs.disconnect();
        };
    }, [skip, hasMore, loading, fetchPage]);

    // top observer
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasPrevious && !loading && skip > 0) {
                    const newSkip = Math.max(0, skip - limit);
                    fetchPage(newSkip, 'top');
                }
            },
            { threshold: 0.1 }
        );
        const el = topRef.current;
        if (el) obs.observe(el);
        return () => {
            if (el) obs.unobserve(el);
            obs.disconnect();
        };
    }, [skip, hasPrevious, loading, limit, fetchPage]);

    return (
        <>
            <VideoModal
                isOpen={!!playing}
                onClose={() => setPlaying(null)}
                videoId={playing?.id || ''}
                title={playing?.title || ''}
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

                    <div ref={topRef} className="h-4" />
                    {loading && hasPrevious && (
                        <div className="flex justify-center py-6">
                            <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {videos.map((v, i) => (
                            <VideoCard key={`${v.id}-${i}`} video={v} onPlay={(id, title) => setPlaying({ id, title })} />
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
                                            setVideos(initialItems);
                                            setSkip(initialItems.length);
                                            setHasMore(initialItems.length < total);
                                            setHasPrevious(false);
                                            lastKeyRef.current = ''; // reset guard
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

                    <div ref={bottomRef} className="h-4" />

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
}
