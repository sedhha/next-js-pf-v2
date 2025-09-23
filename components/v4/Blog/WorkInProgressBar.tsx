// Simple Progress Bar Component
export const WorkInProgressBar = () => {
    return (
        <div className="w-full max-w-md mx-auto mb-8 bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚧</span>
                <span className="text-white font-medium">Work in Progress</span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2 mb-3 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full w-[65%] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
            </div>

            <p className="text-sm text-gray-400 text-center">
                Blog section is being enhanced • 65% complete
            </p>
        </div>
    );
};