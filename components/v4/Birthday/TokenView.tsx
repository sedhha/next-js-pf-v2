'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBirthdayStore, ConfigCard } from '@/lib/stores/birthdayStore';

const TokenView: React.FC = (): React.ReactElement => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setBirthdayToken, setCurrentView, setConfigCards } = useBirthdayStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');

        if (!token.trim()) {
            setError('Please enter a birthday token');
            return;
        }

        setLoading(true);

        try {
            // Simulate API call with delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Dummy configuration data
            const dummyConfigs: ConfigCard[] = [
                {
                    id: 'config-1',
                    title: 'Lets explore with Shivam',
                    description: 'Explore the possibilities with Shivam. What ifs, buts, anything you have in mind — this is the right place to dive into conversations that matter.',
                    icon: '🌙',
                    gradient: 'from-cyan-600 to-blue-600',
                    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
                    glowColor: 'from-cyan-500/30 to-blue-500/20',
                    componentTarget: 'component1',
                },
                {
                    id: 'config-2',
                    title: "Here's a lovely packed greeting",
                    description: 'A heartfelt collection of wishes and warm thoughts packed just for you. Because every moment of your special day deserves to be celebrated with genuine affection.',
                    icon: '🎂',
                    gradient: 'from-violet-600 to-pink-600',
                    borderColor: 'border-violet-500/30 hover:border-violet-400/60',
                    glowColor: 'from-violet-500/30 to-pink-500/20',
                    componentTarget: 'component2',
                },
            ];

            // Store token FIRST
            setBirthdayToken(token);

            // Then set config cards
            setConfigCards(dummyConfigs);

            // Finally change view
            setCurrentView('cards');
        } catch {
            setError('Failed to verify token. Please try again.');
        } finally {
            setLoading(false);
        }
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
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-5xl mb-6"
                        >
                            🔐
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">
                            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                Before we start
                            </span>
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base font-light">
                            Enter your birthday token to unlock your special experience
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 to-violet-600/30 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

                            <input
                                type="password"
                                value={token}
                                onChange={(e) => {
                                    setToken(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter your token..."
                                className="relative w-full px-6 py-3 rounded-lg bg-black/50 backdrop-blur-xl border border-gray-700 group-focus-within:border-cyan-400 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none"
                            />
                        </motion.div>

                        {/* Error message */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm font-light text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Submit button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Verifying...
                                </motion.span>
                            ) : (
                                'Unlock Experience'
                            )}
                        </motion.button>
                    </form>

                    {/* Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-gray-500 text-xs font-light mt-8"
                    >
                        This ensures no sneaky peeks! 🔒
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default TokenView;