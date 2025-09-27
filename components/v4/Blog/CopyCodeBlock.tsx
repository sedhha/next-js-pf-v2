'use client';

import { useRef, useState } from 'react';

interface CopyableCodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

export const CopyableCodeBlock = ({ children, className }: CopyableCodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const copyFallback = (text: string) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    };

    const handleCopy = async () => {
        const text = preRef.current?.innerText?.trim() ?? '';
        if (!text) return;

        try {
            // Clipboard API requires HTTPS or localhost
            if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const ok = copyFallback(text);
                if (!ok) throw new Error('Fallback copy failed');
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch (err) {
            console.error('Copy failed:', err);
            // Optional: show a toast or set an error state
        }
    };

    return (
        <div className="group relative mb-6 sm:mb-8 lg:mb-12">
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />

            {/* copy */}
            <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer absolute right-3 top-3 z-20 rounded-md px-2 py-1.5 bg-zinc-800/85 hover:bg-zinc-700/85 border border-zinc-600/60 text-zinc-300 hover:text-emerald-300 transition-colors"
                aria-label="Copy code"
                title={copied ? 'Copied!' : 'Copy'}
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                    </svg>
                )}
            </button>

            {/* code */}
            <pre
                ref={preRef}
                className={`relative overflow-x-auto rounded-2xl border border-zinc-700/60 bg-zinc-950/95 p-4 sm:p-6 text-xs sm:text-sm lg:text-base font-mono shadow-xl transition-all duration-500 group-hover:shadow-emerald-500/30 ${className || ''}`}
            >
                {children}
            </pre>
        </div>
    );
};
