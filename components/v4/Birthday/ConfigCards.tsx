'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBirthdayStore, ConfigCard } from '@/lib/stores/birthdayStore';

const ConfigCardsView: React.FC = (): React.ReactElement => {
    const { configCards, selectedConfig, setSelectedConfig, setCurrentView } = useBirthdayStore();
    const [showBeginButton, setShowBeginButton] = useState(false);
    const [cards, setCards] = useState<ConfigCard[]>([]);

    // Sync cards from store
    useEffect(() => {
        if (configCards && configCards.length > 0) {
            setCards(configCards);
        }
    }, [configCards]);

    const handleCardSelect = (card: ConfigCard): void => {
        setSelectedConfig(card);
        setShowBeginButton(true);
    };

    const handleBegin = (): void => {
        if (selectedConfig?.componentTarget === 'component1') {
            setCurrentView('component1');
        } else if (selectedConfig?.componentTarget === 'component2') {
            setCurrentView('component2');
        }
    };

    // Scaffold animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const scaffoldVariants = {
        hidden: { opacity: 0, scale: 0.3, y: 40 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    };

    const cardHoverVariants = {
        initial: { scale: 1, y: 0 },
        hover: {
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="w-screen min-h-screen bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-900 opacity-90" />

                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600/10 via-transparent to-transparent blur-3xl rounded-full"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, 30, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                <motion.div
                    className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent blur-3xl rounded-full"
                    animate={{
                        x: [0, -50, 30, 0],
                        y: [0, -30, 50, 0],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                />

                {/* Twinkling stars */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        style={{
                            top: `${(i * 13.7) % 100}%`,
                            left: `${(i * 23.5) % 100}%`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: (i % 3) + 2,
                            delay: (i % 5) * 0.4,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-16 sm:mb-20 max-w-2xl"
                >
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400/70 font-light mb-3">
                        Pick your journey
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                        <span className="bg-gradient-to-r from-white via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                            What speaks to you?
                        </span>
                    </h1>
                </motion.div>

                {/* Cards Grid with Scaffold Animation */}
                <motion.div
                    className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {cards.map((card) => {
                        const isSelected = selectedConfig?.id === card.id;

                        return (
                            <motion.div
                                key={card.id}
                                variants={scaffoldVariants}
                                whileHover="hover"
                                initial="initial"
                                animate={isSelected ? 'hover' : 'initial'}
                                className="group cursor-pointer relative"
                                onClick={() => {
                                    console.log('Card clicked:', card.id);
                                    handleCardSelect(card);
                                }}
                            >
                                {/* Card glow effect */}
                                <motion.div
                                    className={`absolute -inset-1 bg-gradient-to-r ${card.glowColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    animate={
                                        isSelected
                                            ? { opacity: [0.4, 0.7, 0.4] }
                                            : { opacity: 0 }
                                    }
                                    transition={{
                                        duration: 2,
                                        repeat: isSelected ? Infinity : 0,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Card */}
                                <motion.div
                                    variants={cardHoverVariants}
                                    className={`relative h-full bg-black/40 backdrop-blur-xl border rounded-3xl p-8 sm:p-10 transition-all duration-500 ${card.borderColor} ${isSelected ? 'bg-black/60 border-opacity-100' : 'hover:bg-black/60'
                                        }`}
                                >
                                    {/* Top accent line */}
                                    <motion.div
                                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} rounded-t-3xl`}
                                        animate={isSelected ? { opacity: 1 } : { opacity: 0.4 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Content */}
                                    <div className="space-y-4 sm:space-y-6">
                                        {/* Icon with animation */}
                                        <motion.div
                                            className="text-5xl sm:text-6xl"
                                            animate={
                                                isSelected
                                                    ? { y: [0, -12, 0] }
                                                    : { y: 0 }
                                            }
                                            transition={{
                                                duration: 2,
                                                repeat: isSelected ? Infinity : 0,
                                                ease: 'easeInOut',
                                            }}
                                        >
                                            {card.icon}
                                        </motion.div>

                                        {/* Title and subtitle */}
                                        <div>
                                            <motion.p
                                                className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-light mb-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Option {card.id.includes('1') ? '1' : '2'}
                                            </motion.p>
                                            <h3 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                                                {card.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed font-light">
                                            {card.description}
                                        </p>

                                        {/* Selection indicator */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={
                                                isSelected
                                                    ? { opacity: 1, scale: 1 }
                                                    : { opacity: 0, scale: 0 }
                                            }
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-2 text-cyan-400 text-sm"
                                        >
                                            <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                                    animate={{ scale: [0.8, 1.2, 0.8] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            </div>
                                            <span>Selected</span>
                                        </motion.div>
                                    </div>

                                    {/* Decorative corner accent */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                                        <div
                                            className={`w-full h-full bg-gradient-to-tl ${card.gradient} rounded-tl-full blur-2xl`}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Begin Button - Fly in animation */}
                {showBeginButton && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                            duration: 0.6,
                        }}
                    >
                        <motion.button
                            onClick={handleBegin}
                            className={`px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${selectedConfig?.id === 'config-1'
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                                : 'bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:shadow-lg hover:shadow-violet-500/50'
                                }`}
                            whileHover={{ scale: 1.08, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let&apos;s Begin ✨
                        </motion.button>
                    </motion.div>
                )}

                {/* Hint text */}
                {!showBeginButton && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-gray-500 text-sm font-light mt-8 text-center"
                    >
                        Click on a card to select your experience
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default ConfigCardsView;