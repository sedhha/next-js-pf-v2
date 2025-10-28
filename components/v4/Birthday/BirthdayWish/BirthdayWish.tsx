'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Loader } from 'lucide-react';
import { useBirthdayStore } from '@/lib/stores/birthdayStore';

// CSS animations for 3D effects and glowing
const styles = `
    @keyframes float-rotate {
        0% {
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0);
        }
        50% {
            transform: perspective(1200px) rotateX(3deg) rotateY(5deg) translateZ(10px);
        }
        100% {
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0);
        }
    }

    @keyframes glow-pulse {
        0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 
                        0 10px 30px rgba(168, 85, 247, 0.2),
                        inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
        50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 
                        0 20px 50px rgba(168, 85, 247, 0.3),
                        inset 0 0 30px rgba(255, 255, 255, 0.15);
        }
    }

    @keyframes shine-effect {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    .card-3d {
        transform-style: preserve-3d;
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .card-3d:hover {
        animation: float-rotate 3s ease-in-out forwards;
    }

    .glow-container {
        animation: glow-pulse 3s ease-in-out infinite;
    }

    .shine-overlay {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shine-effect 3s ease-in-out;
    }

    .glossy-shadow {
        box-shadow: 
            0 0 30px rgba(168, 85, 247, 0.3),
            0 20px 40px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    }
`;

interface Balloon {
    id: number;
    left: number;
    delay: number;
    color: string;
}

interface Confetti {
    id: number;
    left: number;
    delay: number;
    duration: number;
}

interface ImageWithCaption {
    url: string;
    caption: string;
}

const BirthdayWish: React.FC = (): React.ReactElement => {
    const { birthdayToken } = useBirthdayStore();
    const [balloons, setBalloons] = useState<Balloon[]>([]);
    const [confetti, setConfetti] = useState<Confetti[]>([]);
    const [imageHover, setImageHover] = useState<number | null>(null);
    const [images, setImages] = useState<ImageWithCaption[]>([]);
    const [isLoadingImages, setIsLoadingImages] = useState(true);

    useEffect(() => {
        // Generate balloons
        const balloonArray: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            color: ['#FF6B9D', '#FFA726', '#42A5F5', '#AB47BC', '#EC407A', '#29B6F6'][
                Math.floor(Math.random() * 6)
            ],
        }));
        setBalloons(balloonArray);

        // Generate confetti
        const confettiArray: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 2 + Math.random() * 1,
        }));
        setConfetti(confettiArray);
    }, []);

    // Fetch images from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!birthdayToken) {
                    console.log('[BirthdayWish] No birthday token available');
                    setIsLoadingImages(false);
                    return;
                }

                console.log('[BirthdayWish] Fetching images from API');

                const response = await fetch('/apis/v2/birthday/images', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${birthdayToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`[BirthdayWish] Loaded ${data.images?.length || 0} images`);
                    setImages(data.images || []);
                } else {
                    console.error('[BirthdayWish] Failed to fetch images:', response.status);
                }
            } catch (error) {
                console.error('[BirthdayWish] Error fetching images:', error);
            } finally {
                setIsLoadingImages(false);
            }
        };

        fetchImages();
    }, [birthdayToken]);

    // Calculate split point: 3 rows (9 images) above, rest below
    const splitIndex = 9; // 3 rows × 3 columns = 9 images in top gallery
    const topImages = images.slice(0, splitIndex);
    const bottomImages = images.slice(splitIndex);

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
            <style>{styles}</style>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Balloons */}
            <div className="absolute inset-0 pointer-events-none">
                {balloons.map((balloon) => (
                    <div
                        key={balloon.id}
                        className="absolute animate-float"
                        style={{
                            left: `${balloon.left}%`,
                            bottom: '-50px',
                            animation: `float 8s ease-in infinite`,
                            animationDelay: `${balloon.delay}s`,
                        }}
                    >
                        <div
                            className="w-12 h-16 rounded-full shadow-lg transform transition-transform hover:scale-110"
                            style={{
                                backgroundColor: balloon.color,
                                boxShadow: `0 10px 30px ${balloon.color}40`,
                            }}
                        >
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gray-300"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confetti */}
            {confetti.map((conf) => (
                <div
                    key={conf.id}
                    className="absolute w-2 h-2 pointer-events-none"
                    style={{
                        left: `${conf.left}%`,
                        top: '0',
                        animation: `fall ${conf.duration}s linear infinite`,
                        animationDelay: `${conf.delay}s`,
                        backgroundColor: ['#FF6B9D', '#FFA726', '#42A5F5', '#AB47BC', '#FFD93D'][
                            Math.floor(Math.random() * 5)
                        ],
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                        opacity: 0.7,
                    }}
                ></div>
            ))}

            {/* Scrollable Main Content Container */}
            <div className="relative z-10 h-full overflow-y-auto">
                <div className="flex flex-col items-center px-4 py-12">
                    {/* Header with floating hearts */}
                    <div className="text-center mb-8 relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-4">
                            <Heart className="w-6 h-6 text-red-400 animate-pulse" fill="currentColor" />
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                            <Heart className="w-6 h-6 text-red-400 animate-pulse" fill="currentColor" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4 animate-fade-in-down">
                            Happy Birthday
                        </h1>
                        <p className="text-3xl md:text-4xl text-purple-600 font-semibold animate-fade-in-up">
                            Kanchan
                        </p>
                    </div>

                    {/* Loading State */}
                    {isLoadingImages && (
                        <div className="w-full max-w-7xl mx-auto mb-12 flex flex-col items-center justify-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <Loader className="w-12 h-12 text-purple-600 animate-spin" />
                                <p className="text-xl font-bold text-purple-600 animate-pulse">
                                    Loading beautiful memories... ✨
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Top Image Gallery - First Half of Images */}
                    {!isLoadingImages && topImages.length > 0 && (
                        <div className="w-full max-w-7xl mx-auto mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
                                {topImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                                        onMouseEnter={() => setImageHover(index)}
                                        onMouseLeave={() => setImageHover(null)}
                                    >
                                        {/* Decorative glow ring */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>

                                        {/* Main card container */}
                                        <div className="card-3d relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/50 glow-container glossy-shadow">
                                            {/* Image container with decorative frame */}
                                            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/60 group-hover:ring-4 group-hover:ring-purple-300/50 transition-all duration-300">
                                                <Image
                                                    src={image.url}
                                                    alt={image.caption}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    unoptimized
                                                />

                                                {/* Gradient overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Glossy shine effect */}
                                                <div className="shine-overlay group-hover:animate-pulse rounded-xl"></div>

                                                {/* Corner sparkles - always visible but pulse on hover */}
                                                <Sparkles className={`absolute top-2 right-2 w-4 h-4 text-yellow-400 transition-all duration-300 ${imageHover === index ? 'animate-pulse scale-125' : 'opacity-60'}`} />
                                                <Heart className={`absolute top-2 left-2 w-4 h-4 text-pink-400 transition-all duration-300 ${imageHover === index ? 'animate-pulse scale-125' : 'opacity-60'}`} fill="currentColor" />
                                            </div>

                                            {/* Glossy caption box - always visible */}
                                            <div className="mt-3 relative">
                                                {/* Glass morphism effect */}
                                                <div className="relative backdrop-blur-md bg-gradient-to-br from-white/80 to-white/60 rounded-lg p-4 shadow-lg border border-white/40 group-hover:from-white/90 group-hover:to-white/70 transition-all duration-300">
                                                    {/* Shine effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                                                    {/* Caption text */}
                                                    <p className="relative text-sm md:text-base font-medium text-center leading-relaxed">
                                                        {image.caption.split(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u).map((part, i) => {
                                                            // Check if part is an emoji
                                                            const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(part);
                                                            return isEmoji ? (
                                                                <span key={i} className="inline-block">{part}</span>
                                                            ) : (
                                                                <span key={i} className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">{part}</span>
                                                            );
                                                        })}
                                                    </p>

                                                    {/* Bottom accent line */}
                                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full transition-all duration-500"></div>
                                                </div>

                                                {/* Subtle shadow beneath caption box */}
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-purple-400/20 blur-md rounded-full"></div>
                                            </div>

                                            {/* Decorative corner elements */}
                                            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-pink-300/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-purple-300/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-pink-300/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Letter/Message Section - Increased size */}
                    <div className="w-full max-w-4xl mx-auto mb-12 backdrop-blur-sm bg-white/80 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-xl md:text-2xl italic text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-semibold">
                                To the girl whose smile lights rooms and whose kindness steadies storms.
                            </p>

                            <p className="text-base md:text-lg">
                                We met in the busy hum of Optum—Next Portal devs buzzing, tickets flying. You were new, curious, brave. You asked a question; I answered; and somehow a tiny thread became a bridge. Teams pings turned into long calls, and long calls turned into the soft certainty that some people arrive like sunrise—quiet, inevitable, warm.
                            </p>

                            <p className="text-base md:text-lg">
                                You&apos;ve been my steady place through my highs and lows—caring, unshakably supportive, all heart. Your laughter is the kind that makes the air lighter; your energy is the kind that makes the day brighter. You&apos;ve walked through old shadows and kept your gaze on a kinder sky. That courage is beautiful. That courage is you.
                            </p>

                            <p className="text-base md:text-lg">
                                Today, I want to thank you—for the patience, for the nudges to grow, for the way you notice the little things and make them feel like constellations. For jailbreak games where you wore green and it felt like spring had found a person. For the hilariously shady couple spa that somehow became a safe memory. For movie nights, shared snacks, fingertips and hugs, and that timeless ease with Saurabh in the mix. For trusting me, again and again.
                            </p>

                            <div className="border-t-2 border-b-2 border-pink-200 py-6 my-8">
                                <p className="text-base md:text-lg italic text-purple-600">
                                    May this year open like a flower at dawn—quiet petals, bright center. May every interview room feel like your stage, every keyboard a compass. Work hard, yes, but also rest with purpose. You deserve the role that celebrates your grit and grace, the team that recognizes your shine, and a future that reflects the love you keep giving away.
                                </p>
                            </div>

                            <p className="text-base md:text-lg">
                                Whatever tomorrow holds, know this: I&apos;m grateful for you—exactly as you are. You make the world gentler. You make my world kinder. And I&apos;m cheering for you, loudly, always.
                            </p>

                            <div className="text-center pt-6 space-y-3">
                                <p className="font-semibold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-xl md:text-2xl">
                                    More light. More laughter. More wins. More wonder.
                                </p>
                                <p className="text-sm md:text-base text-gray-600">
                                    May your path be lined with courage, your days with joy, and your heart with a thousand quiet reasons to smile.
                                </p>
                                <p className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pt-6">
                                    With warmth and love,<br />Shivam
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Image Gallery - Second Half of Images */}
                    <div className="w-full max-w-7xl mx-auto mb-12">
                        {!isLoadingImages && bottomImages.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
                                {bottomImages.map((image, index) => {
                                    const actualIndex = splitIndex + index;
                                    return (
                                        <div
                                            key={actualIndex}
                                            className="relative group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                                            onMouseEnter={() => setImageHover(actualIndex)}
                                            onMouseLeave={() => setImageHover(null)}
                                        >
                                            {/* Decorative glow ring */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>

                                            {/* Main card container */}
                                            <div className="card-3d relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/50 glow-container glossy-shadow">
                                                {/* Image container with decorative frame */}
                                                <div className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/60 group-hover:ring-4 group-hover:ring-purple-300/50 transition-all duration-300">
                                                    <Image
                                                        src={image.url}
                                                        alt={image.caption}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        unoptimized
                                                    />

                                                    {/* Gradient overlay on hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                    {/* Glossy shine effect */}
                                                    <div className="shine-overlay group-hover:animate-pulse rounded-xl"></div>

                                                    {/* Corner sparkles - always visible but pulse on hover */}
                                                    <Sparkles className={`absolute top-2 right-2 w-4 h-4 text-yellow-400 transition-all duration-300 ${imageHover === actualIndex ? 'animate-pulse scale-125' : 'opacity-60'}`} />
                                                    <Heart className={`absolute top-2 left-2 w-4 h-4 text-pink-400 transition-all duration-300 ${imageHover === actualIndex ? 'animate-pulse scale-125' : 'opacity-60'}`} fill="currentColor" />
                                                </div>

                                                {/* Glossy caption box - always visible */}
                                                <div className="mt-3 relative">
                                                    {/* Glass morphism effect */}
                                                    <div className="relative backdrop-blur-md bg-gradient-to-br from-white/80 to-white/60 rounded-lg p-4 shadow-lg border border-white/40 group-hover:from-white/90 group-hover:to-white/70 transition-all duration-300">
                                                        {/* Shine effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                                                        {/* Caption text */}
                                                        <p className="relative text-sm md:text-base font-medium text-center leading-relaxed">
                                                            {image.caption.split(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u).map((part, i) => {
                                                                // Check if part is an emoji
                                                                const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(part);
                                                                return isEmoji ? (
                                                                    <span key={i} className="inline-block">{part}</span>
                                                                ) : (
                                                                    <span key={i} className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">{part}</span>
                                                                );
                                                            })}
                                                        </p>

                                                        {/* Bottom accent line */}
                                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full transition-all duration-500"></div>
                                                    </div>

                                                    {/* Subtle shadow beneath caption box */}
                                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-purple-400/20 blur-md rounded-full"></div>
                                                </div>

                                                {/* Decorative corner elements */}
                                                <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-pink-300/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-purple-300/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-pink-300/50 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Closing Message */}
                    <div className="text-center mb-8 px-4">
                        <div className="inline-block backdrop-blur-sm bg-white/80 rounded-full px-8 py-4 border border-white/20 hover:bg-white/95 transition-all duration-300">
                            <p className="text-lg md:text-xl font-semibold text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text">
                                🎂 Wishing you a year filled with magic ✨
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BirthdayWish;