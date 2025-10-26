'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { useBirthdayStore, ChatMessage } from '@/lib/stores/birthdayStore';
import { Send, Zap } from 'lucide-react';

// Better image URLs that actually load
const IMAGE_URLS = [
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
];

// Dummy chat data - 500 messages total (alternating AI and user)
const generateDummyMessages = (): ChatMessage[] => {
    const messages: ChatMessage[] = [];

    for (let i = 0; i < 500; i++) {
        const isAI = i % 2 === 0; // Alternate between AI and user messages
        messages.push({
            id: `msg-${i}`,
            text: isAI
                ? `Message ${i + 1}\n\nThis is a beautiful message with some **bold text** and *italics*. This is message number ${i + 1} in our conversation.`
                : `That's awesome! I really enjoyed this experience.`,
            next_actions: isAI
                ? [
                    { title: 'Tell me more', prompt: `Tell me more about message ${i + 1}` },
                    { title: 'Explore', prompt: `Explore further on message ${i + 1}` },
                ]
                : [],
            img:
                isAI && i % 5 === 0
                    ? [
                        {
                            url: IMAGE_URLS[i % IMAGE_URLS.length],
                            text: `Memory ${i + 1}`,
                        },
                    ]
                    : [],
            timestamp: Date.now() - (500 - i) * 60000,
        });
    }

    return messages;
};

const Component1: React.FC = (): React.ReactElement => {
    const {
        currentMessagePage,
        setCurrentMessagePage,
        setTotalMessages,
        messagesPerPage,
    } = useBirthdayStore();

    const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
    const [isLoadingTop, setIsLoadingTop] = useState(false);
    const [isLoadingBottom, setIsLoadingBottom] = useState(false);
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);
    const bottomSentinelRef = useRef<HTMLDivElement>(null);
    const allMessagesRef = useRef<ChatMessage[]>([]);

    // Initialize messages on mount
    useEffect(() => {
        const allMessages = generateDummyMessages();
        allMessagesRef.current = allMessages;
        setTotalMessages(allMessages.length);

        // Load first page (start from end)
        const startIdx = Math.max(0, allMessages.length - messagesPerPage);
        const firstPage = allMessages.slice(startIdx, startIdx + messagesPerPage);
        setDisplayedMessages(firstPage);
        setCurrentMessagePage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Load more messages from top (older messages)
    const loadMoreTop = useCallback(() => {
        if (isLoadingTop || currentMessagePage === 0) return;

        setIsLoadingTop(true);

        setTimeout(() => {
            const newPage = currentMessagePage - 1;
            const allMessages = allMessagesRef.current;
            const totalMessages = allMessages.length;
            const startIdx = Math.max(0, totalMessages - (newPage + 2) * messagesPerPage);
            const endIdx = startIdx + messagesPerPage;

            const newMessages = allMessages.slice(startIdx, endIdx);

            setDisplayedMessages((prev) => [...newMessages, ...prev]);
            setCurrentMessagePage(newPage);
            setIsLoadingTop(false);
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMessagePage, messagesPerPage, isLoadingTop]);

    // Load more messages from bottom (newer messages)
    const loadMoreBottom = useCallback(() => {
        if (isLoadingBottom) return;

        const allMessages = allMessagesRef.current;
        const totalMessages = allMessages.length;
        const nextStartIdx = (currentMessagePage + 1) * messagesPerPage;

        if (nextStartIdx >= totalMessages) return;

        setIsLoadingBottom(true);

        setTimeout(() => {
            const startIdx = nextStartIdx;
            const endIdx = Math.min(startIdx + messagesPerPage, totalMessages);

            const newMessages = allMessages.slice(startIdx, endIdx);

            setDisplayedMessages((prev) => [...prev, ...newMessages]);
            setCurrentMessagePage(currentMessagePage + 1);
            setIsLoadingBottom(false);
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMessagePage, messagesPerPage, isLoadingBottom]);

    // Intersection Observer for pagination
    useEffect(() => {
        const observerOptions = {
            root: messageContainerRef.current,
            rootMargin: '100px',
            threshold: 0.1,
        };

        const topObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreTop();
                }
            });
        }, observerOptions);

        const bottomObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreBottom();
                }
            });
        }, observerOptions);

        if (topSentinelRef.current) topObserver.observe(topSentinelRef.current);
        if (bottomSentinelRef.current)
            bottomObserver.observe(bottomSentinelRef.current);

        return () => {
            topObserver.disconnect();
            bottomObserver.disconnect();
        };
    }, [loadMoreTop, loadMoreBottom]);

    // Handle image load errors
    const handleImageError = useCallback((url: string) => {
        setFailedImages((prev) => new Set([...prev, url]));
    }, []);

    // Check if message is last
    const isLastMessage = useCallback(
        (idx: number) => {
            return idx === displayedMessages.length - 1;
        },
        [displayedMessages]
    );

    // Handle action click
    const handleActionClick = useCallback((prompt: string) => {
        setInputValue(prompt);
        setShowSuggestions(false);
    }, []);

    // Handle send message
    const handleSendMessage = useCallback(() => {
        if (!inputValue.trim()) return;

        // Here you would typically send the message
        console.log('Sending message:', inputValue);

        // Clear input
        setInputValue('');
        setShowSuggestions(true);
    }, [inputValue]);

    return (
        <div className="flex flex-col h-screen bg-black overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-600/10 via-transparent to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Messages Area */}
                <div
                    ref={messageContainerRef}
                    className="flex-1 overflow-y-auto"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(6, 182, 212, 0.3) transparent',
                    }}
                >
                    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 space-y-4">
                        {/* Top Sentinel */}
                        <div ref={topSentinelRef} className="h-1" />

                        {/* Loading indicator - Top */}
                        {isLoadingTop && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center py-4"
                            >
                                <div className="flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-violet-400"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{
                                                duration: 0.6,
                                                delay: i * 0.1,
                                                repeat: Infinity,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Messages */}
                        {displayedMessages.map((message, idx) => {
                            const isAI = idx % 2 === 0;

                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className={`flex ${isAI ? 'justify-start' : 'justify-end'} group`}
                                >
                                    <div className={`max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto'}`}>
                                        {/* Message Images */}
                                        {message.img && message.img.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="mb-3"
                                            >
                                                <div className="grid grid-cols-2 gap-2">
                                                    {message.img.map((img, imgIdx) => {
                                                        if (failedImages.has(img.url)) return null;

                                                        return (
                                                            <motion.div
                                                                key={imgIdx}
                                                                whileHover={{ scale: 1.03 }}
                                                                className="relative group/image cursor-pointer"
                                                            >
                                                                {/* Neon glow effect wrapper */}
                                                                <div className="relative rounded-xl overflow-hidden">
                                                                    {/* Animated neon border on hover */}
                                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 blur-sm group-hover/image:animate-pulse" />

                                                                    {/* Outer glow */}
                                                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-violet-500/30 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 blur-md" />

                                                                    {/* Image container */}
                                                                    <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 group-hover/image:border-cyan-400/60 transition-all duration-300">
                                                                        <Image
                                                                            src={img.url}
                                                                            alt={img.text}
                                                                            width={200}
                                                                            height={150}
                                                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover/image:scale-105"
                                                                            onError={() => handleImageError(img.url)}
                                                                        />

                                                                        {/* Shimmer effect on hover */}
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/image:opacity-100 group-hover/image:animate-shimmer transition-opacity duration-300" />

                                                                        {/* Image overlay text */}
                                                                        {img.text && (
                                                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2">
                                                                                <p className="text-xs text-gray-200 font-medium">
                                                                                    {img.text}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Message Bubble with Enhanced Neon Glow */}
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            className="relative group/message"
                                        >
                                            {/* Animated neon glow on hover */}
                                            <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover/message:opacity-100 transition-opacity duration-500 blur ${isAI
                                                    ? 'bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-violet-500/40'
                                                    : 'bg-gradient-to-r from-violet-500/40 via-pink-500/40 to-cyan-500/40'
                                                }`} />

                                            {/* Outer pulsing glow */}
                                            <motion.div
                                                className={`absolute -inset-2 rounded-2xl opacity-0 group-hover/message:opacity-100 transition-opacity duration-500 blur-xl ${isAI
                                                        ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20'
                                                        : 'bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-cyan-500/20'
                                                    }`}
                                                animate={{
                                                    scale: [1, 1.05, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            />

                                            {/* Message bubble */}
                                            <div
                                                className={`relative rounded-2xl px-4 py-3 backdrop-blur-sm transition-all duration-300 ${isAI
                                                        ? 'bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-cyan-500/30 group-hover/message:border-cyan-400/60 group-hover/message:shadow-lg group-hover/message:shadow-cyan-500/20'
                                                        : 'bg-gradient-to-br from-violet-900/50 via-violet-800/40 to-violet-900/50 border border-violet-500/30 group-hover/message:border-violet-400/60 group-hover/message:shadow-lg group-hover/message:shadow-violet-500/20'
                                                    }`}
                                            >
                                                {/* Inner shine effect */}
                                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover/message:opacity-100 transition-opacity duration-500 ${isAI
                                                        ? 'bg-gradient-to-br from-cyan-500/5 to-transparent'
                                                        : 'bg-gradient-to-br from-violet-500/5 to-transparent'
                                                    }`} />

                                                {/* Message content */}
                                                <div className="relative z-10">
                                                    <div className={`text-sm leading-relaxed ${isAI ? 'text-gray-100' : 'text-gray-200'
                                                        }`}>
                                                        <ReactMarkdown
                                                            components={{
                                                                p: ({ ...props }) => (
                                                                    <div className="mb-2 last:mb-0">
                                                                        <p {...props} />
                                                                    </div>
                                                                ),
                                                                strong: ({ ...props }) => (
                                                                    <span className="font-semibold text-cyan-300">
                                                                        <strong {...props} />
                                                                    </span>
                                                                ),
                                                                em: ({ ...props }) => (
                                                                    <span className="text-violet-300 italic">
                                                                        <em {...props} />
                                                                    </span>
                                                                ),
                                                            }}
                                                        >
                                                            {message.text}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Quick Actions - Only for last AI message */}
                                        {isAI && isLastMessage(idx) && message.next_actions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                                className="flex flex-wrap gap-2 pt-2"
                                            >
                                                {message.next_actions.map((action, actionIdx) => (
                                                    <motion.button
                                                        key={actionIdx}
                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            delay: 0.25 + actionIdx * 0.08,
                                                            duration: 0.2,
                                                        }}
                                                        onClick={() => handleActionClick(action.prompt)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600/20 border border-cyan-500/60 text-cyan-200 text-xs font-medium hover:bg-cyan-600/30 hover:border-cyan-400/80 transition-all duration-200 group"
                                                    >
                                                        <Zap className="w-3 h-3 group-hover:animate-pulse" />
                                                        <span>{action.title}</span>
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Loading indicator - Bottom */}
                        {isLoadingBottom && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center py-4"
                            >
                                <div className="flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-violet-400"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{
                                                duration: 0.6,
                                                delay: i * 0.1,
                                                repeat: Infinity,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Bottom Sentinel */}
                        <div ref={bottomSentinelRef} className="h-1" />
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative z-20 bg-black/80 backdrop-blur-md border-t border-cyan-500/20 flex-shrink-0"
            >
                <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-4 space-y-3">
                    {/* Quick Suggestions */}
                    {showSuggestions && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-wrap gap-2"
                        >
                            <p className="text-xs text-gray-400 w-full">Quick suggestions:</p>
                            {[
                                { emoji: '😊', text: 'That sounds amazing!' },
                                { emoji: '🎉', text: 'Lets celebrate!' },
                                { emoji: '💭', text: 'Tell me more' },
                            ].map((suggestion, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.08 }}
                                    onClick={() => handleActionClick(suggestion.text)}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-1.5 rounded-full bg-cyan-600/10 border border-cyan-500/30 text-gray-300 text-xs hover:border-cyan-400/60 hover:bg-cyan-600/20 transition-all"
                                >
                                    <span>{suggestion.emoji} {suggestion.text}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* Input Box */}
                    <div className="flex gap-2 items-end w-full">
                        <div className="flex-1 min-w-0 relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setShowSuggestions(e.target.value.length === 0);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Explore with prompt. This is the most honest and true persona of Shivam you can ask anything. 💫"
                                className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 border border-cyan-500/30 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-slate-900/70 transition-all duration-300 resize-none"
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
                        </div>

                        <motion.button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 p-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </motion.button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        Press Enter to send • Shift+Enter for new line
                    </p>
                </div>
            </motion.div>

            {/* Custom styles for shimmer animation */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default Component1;