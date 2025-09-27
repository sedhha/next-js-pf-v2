'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import mermaid from 'mermaid';

// simple stable hash for id (no randomness)
function hash(str: string) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
    return (h >>> 0).toString(36);
}

// module-scoped flag so we initialize mermaid only once
let MERMAID_READY = false;

export const MermaidDiagram = ({ chart }: { chart: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [svg, setSvg] = useState<string>('');

    // stable id from content
    const id = useMemo(() => `mermaid-${hash(chart.trim())}`, [chart]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        if (!MERMAID_READY) {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'dark',
                themeVariables: {
                    primaryColor: '#10b981',
                    primaryTextColor: '#fff',
                    primaryBorderColor: '#06b6d4',
                    lineColor: '#06b6d4',
                    secondaryColor: '#8b5cf6',
                    tertiaryColor: '#ec4899',
                },
                // prevent auto-processing any stray .mermaid nodes
                securityLevel: 'strict',
            });
            MERMAID_READY = true;
        }

        let cancelled = false;
        (async () => {
            try {
                const { svg: renderedSvg } = await mermaid.render(id, chart);
                if (!cancelled) setSvg(renderedSvg);
            } catch (error: any) {
                if (cancelled) return;
                const msg = error?.message ?? 'Unknown error';
                setSvg(`
          <div class="flex flex-col items-center justify-center p-8 text-center">
            <div class="mb-4">
              <svg class="w-16 h-16 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-red-300 mb-2">Diagram Parsing Failed</h3>
            <p class="text-gray-400 text-sm mb-4 max-w-md">The Mermaid diagram syntax contains errors and cannot be rendered.</p>
            <details class="text-left w-full max-w-2xl">
              <summary class="cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors mb-2 text-sm">View error details</summary>
              <pre class="bg-black/60 text-red-300 p-4 rounded-lg text-xs overflow-x-auto border border-red-500/30">${msg}</pre>
            </details>
            <div class="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 max-w-2xl">
              <p class="text-gray-300 text-xs mb-2 font-semibold">Original diagram code:</p>
              <pre class="bg-black/40 text-gray-400 p-3 rounded text-xs overflow-x-auto">${chart}</pre>
            </div>
          </div>
        `);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [mounted, id, chart]);

    // During SSR and the very first client render, we return a stable shell (no inner HTML)
    // This prevents the server having SVG while client starts empty (or vice versa).
    return (
        <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
                ref={containerRef}
                className="mermaid relative bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 overflow-x-auto shadow-2xl"
                // If some extension injects stuff pre-hydration, this avoids React yelling.
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: mounted ? svg : '' }}
            />
        </div>
    );
};
