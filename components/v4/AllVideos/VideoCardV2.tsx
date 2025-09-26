'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/components/v4/AllVideos/videos';
import { VideoContent } from '@/components/v4/AllVideos/types';

export function VideoCard({
    video,
    onPlay,
}: {
    video: VideoContent;
    // eslint-disable-next-line no-unused-vars
    onPlay: (videoId: string, title: string) => void;
}) {
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
                                onClick={() => onPlay(video.id, video.title)}
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
}
