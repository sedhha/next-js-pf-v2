import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background - V4 Style */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400/60 rounded-full animate-bounce delay-0 shadow-lg shadow-emerald-400/30" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce delay-500 shadow-lg shadow-cyan-400/30" />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-purple-400/70 rounded-full animate-bounce delay-1000 shadow-lg shadow-purple-400/30" />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 animate-pulse">
            404
          </div>
        </div>

        {/* Creative Message */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Oops! This Blog Post Has Gone
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Into the Digital Void
            </span>
          </h1>

          <div className="text-xl text-gray-300 leading-relaxed mb-6">
            🕳️ It seems like this blog post decided to take a vacation to another dimension...
          </div>

          <div className="text-lg text-gray-400 mb-8">
            Don&apos;t worry though! There are plenty of other amazing stories waiting for you.
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 text-lg">🤔 Fun Fact:</h3>
          <p className="text-gray-300">
            Did you know that 404 errors are named after Room 404 at CERN where the original web servers were located?
            When files couldn&apos;t be found, they&apos;d say the file was &ldquo;not found in room 404&rdquo;!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Back to Blog */}
          <Link
            href="/portfolio-blogs"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Blogs
          </Link>

          {/* Random Blog */}
          <Link
            href="/portfolio-blogs/iot"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-black/40 backdrop-blur-sm border border-violet-500/30 text-white font-medium hover:bg-black/60 hover:border-violet-400/50 transition-all duration-300"
          >
            <span>🎲</span>
            Explore IoT Posts
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Easter Egg */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            🐛 If you think this is a bug, the developer probably forgot to update the blog links again...
          </p>
          <p className="mt-2">
            ✨ Or maybe this blog post is just playing hide and seek!
          </p>
        </div>
      </div>
    </div>
  );
}