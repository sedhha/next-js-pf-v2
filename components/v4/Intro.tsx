const Intro = () => {
    // Predefined positions to avoid hydration mismatch
    const particlePositions = [
        { top: '15%', left: '20%', delay: '0s', duration: '3s' },
        { top: '25%', left: '80%', delay: '1s', duration: '4s' },
        { top: '35%', left: '60%', delay: '2s', duration: '2s' },
        { top: '45%', left: '30%', delay: '0.5s', duration: '3.5s' },
        { top: '55%', left: '70%', delay: '1.5s', duration: '2.5s' },
        { top: '65%', left: '40%', delay: '2.5s', duration: '4.5s' },
        { top: '75%', left: '85%', delay: '3s', duration: '3s' },
        { top: '85%', left: '15%', delay: '0.2s', duration: '5s' },
        { top: '20%', left: '90%', delay: '4s', duration: '2s' },
        { top: '40%', left: '10%', delay: '1.2s', duration: '3.8s' },
        { top: '60%', left: '50%', delay: '2.8s', duration: '2.2s' },
        { top: '80%', left: '75%', delay: '3.5s', duration: '4.2s' },
        { top: '30%', left: '25%', delay: '0.8s', duration: '3.2s' },
        { top: '50%', left: '95%', delay: '4.5s', duration: '2.8s' },
        { top: '70%', left: '35%', delay: '1.8s', duration: '4.8s' },
        { top: '90%', left: '65%', delay: '3.2s', duration: '3.5s' },
        { top: '10%', left: '55%', delay: '2.2s', duration: '2.3s' },
        { top: '22%', left: '45%', delay: '4.2s', duration: '3.7s' },
        { top: '78%', left: '82%', delay: '0.7s', duration: '4.3s' },
        { top: '88%', left: '28%', delay: '3.8s', duration: '2.7s' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient mesh */}
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 via-black to-violet-900/20"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-900/15 via-transparent to-rose-900/15"></div>
                </div>

                {/* Animated orbs - constrained for mobile */}
                <div className="absolute top-20 -left-10 sm:-left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 -right-10 sm:-right-20 w-64 h-64 sm:w-[30rem] sm:h-[30rem] rounded-full bg-gradient-to-l from-violet-500/25 to-purple-500/15 blur-3xl animate-pulse [animation-delay:2s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[40rem] sm:h-[40rem] rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 blur-3xl animate-pulse [animation-delay:4s]"></div>

                {/* Fixed floating particles */}
                <div className="absolute inset-0">
                    {particlePositions.map((particle, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                            style={{
                                top: particle.top,
                                left: particle.left,
                                animationDelay: particle.delay,
                                animationDuration: particle.duration
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 pt-20">
                {/* Hero Section */}
                <div className="text-center max-w-6xl mx-auto space-y-8 mb-16">
                    {/* Small text before title */}
                    <p
                        className="
                            relative inline-block italic text-2xl font-light mb-2
                            bg-clip-text text-transparent
                            [background-image:linear-gradient(90deg,rgba(255,255,255,0.2),var(--color-theme-emerald-300),var(--color-theme-cyan-400),var(--color-theme-violet-400),rgba(255,255,255,0.2))]
                            [background-size:200%_100%]
                            animate-[text-shimmer_3s_linear_infinite]
                            drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]
                            sm:drop-shadow-[0_0_14px_rgba(167,139,250,0.5)]
                        "
                    >
                        You are that
                    </p>
                    {/* Main Title */}
                    <div className="relative group">
                        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none">
                            <span className="block bg-gradient-to-r from-white via-emerald-300 to-cyan-300 bg-clip-text text-transparent hover:from-emerald-200 hover:via-cyan-200 hover:to-violet-300 transition-all duration-1000">
                                TAT TVAM ASI
                            </span>
                        </h1>

                        {/* Enhanced glow */}
                        <div className="absolute inset-0 text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-1000 -z-10">
                            TAT TVAM ASI
                        </div>

                        {/* Animated underline */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-1000 blur-sm"></div>
                    </div>


                    {/* Subtitle with emoji */}
                    <div className="space-y-4">
                        <p className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-300">
                            The cosmos might be{' '}
                            <span className="font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                                or it might not be?
                            </span>
                        </p>
                        <div className="text-4xl sm:text-6xl animate-pulse">☢️🐱</div>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Philosophy Card */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 group-hover:bg-gray-900/30">
                            <div className="flex items-start gap-6">
                                <div className="text-4xl">🧠</div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                                        The Inner Quest
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        Still figuring out why am I here? What is that elusive force,
                                        entangled so deeply within me, that dares to project the infinite onto
                                        the canvas of my being?
                                    </p>
                                    <p className="text-emerald-400 font-medium text-lg">
                                        Re-discovering the things but from inside this time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quantum Card */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/50 to-purple-500/50 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-violet-500/30 transition-all duration-500 group-hover:bg-gray-900/30">
                            <div className="flex items-start gap-6">
                                <div className="text-4xl">⚛️</div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-violet-300 group-hover:text-violet-200 transition-colors">
                                        Quantum Reality
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        The universe might just be a quantum computer where whatever that can
                                        happen will happen!
                                    </p>
                                    <p className="text-violet-400 font-medium text-lg">
                                        Wondering if my choices are algorithms in motion or merely outcomes of
                                        probabilities collapsing into reality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="relative group max-w-4xl mx-auto">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-all duration-1000"></div>
                    <div className="relative bg-black/70 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-12 text-center group-hover:border-gray-600/50 transition-all duration-500">
                        {/* Avatar */}
                        <div className="relative mx-auto mb-8 w-32 h-32">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-400 animate-pulse"></div>
                            <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                                <span className="text-4xl font-black text-white">SS</span>
                            </div>

                            {/* Orbiting rings */}
                            <div className="absolute inset-0 animate-spin [animation-duration:15s]">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400/60"></div>
                            </div>
                            <div className="absolute inset-0 animate-spin [animation-duration:20s] [animation-direction:reverse]">
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-400/60"></div>
                            </div>
                            <div className="absolute inset-0 animate-spin [animation-duration:12s]">
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60"></div>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-2">Shivam Sahil</h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Digital Philosopher & Reality Explorer
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {['Consciousness', 'Quantum Theory', 'Philosophy', 'Creation'].map(
                                (tag, index) => (
                                    <span
                                        key={tag}
                                        className={`px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${index === 0
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                                            : index === 1
                                                ? 'bg-violet-500/10 border-violet-500/30 text-violet-300 hover:bg-violet-500/20'
                                                : index === 2
                                                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                                                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                )
                            )}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-gray-300 text-xl italic font-light leading-relaxed">
                            &quot;That thou art — The finite is but the mask; the infinite wears it
                            to behold itself.&quot;
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
