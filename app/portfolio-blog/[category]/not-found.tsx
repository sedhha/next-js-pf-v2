import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background - V4 Style */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-purple-400/60 rounded-full animate-bounce delay-0 shadow-lg shadow-purple-400/30" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-400/80 rounded-full animate-bounce delay-500 shadow-lg shadow-pink-400/30" />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-indigo-400/70 rounded-full animate-bounce delay-1000 shadow-lg shadow-indigo-400/30" />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-purple-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-pink-500/15 via-pink-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-pulse">
            404
          </div>
        </div>

        {/* Creative Message */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Hmm... This Category Seems to Be
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Lost in Space
            </span>
          </h1>
          
          <div className="text-xl text-gray-300 leading-relaxed mb-6">
            🚀 This blog category must have drifted off to explore other galaxies...
          </div>
          
          <div className="text-lg text-gray-400 mb-8">
            But hey, there are tons of other fascinating topics to discover!
          </div>
        </div>

        {/* Suggestion Box */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 text-lg">💡 Suggestion:</h3>
          <p className="text-gray-300">
            Try browsing our available categories: IoT, Mechanical, Life, Web Development, Mobile Apps, or Automation. 
            Each one is packed with interesting insights and projects!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Back to Blog Home */}
          <Link 
            href="/portfolio-blog"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Browse All Categories
          </Link>

          {/* Popular Category */}
          <Link 
            href="/portfolio-blogs/web-development"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-black/40 backdrop-blur-sm border border-gray-700 text-white font-medium hover:bg-black/60 hover:border-gray-600 transition-all duration-300"
          >
            <span>💻</span>
            Web Development
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Light-hearted Footer */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            🔍 Maybe this category is just really good at hide and seek...
          </p>
        </div>
      </div>
    </div>
  );
}