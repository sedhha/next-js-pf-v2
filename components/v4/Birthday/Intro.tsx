'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBirthdayStore } from '@/lib/stores/birthdayStore';

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

const PREDEFINED_STARS: Star[] = [
    { id: 0, top: 15, left: 20, size: 1.5, duration: 2.5, delay: 0, opacity: 0.6 },
    { id: 1, top: 25, left: 80, size: 2.2, duration: 3.2, delay: 1, opacity: 0.4 },
    { id: 2, top: 35, left: 60, size: 1.8, duration: 2.8, delay: 2, opacity: 0.7 },
    { id: 3, top: 45, left: 30, size: 2.1, duration: 3.5, delay: 0.5, opacity: 0.5 },
    { id: 4, top: 55, left: 70, size: 1.6, duration: 2.6, delay: 1.5, opacity: 0.8 },
    { id: 5, top: 65, left: 40, size: 2.3, duration: 4, delay: 2.5, opacity: 0.45 },
    { id: 6, top: 75, left: 85, size: 1.7, duration: 2.9, delay: 3, opacity: 0.65 },
    { id: 7, top: 85, left: 15, size: 2.4, duration: 4.2, delay: 0.2, opacity: 0.55 },
    { id: 8, top: 20, left: 90, size: 1.9, duration: 2.7, delay: 4, opacity: 0.75 },
    { id: 9, top: 40, left: 10, size: 2.0, duration: 3.3, delay: 1.2, opacity: 0.5 },
    { id: 10, top: 60, left: 50, size: 1.5, duration: 2.4, delay: 2.8, opacity: 0.7 },
    { id: 11, top: 80, left: 75, size: 2.2, duration: 3.8, delay: 3.5, opacity: 0.6 },
    { id: 12, top: 30, left: 25, size: 1.8, duration: 2.9, delay: 0.8, opacity: 0.8 },
    { id: 13, top: 50, left: 95, size: 2.1, duration: 3.1, delay: 4.5, opacity: 0.4 },
    { id: 14, top: 70, left: 35, size: 2.3, duration: 4.3, delay: 1.8, opacity: 0.65 },
    { id: 15, top: 90, left: 65, size: 1.9, duration: 3.4, delay: 3.2, opacity: 0.55 },
    { id: 16, top: 10, left: 55, size: 1.7, duration: 2.5, delay: 2.2, opacity: 0.7 },
    { id: 17, top: 22, left: 45, size: 2.0, duration: 3.6, delay: 4.2, opacity: 0.5 },
    { id: 18, top: 78, left: 82, size: 2.4, duration: 3.0, delay: 0.7, opacity: 0.75 },
    { id: 19, top: 88, left: 28, size: 1.6, duration: 2.8, delay: 3.8, opacity: 0.6 },
    { id: 20, top: 12, left: 72, size: 2.1, duration: 3.7, delay: 1.5, opacity: 0.65 },
    { id: 21, top: 38, left: 5, size: 1.8, duration: 2.6, delay: 2.5, opacity: 0.5 },
    { id: 22, top: 62, left: 92, size: 2.2, duration: 3.9, delay: 0.3, opacity: 0.7 },
    { id: 23, top: 76, left: 48, size: 1.9, duration: 2.7, delay: 4.1, opacity: 0.6 },
    { id: 24, top: 8, left: 38, size: 2.0, duration: 3.2, delay: 1.8, opacity: 0.55 },
    { id: 25, top: 32, left: 88, size: 2.3, duration: 3.5, delay: 2.8, opacity: 0.8 },
    { id: 26, top: 52, left: 22, size: 1.7, duration: 2.9, delay: 3.6, opacity: 0.45 },
    { id: 27, top: 68, left: 58, size: 2.1, duration: 3.1, delay: 0.9, opacity: 0.7 },
    { id: 28, top: 18, left: 98, size: 1.6, duration: 2.5, delay: 2.1, opacity: 0.6 },
    { id: 29, top: 42, left: 68, size: 2.2, duration: 4.1, delay: 3.3, opacity: 0.65 },
];

const BirthdayIntro: React.FC = (): React.ReactElement => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [isDesktop, setIsDesktop] = useState(false);
    const { setCurrentView, birthdayToken } = useBirthdayStore();

    useEffect(() => {
        const handleResize = (): void => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setScreenSize({ width, height });
            setIsDesktop(width >= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        if (isDesktop) {
            window.addEventListener('mousemove', handleMouseMove);
            return (): void => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isDesktop]);

    const handleContinue = (): void => {
        if (birthdayToken) {
            setCurrentView('cards');
        } else {
            setCurrentView('token');
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-black flex flex-col">
            {/* Desktop Warning Message */}
            {isDesktop && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-cyan-600/20 to-violet-600/20 backdrop-blur-sm border-b border-cyan-400/30"
                >
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2">
                        <span className="text-cyan-400 text-sm">💡</span>
                        <p className="text-gray-300 text-sm font-light">
                            This experience is optimized for desktop. For best results, view on your desktop or tablet.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Starfield Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-900 opacity-90" />

                <motion.div
                    className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-600/10 via-transparent to-transparent blur-2xl sm:blur-3xl rounded-full"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, 30, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                <motion.div
                    className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent blur-2xl sm:blur-3xl rounded-full"
                    animate={{
                        x: [0, -50, 30, 0],
                        y: [0, -30, 50, 0],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                />

                {PREDEFINED_STARS.map((star): React.ReactElement => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: star.size,
                            height: star.size,
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                        }}
                        animate={{
                            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                        }}
                        transition={{
                            duration: star.duration,
                            delay: star.delay,
                            repeat: Infinity,
                        }}
                    />
                ))}

                {isDesktop &&
                    [0, 1].map((i): React.ReactElement => (
                        <motion.div
                            key={`shooting-${i}`}
                            className="absolute w-1 h-1 bg-white rounded-full blur-sm"
                            initial={{
                                x: screenSize.width * 0.2 + i * screenSize.width * 0.6,
                                y: screenSize.height * 0.3,
                                opacity: 0,
                            }}
                            animate={{
                                x: screenSize.width * 1.2,
                                y: screenSize.height * 0.8,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 8,
                                repeat: Infinity,
                                repeatDelay: 6,
                            }}
                        />
                    ))}
            </div>

            {isDesktop && (
                <motion.div
                    className="pointer-events-none fixed w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 blur-2xl sm:blur-3xl"
                    animate={{
                        x: mousePosition.x - (screenSize.width >= 1280 ? 128 : 96),
                        y: mousePosition.y - (screenSize.width >= 1280 ? 128 : 96),
                    }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="flex flex-col items-center justify-center px-4 text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400/70 font-light"
                    >
                        Welcome to your moment
                    </motion.p>

                    <div className="space-y-2 sm:space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight"
                        >
                            <span className="block bg-gradient-to-r from-white via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                                Hey there!
                            </span>
                            <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mt-2 sm:mt-3">
                                What&apos;s up?
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="h-0.5 sm:h-1 max-w-xs mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 origin-center"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-gray-300 font-light px-2"
                    >
                        I&apos;ve got something special for your birthday 🎁
                    </motion.p>

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-3xl sm:text-4xl"
                    >
                        ✨
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                        className="pt-4 sm:pt-6"
                    >
                        <motion.button
                            onClick={handleContinue}
                            className="cursor-pointer px-8 sm:px-12 py-3 sm:py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                            whileHover={{ scale: 1.08, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let&apos;s Go! 🚀
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BirthdayIntro;