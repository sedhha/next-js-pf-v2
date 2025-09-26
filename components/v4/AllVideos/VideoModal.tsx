'use client';

export function VideoModal({
    isOpen,
    onClose,
    videoId,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
    title: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                aria-label="Close video"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="w-full max-w-6xl mx-auto">
                <div className="relative bg-black/60 backdrop-blur-xl border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    />
                </div>
            </div>

            <div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close modal" />
        </div>
    );
}
