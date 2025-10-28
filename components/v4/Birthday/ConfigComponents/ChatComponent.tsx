'use client';
import { useState, useRef, useEffect } from 'react';
import { useBirthdayStore } from '@/lib/stores/birthdayStore';

const ChatWindow: React.FC = (): React.ReactElement => {
    const { birthdayToken } = useBirthdayStore();
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load chat history on mount
    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                if (!birthdayToken) return;

                const response = await fetch('/apis/v2/birthday/chat', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${birthdayToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.messages || []);
                }
            } catch (error) {
                console.error('Failed to load chat history:', error);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        loadChatHistory();
    }, [birthdayToken]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !birthdayToken || isLoading) return;

        // Add user message to chat
        const userMessage = inputValue.trim();
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/apis/v2/birthday/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${birthdayToken}`,
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            // Add assistant message placeholder
            let assistantMessage = '';
            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            // Stream the response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);

                        if (data === '[DONE]') {
                            setIsLoading(false);
                            continue;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.chunk) {
                                assistantMessage += parsed.chunk;
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        role: 'assistant',
                                        content: assistantMessage,
                                    };
                                    return updated;
                                });
                            }
                        } catch {
                            // Ignore parse errors
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Sorry, something went wrong. Please try again.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (isLoadingHistory) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm">Loading chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black p-4">
            <div className="flex flex-col bg-black text-white h-full w-full md:w-[70%] lg:w-[65%] rounded-lg border border-gray-700">
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                    Hey there! 👋
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    Nothing here yet. Start a conversation with Shivam...
                                </p>
                            </div>
                            <div className="text-gray-600 text-sm">
                                Ask me anything, share what&apos;s on your mind 💭
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user'
                                            ? 'bg-cyan-600 text-white'
                                            : 'bg-gray-800 text-gray-100'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="border-t border-gray-700 p-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            disabled={isLoading}
                            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;