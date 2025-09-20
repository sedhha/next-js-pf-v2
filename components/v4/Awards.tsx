import React from "react";
import Image from "next/image";
import { IEventAndParticipations } from "@/interfaces/events-and-participations";
import awardsData from "@/constants/cms-constants/events-participations.json";

// Server Component - fetches data directly
async function getAwards(): Promise<{ awards: IEventAndParticipations[]; total: number }> {
    return {
        awards: awardsData,
        total: awardsData.length,
    };
}

const Awards = async () => {
    const { awards, total } = await getAwards();

    // Format date function
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Get achievement tier styling
    const getTierStyling = (type: string) => {
        switch (type) {
            case 'gold':
                return {
                    gradient: 'from-yellow-300 via-amber-200 to-orange-300',
                    border: 'border-yellow-300/50',
                    glow: 'shadow-yellow-300/40',
                    particle: 'bg-yellow-300/70',
                    text: 'text-yellow-200'
                };
            case 'silver':
                return {
                    gradient: 'from-slate-200 via-gray-100 to-zinc-300',
                    border: 'border-slate-300/50',
                    glow: 'shadow-slate-300/40',
                    particle: 'bg-slate-300/70',
                    text: 'text-slate-200'
                };
            case 'bronze':
                return {
                    gradient: 'from-orange-300 via-amber-200 to-red-300',
                    border: 'border-orange-300/50',
                    glow: 'shadow-orange-300/40',
                    particle: 'bg-orange-300/70',
                    text: 'text-orange-200'
                };
            default:
                return {
                    gradient: 'from-emerald-300 via-teal-200 to-cyan-300',
                    border: 'border-emerald-300/50',
                    glow: 'shadow-emerald-300/40',
                    particle: 'bg-emerald-300/70',
                    text: 'text-emerald-200'
                };
        }
    };

    return (
        <section
            className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Mysterious Animated Background - Darker and more ominous */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Haunting Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,19,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.03)_1px,transparent_1px)] bg-[size:120px_120px] animate-pulse [animation-duration:8s]" />

                {/* Floating Dynamic Particles - Colorful and inspiring */}
                <div className="absolute top-10 left-[15%] w-2 h-2 bg-emerald-400/40 rounded-full animate-bounce delay-0 shadow-lg shadow-emerald-400/20" />
                <div className="absolute top-32 right-[25%] w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-bounce delay-700 shadow-lg shadow-violet-400/20" />
                <div className="absolute bottom-40 left-[70%] w-3 h-3 bg-amber-400/30 rounded-full animate-bounce delay-1200 shadow-lg shadow-amber-400/20" />
                <div className="absolute top-60 right-[80%] w-1 h-1 bg-rose-400/50 rounded-full animate-bounce delay-500 shadow-lg shadow-rose-400/20" />
                <div className="absolute bottom-20 left-[10%] w-2.5 h-2.5 bg-cyan-400/40 rounded-full animate-bounce delay-1800 shadow-lg shadow-cyan-400/20" />

                {/* Dynamic Swirling Orbs - Multi-colored and inspiring */}
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:12s]" />
                <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[radial-gradient(var(--tw-gradient-stops))] from-violet-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:15s] [animation-delay:3s]" />
                <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[radial-gradient(var(--tw-gradient-stops))] from-amber-500/10 via-orange-500/6 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:10s] [animation-delay:6s]" />

                {/* Moving Shadows - Creepy shadow effects */}
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse"
                            style={{
                                left: `${12 + i * 12}%`,
                                animationDelay: `${i * 2}s`,
                                animationDuration: `${8 + i}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with mysterious vibes */}
                <div className="text-center mb-20 relative">
                    {/* Spinning Morpankh in Center Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 z-0">
                        <div className="w-32 h-32 animate-spin [animation-duration:15s] [animation-timing-function:linear] [animation-iteration-count:infinite]">
                            <svg
                                viewBox="0 0 1380 1375"
                                className="w-full h-full drop-shadow-lg"
                            >
                                <path d="M2254.8 1120.51C2370.52 1004.8 2535.53 982.195 2623.36 1070.03 2711.19 1157.86 2688.59 1322.87 2572.87 1438.58 2457.16 1554.3 2292.15 1576.9 2204.32 1489.07 2116.48 1401.24 2139.09 1236.23 2254.8 1120.51Z"
                                    fill="rgba(255, 215, 102, 0.4)"
                                    transform="translate(-1732 -632)" />
                                <path d="M2304.69 1160.9C2387.88 1077.7 2507.62 1062.54 2572.12 1127.04 2636.62 1191.55 2621.47 1311.28 2538.27 1394.48 2455.07 1477.68 2335.34 1492.83 2270.83 1428.33 2206.33 1363.83 2221.49 1244.09 2304.69 1160.9Z"
                                    fill="rgba(0, 176, 240, 0.3)"
                                    transform="translate(-1732 -632)" />
                                <path d="M649.797 285.625C428.437 285.625 249.922 464.141 249.922 685.5 249.922 755.478 268.487 821.172 299.906 878.297 329.897 846.878 362.744 815.459 398.447 781.184 488.419 696.925 594.1 611.237 682.644 548.4 688.356 544.116 694.069 541.259 701.209 541.259 716.919 541.259 729.772 554.112 729.772 569.822 729.772 579.819 725.487 586.959 718.347 592.672L718.347 592.672C591.244 684.072 422.725 825.456 308.475 953.987 308.475 953.987 292.766 971.125 285.625 979.694 221.359 1055.38 178.516 1123.93 178.516 1172.49L264.203 1172.49C264.203 1141.07 314.187 1072.52 389.878 991.119 459.856 1051.1 549.828 1086.8 649.797 1086.8 721.203 1086.8 789.753 1068.24 848.306 1033.96 1153.92 864.016 1192.48 551.256 1192.48 199.937 1192.48 199.937 859.731 291.337 649.797 285.625Z"
                                    fill="rgba(0, 176, 80, 0.2)"
                                    transform="matrix(1 0 0 1.00073 5 1)" />
                            </svg>
                        </div>
                    </div>

                    {/* Floating Badge - Growth themed with nature colors */}
                    <div className="relative z-10 inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-black/80 via-emerald-950/30 to-black/80 backdrop-blur-xl border border-emerald-400/30 rounded-full shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400/80 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                            <div className="w-1 h-1 bg-teal-400/60 rounded-full animate-pulse delay-300 shadow-lg shadow-teal-400/30" />
                            <div className="w-1.5 h-1.5 bg-green-400/70 rounded-full animate-pulse delay-600 shadow-lg shadow-green-400/40" />
                        </div>
                        <span className="text-emerald-200 font-semibold tracking-wider text-sm">
                            🌱 GROWTH MILESTONES
                        </span>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 opacity-70" />
                    </div>

                    {/* Title with mystical gradient */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 px-4">
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-300 hover:from-blue-300 hover:via-indigo-300 hover:to-purple-400 transition-all duration-700 transform hover:scale-105 drop-shadow-lg">
                            Learning
                        </span>
                        <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400 hover:from-teal-200 hover:via-emerald-300 hover:to-blue-300 transition-all duration-700 delay-100 transform hover:scale-105 drop-shadow-lg">
                            Journey
                        </span>
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-4 px-4">
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Milestones and experiences gathered along the path of continuous learning and growth.
                        </p>
                        {total > 0 && (
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-400/60 to-purple-400/60" />
                                <span className="text-violet-300 font-medium">{total} learning experiences</span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent via-purple-400/60 to-indigo-400/60" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Awards Display - Clean Responsive Grid */}
                {awards.length === 0 ? (
                    <div className="text-center py-32 px-4">
                        <div className="relative mx-auto mb-8 w-32 h-32">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-3xl rotate-12 animate-pulse shadow-lg shadow-yellow-500/20" />
                            <div className="relative bg-black/50 backdrop-blur-sm border border-yellow-400/20 rounded-3xl w-full h-full flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-yellow-400/60"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 mb-4">Experiences Loading</h3>
                        <p className="text-gray-300 max-w-md mx-auto">
                            Gathering moments of learning and growth from the journey...
                        </p>
                    </div>
                ) : (
                    <div className="relative max-w-5xl mx-auto px-4">
                        {/* 3×2 Grid Layout with Amazing Hover Effects */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                            {awards.slice(0, 6).map((award, index) => {
                                const styling = getTierStyling(award.achievementType || 'rest');
                                const isGold = award.achievementType === 'gold';
                                const isSilver = award.achievementType === 'silver';
                                const isBronze = award.achievementType === 'bronze';

                                // Get tier badge
                                const getTierBadge = () => {
                                    if (isGold) return "⭐";
                                    if (isSilver) return "✨";
                                    if (isBronze) return "🌟";
                                    return "💫";
                                };

                                const badge = getTierBadge();

                                // Enhanced styling for tiers
                                const tierEnhancements = isGold
                                    ? "ring-2 ring-yellow-300/20 hover:ring-yellow-300/60"
                                    : isSilver
                                        ? "ring-1 ring-slate-300/20 hover:ring-slate-300/50"
                                        : isBronze
                                            ? "ring-1 ring-orange-300/20 hover:ring-orange-300/50"
                                            : "ring-1 ring-emerald-300/20 hover:ring-emerald-300/50";

                                return (
                                    <article
                                        key={`${award.name}-${award.date}-${index}`}
                                        className={`group relative aspect-[4/3] bg-black/60 backdrop-blur-sm border-2 ${styling.border} rounded-3xl overflow-hidden transition-all duration-700 ease-out ${tierEnhancements} shadow-xl hover:shadow-3xl ${styling.glow} cursor-pointer`}
                                        style={{
                                            animationDelay: `${index * 150}ms`,
                                            perspective: '1000px',
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        {/* 3D Card Container with Amazing Hover Effects */}
                                        <div className="relative w-full h-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-y-12 group-hover:rotate-x-6 group-hover:opacity-100 opacity-80"
                                            style={{
                                                transform: 'rotateX(0deg) rotateY(0deg)',
                                                transformStyle: 'preserve-3d'
                                            }}>

                                            {/* Award Image with Parallax Effect */}
                                            <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                                <Image
                                                    src={award.img}
                                                    alt={award.name}
                                                    fill
                                                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:brightness-125 group-hover:contrast-110 group-hover:saturate-110"
                                                    sizes="(max-width: 640px) 100vw, 50vw"
                                                    unoptimized
                                                    priority={index < 6}
                                                />

                                                {/* Dynamic Gradient Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/80 group-hover:via-transparent group-hover:to-black/60 transition-all duration-700 opacity-70 group-hover:opacity-50`} />

                                                {/* Animated Light Ray Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-full"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                                                        animation: 'shimmer 2s ease-in-out infinite'
                                                    }} />
                                            </div>

                                            {/* Floating Achievement Badge with Pulse */}
                                            <div className="absolute top-4 right-4 z-30 transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-12">
                                                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${styling.gradient} rounded-2xl flex items-center justify-center text-lg md:text-xl font-black shadow-2xl animate-pulse border-2 border-white/20 backdrop-blur-sm`}
                                                    style={{
                                                        boxShadow: `0 0 30px ${styling.glow.split('-')[1]}, inset 0 0 20px rgba(255,255,255,0.2)`
                                                    }}>
                                                    <span className="text-black drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{badge}</span>
                                                </div>
                                            </div>

                                            {/* External Link Button with Morph Animation */}
                                            <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform -translate-y-4 group-hover:translate-y-0">
                                                <a
                                                    href={award.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`w-10 h-10 md:w-12 md:h-12 bg-black/90 backdrop-blur-md border-2 ${styling.border} rounded-2xl flex items-center justify-center hover:scale-125 hover:rotate-12 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:${styling.glow} group-hover:bg-black/80`}
                                                    title="View Achievement"
                                                >
                                                    <svg className={`w-5 h-5 md:w-6 md:h-6 ${styling.text} transform hover:scale-110 transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>

                                            {/* Content Overlay with Slide-Up Animation */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm">
                                                <div className="space-y-2">
                                                    <h3 className={`font-black ${styling.text} text-lg md:text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200`}>
                                                        {award.title}
                                                    </h3>
                                                    <div className="text-sm md:text-base text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-300 font-medium">
                                                        {award.name}
                                                    </div>
                                                    <div className="text-xs md:text-sm text-gray-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-400">
                                                        {formatDate(award.date)}
                                                    </div>
                                                    {/* Achievement Description for Gold */}
                                                    {isGold && award.description && (
                                                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-500 line-clamp-2">
                                                            {award.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Mystical Particle Effects */}
                                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                                {/* Floating Particles */}
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`absolute w-1 h-1 ${styling.particle} rounded-full animate-bounce`}
                                                        style={{
                                                            left: `${10 + i * 15}%`,
                                                            top: `${20 + (i % 3) * 20}%`,
                                                            animationDelay: `${i * 200}ms`,
                                                            animationDuration: `${2 + i * 0.3}s`,
                                                            boxShadow: `0 0 10px ${styling.glow.split('-')[1]}`
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            {/* Holographic Edge Glow */}
                                            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none`}
                                                style={{
                                                    background: `linear-gradient(45deg, transparent 30%, ${styling.glow.split('/')[0].replace('shadow-', 'rgba(').replace('-', ',')}0.3) 50%, transparent 70%)`,
                                                    filter: 'blur(1px)'
                                                }} />
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Show More Awards Button if there are more than 6 */}
                        {awards.length > 6 && (
                            <div className="mt-16 text-center">
                                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-black/80 via-gray-900/60 to-black/80 backdrop-blur-xl border border-violet-400/30 rounded-2xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-500 hover:scale-105">
                                    <span className="text-violet-300 font-semibold">
                                        View All {awards.length} Experiences
                                    </span>
                                    <svg className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Inspirational Bottom CTA - Warm sunset theme */}
                <div className="mt-32 text-center">
                    <div className="relative inline-block">
                        {/* Enhanced sunset glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 via-amber-500/20 to-yellow-500/15 rounded-3xl blur-xl scale-110 animate-pulse [animation-duration:4s]" />

                        <div className="relative bg-black/60 backdrop-blur-xl border border-amber-400/25 rounded-3xl p-12 hover:border-amber-400/45 hover:bg-black/70 transition-all duration-500 shadow-2xl hover:shadow-amber-500/25">
                            <div className="space-y-6">
                                <div className="text-6xl animate-bounce">�</div>
                                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-300">
                                    Always Learning
                                </h3>
                                <p className="text-gray-300 max-w-lg mx-auto leading-relaxed">
                                    Every experience teaches something new and opens doors to fresh perspectives.
                                    The path of growth continues with curiosity and humility.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                    <div className="w-2 h-2 bg-amber-400/60 rounded-full animate-pulse" />
                                    <span>Growth Through Learning</span>
                                    <div className="w-2 h-2 bg-orange-400/60 rounded-full animate-pulse delay-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awards;