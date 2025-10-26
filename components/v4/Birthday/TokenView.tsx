'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBirthdayStore, ConfigCard } from '@/lib/stores/birthdayStore';

const TokenView: React.FC = (): React.ReactElement => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [configNotFound, setConfigNotFound] = useState(false);
    const { setBirthdayToken, setCurrentView, setConfigCards } = useBirthdayStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setConfigNotFound(false);

        if (!token.trim()) {
            setError('Please enter a birthday token');
            return;
        }

        setLoading(true);

        try {
            // Call backend to pull config
            const response = await fetch('/apis/v2/birthday/pull-config', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 404) {
                // Config not found
                setConfigNotFound(true);
                setLoading(false);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();

                // Check if token is expired
                if (response.status === 401 &&
                    errorData.message &&
                    errorData.message.includes('expired')) {
                    // Redirect to intro page
                    setCurrentView('intro');
                    return;
                }

                setError(
                    errorData.message || 'Invalid token. Please check and try again.'
                );
                setLoading(false);
                return;
            }

            const result = await response.json();
            const config = result.data;

            // Validate config structure
            if (!config || typeof config !== 'object') {
                setError('Invalid configuration received. Please try again.');
                setLoading(false);
                return;
            }

            // Convert config to ConfigCard format
            const configCards = convertConfigToCards(config);

            if (configCards.length === 0) {
                setError('Configuration is empty. Please contact the organizer.');
                setLoading(false);
                return;
            }

            // Store token FIRST
            setBirthdayToken(token);

            // Then set config cards
            setConfigCards(configCards);

            // Finally change view
            setCurrentView('cards');
        } catch (err) {
            console.error('[TokenView Error]:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Convert backend config to ConfigCard format
     * Supports both array and object config formats
     */
    const convertConfigToCards = (config: { title: string; description: string; gradient: string; icon: string; borderColor: string; glowColor: string; }[]): ConfigCard[] => {
        // If config has 'cards' array property
        if (Array.isArray(config)) {
            return config.map((card: unknown, index: number) => {
                if (typeof card !== 'object' || card === null) return null;
                const cardObj = card as Record<string, unknown>;

                return {
                    id: cardObj.id ? String(cardObj.id) : `config-${index}`,
                    title: String(cardObj.title || `Card ${index + 1}`),
                    description: String(
                        cardObj.description || 'Special moment in your celebration'
                    ),
                    icon: String(cardObj.icon || '✨'),
                    gradient: String(
                        cardObj.gradient || 'from-cyan-600 to-blue-600'
                    ),
                    borderColor: String(
                        cardObj.borderColor || 'border-cyan-500/30 hover:border-cyan-400/60'
                    ),
                    glowColor: String(
                        cardObj.glowColor || 'from-cyan-500/30 to-blue-500/20'
                    ),
                    componentTarget: String(
                        cardObj.componentTarget || `component${index + 1}`
                    ),
                } as ConfigCard;
            }).filter((card): card is ConfigCard => card !== null);
        }

        return [];
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
                {configNotFound ? (
                    // Config Not Found State
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-6"
                        >
                            😅
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
                            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                Oops! Not your party
                            </span>
                        </h1>

                        <p className="text-gray-400 text-base sm:text-lg font-light mb-8">
                            Seems like you&apos;re trying to sneak into someone else&apos;s birthday celebration! 🕵️
                        </p>

                        <p className="text-gray-500 text-sm mb-8">
                            The token you provided doesn&apos;t have a birthday party set up yet. Double-check with your friend or get your own invite!
                        </p>

                        {/* Try Again Button */}
                        <motion.button
                            onClick={() => {
                                setToken('');
                                setConfigNotFound(false);
                                setError('');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                        >
                            Try Another Token ↩️
                        </motion.button>

                        {/* Decorative elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="mt-16 text-5xl opacity-20"
                        >
                            🎈
                        </motion.div>
                    </motion.div>
                ) : (
                    // Token Input State
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
                )}
            </div>
        </div>
    );
};

export default TokenView;