'use client';

import { useState } from 'react';

interface Credential {
    key: string;
    value: string;
}

export default function CredentialsPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const authenticate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `/apis/v2/personal/credentials?password=${encodeURIComponent(password)}`
            );

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Invalid password');
                } else {
                    setError('Failed to authenticate');
                }
                setLoading(false);
                return;
            }

            const data = await response.json();
            setIsAuthenticated(true);

            // Convert object to array of credentials
            const credArray = Object.entries(data.data || {}).map(([key, value]) => ({
                key,
                value: value as string
            }));
            setCredentials(credArray);
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCredential = () => {
        setCredentials([...credentials, { key: '', value: '' }]);
    };

    const handleRemoveCredential = (index: number) => {
        setCredentials(credentials.filter((_, i) => i !== index));
    };

    const handleUpdateKey = (index: number, newKey: string) => {
        const updated = [...credentials];
        updated[index].key = newKey;
        setCredentials(updated);
    };

    const handleUpdateValue = (index: number, newValue: string) => {
        const updated = [...credentials];
        updated[index].value = newValue;
        setCredentials(updated);
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Convert array back to object
            const credObject: Record<string, string> = {};
            for (const cred of credentials) {
                if (cred.key.trim()) {
                    credObject[cred.key.trim()] = cred.value;
                }
            }

            const response = await fetch('/apis/v2/personal/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    credentials: credObject
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to save credentials');
                setLoading(false);
                return;
            }

            setSuccess('Credentials saved successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to save credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        if (
            !confirm(
                'Are you sure you want to delete ALL credentials? This cannot be undone.'
            )
        ) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(
                `/apis/v2/personal/credentials?password=${encodeURIComponent(password)}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to delete credentials');
                setLoading(false);
                return;
            }

            setCredentials([]);
            setSuccess('All credentials deleted successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to delete credentials');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center p-4">
                {/* Dynamic Background - matching Intro.tsx */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient mesh */}
                    <div className="absolute inset-0 opacity-60">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 via-black to-violet-900/20"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-900/15 via-transparent to-rose-900/15"></div>
                    </div>

                    {/* Animated orbs */}
                    <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-l from-violet-500/25 to-purple-500/15 blur-3xl animate-pulse [animation-delay:2s]"></div>
                </div>

                <div className="relative z-10 bg-black/70 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
                            <svg
                                className="w-8 h-8 text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            Credentials Manager
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Enter admin password to continue
                        </p>
                    </div>

                    <form onSubmit={authenticate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Admin Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition text-white placeholder-gray-500"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Authenticating...
                                </>
                            ) : (
                                'Unlock'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-black p-4">
            {/* Dynamic Background - matching Intro.tsx */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient mesh */}
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 via-black to-violet-900/20"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-900/15 via-transparent to-rose-900/15"></div>
                </div>

                {/* Animated orbs */}
                <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-l from-violet-500/25 to-purple-500/15 blur-3xl animate-pulse [animation-delay:2s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 blur-3xl animate-pulse [animation-delay:4s]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="bg-black/70 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                                Environment Credentials
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Manage your environment variables stored in Supabase cache
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setIsAuthenticated(false);
                                setPassword('');
                                setCredentials([]);
                            }}
                            className="text-gray-400 hover:text-emerald-400 transition cursor-pointer"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-4">
                            {success}
                        </div>
                    )}

                    <div className="space-y-4 mb-6">
                        {credentials.map((cred, index) => (
                            <div
                                key={index}
                                className="flex gap-3 items-start p-4 bg-black/50 rounded-lg border border-gray-700/50 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="text"
                                        value={cred.key}
                                        onChange={(e) => handleUpdateKey(index, e.target.value)}
                                        placeholder="KEY_NAME"
                                        className="w-full px-3 py-2 bg-black/50 border border-gray-600/50 rounded font-mono text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none text-white placeholder-gray-500"
                                    />
                                    <input
                                        type="text"
                                        value={cred.value}
                                        onChange={(e) => handleUpdateValue(index, e.target.value)}
                                        placeholder="value"
                                        className="w-full px-3 py-2 bg-black/50 border border-gray-600/50 rounded font-mono text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none text-white placeholder-gray-500"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveCredential(index)}
                                    className="mt-1 p-2 text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer"
                                    title="Remove"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={handleAddCredential}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition font-semibold cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Credential
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg transition font-semibold cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Save Changes
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleDeleteAll}
                            disabled={loading || credentials.length === 0}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg transition font-semibold ml-auto cursor-pointer disabled:cursor-not-allowed"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Delete All
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <div className="flex gap-3">
                            <svg
                                className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-sm text-cyan-300">
                                <p className="font-semibold mb-1">How it works:</p>
                                <ul className="list-disc list-inside space-y-1 text-cyan-400">
                                    <li>
                                        Credentials are stored as base64-encoded JSON in Supabase
                                        cache table
                                    </li>
                                    <li>
                                        They override process.env values when loaded (first API call
                                        only)
                                    </li>
                                    <li>Cached in memory - no repeated database calls</li>
                                    <li>Server restart required to clear in-memory cache</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
