'use client';
import Image from 'next/image';
import { useState } from 'react';

// Blog data from your JSON
const blogData = {
    "mainBlog": {
        "mainCategory": "IoT",
        "title": "Invisible Talking Camera Using Python",
        "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/6fBcxSKAVQ3OFbPkdXfZWr/2aeeeeaaa2cfc66c27c03275cf330da7/image.png",
        "postDate": "2019-05-05T00:00:00.000+05:30",
        "id": "5NCdethgGWdzylLaFMQPIQ",
        "categoryID": "iot",
        "excerpt": "The Invisible talking camera uses Python OpenCV and pyttsx library in order to calibrate your background based on HSL thresholding.\nIt then performs bit wise operations background subtraction along with minor Gaussian Bluring and smoothening and segmentation to make you invisible in the frame!\nPyTTS is used to talk with your program to give basic inputs like initiating calibration, varying thresholds etc."
    },
    "rankedBlogs": [
        {
            "mainCategory": "IoT",
            "title": "How To Make Your Own Artificial Spider Sense Device?",
            "postDate": "2019-05-15T00:00:00.000+05:30",
            "id": "6YFNbCpC6LYHhccXdyf4oo",
            "categoryID": "iot",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/7tVFtoXSQB5yqmThMBsYlt/6ef2579858198a151af10c0e91775368/how-to-make-your-own-artificial-spider-sense-device--jw4cozxs.jpeg",
            "excerpt": "We all have grown up watching cool superhero movies and cartoon series. Every superhero is involved either with some cool super power or super awesome sci-fi tech. Spiderman is one of those. I personally like the character most due to the fact I can relate so many things to him."
        },
        {
            "mainCategory": "Mechanical",
            "title": "Additive Manufacturing and SolidWorks",
            "postDate": "2019-12-25T00:00:00.000+05:30",
            "id": "3aLEKtdfPgti7hIgz2PLJo",
            "categoryID": "mechanical",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/2VGZR6l5I1GknOyHUMBuib/cc940b915f8007fad81edc0082df7ec5/thumbnail-additive-manufacturing-and-solidworks.png",
            "excerpt": "We all know Additive Manufacturing is booming today's industrial sector. With the help of Additive manufacturing, there's now almost no limit to design constraints and material wastage is also reduced by a significant amount."
        },
        {
            "mainCategory": "Life",
            "title": "Dear Best Friend...",
            "postDate": "2019-05-30T00:00:00.000+05:30",
            "id": "WrKoeYkBOfWNBXdyp7Wuk",
            "categoryID": "life",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/7u25VSC3DZfhvFyucAH2Wn/b8cd18452cdf91692a5812a79af85a6b/the-garden-or-words-featured-image-jwa531ht.jpeg",
            "excerpt": "I did stand for you. I understand we all have preferences and sometimes our experiments can go wrong. I know deep inside you were crying hard but then you just smiled and moved out."
        },
        {
            "mainCategory": "Web Development",
            "title": "Getting Started With HTML and Web Development",
            "postDate": "2020-03-22T00:00:00.000+05:30",
            "id": "1gFsRM3HHf95pAb9IGuFv7",
            "categoryID": "web-development",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/6ywjAk5sqc4QkjHAQdj0w/24b83c86f814b95920abd06b2c959941/webdev.jpeg",
            "excerpt": "For a better sense of understanding, take an example of the entire human body. The skeleton of the human body is the HTML part of it. Skeleton is the supporting structure consisting of bones and joints."
        }
    ],
    "relatedBlogs": [
        {
            "mainCategory": "Mobile App Development",
            "title": "Thriller StoryBook App in Flutter",
            "postDate": "2019-07-31T00:00:00.000+05:30",
            "id": "4YMPrxuotjCLYKKeCYx5bk",
            "categoryID": "mobile-app-development",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/4y55dG7U2XBVd2CmbvgNRK/0522c2a5a8cab09faf92ae218d4bf445/4-1-e1570947245316.jpg"
        },
        {
            "mainCategory": "Automation",
            "title": "UIPath Startup Script on Windows 10 Server",
            "postDate": "2023-01-28T00:00:00.000+05:30",
            "id": "57ipaNewAcgnAjQsTKOja9",
            "categoryID": "automation",
            "featuredImage": "https://images.ctfassets.net/eowwrv5buqcq/5JRUplrKPNg1kw0pCCNrDo/92833035562e8892b45d2f1702ca35dd/thumbnail-uipath-setup.png"
        }
    ]
};

// Combine all blogs for the timeline
const allBlogs = [blogData.mainBlog, ...blogData.rankedBlogs, ...blogData.relatedBlogs];

// Blog date formatter component - Fixed for SSR with UTC
const BlogDate = ({ date }: { date: string }) => {
    const dateObj = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = `${months[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}`;
    return <span className="text-sm text-gray-400">{formatted}</span>;
};

// Enhanced category color mapping with multiple properties
const getCategoryTheme = (category: string) => {
    const themes: { [key: string]: { primary: string, secondary: string, bg: string, border: string, gradient: string, icon: string } } = {
        'IoT': {
            primary: 'emerald-400',
            secondary: 'emerald-300',
            bg: 'emerald-500/10',
            border: 'emerald-500/30',
            gradient: 'from-emerald-400 to-cyan-400',
            icon: '🔌'
        },
        'Mechanical': {
            primary: 'blue-400',
            secondary: 'blue-300',
            bg: 'blue-500/10',
            border: 'blue-500/30',
            gradient: 'from-blue-400 to-indigo-400',
            icon: '⚙️'
        },
        'Life': {
            primary: 'rose-400',
            secondary: 'rose-300',
            bg: 'rose-500/10',
            border: 'rose-500/30',
            gradient: 'from-rose-400 to-pink-400',
            icon: '💭'
        },
        'Web Development': {
            primary: 'violet-400',
            secondary: 'violet-300',
            bg: 'violet-500/10',
            border: 'violet-500/30',
            gradient: 'from-violet-400 to-purple-400',
            icon: '💻'
        },
        'Mobile App Development': {
            primary: 'cyan-400',
            secondary: 'cyan-300',
            bg: 'cyan-500/10',
            border: 'cyan-500/30',
            gradient: 'from-cyan-400 to-teal-400',
            icon: '📱'
        },
        'Automation': {
            primary: 'orange-400',
            secondary: 'orange-300',
            bg: 'orange-500/10',
            border: 'orange-500/30',
            gradient: 'from-orange-400 to-yellow-400',
            icon: '🤖'
        }
    };
    return themes[category] || {
        primary: 'gray-400', secondary: 'gray-300', bg: 'gray-500/10',
        border: 'gray-500/30', gradient: 'from-gray-400 to-gray-500', icon: '📝'
    };
};

// Hero Blog Card - Large featured story
const HeroBlogCard = ({ blog }: { blog: typeof allBlogs[number] }) => {
    const theme = getCategoryTheme(blog.mainCategory);

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-700">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={blog.featuredImage || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700`}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
                {/* Featured Badge */}
                <div className="absolute top-8 left-8">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-xl">{theme.icon}</span>
                        <span className="text-white font-medium text-sm">Featured Story</span>
                    </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-${theme.bg} text-${theme.secondary} border border-${theme.border} backdrop-blur-sm`}>
                        {blog.mainCategory}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors duration-500">
                    {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                    {'excerpt' in blog && typeof blog.excerpt === 'string' ? blog.excerpt.split('\n')[0] : 'No excerpt available'}
                </p>

                {/* Meta and CTA */}
                <div className="flex items-center justify-between">
                    <BlogDate date={blog.postDate} />
                    <button className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${theme.gradient} text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}>
                        Read Story
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Timeline Blog Card - Smaller story cards
const TimelineBlogCard = ({ blog, index }: { blog: typeof allBlogs[number]; index: number }) => {
    const theme = getCategoryTheme(blog.mainCategory);

    return (
        <div className="group relative">
            {/* Timeline connector */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"></div>

            {/* Timeline dot */}
            <div className={`absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient} border-2 border-black z-10 group-hover:scale-125 transition-transform duration-300`}></div>

            {/* Card */}
            <div className="ml-16 mb-8">
                <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:bg-black/50 hover:border-gray-700/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={blog.featuredImage || '/placeholder-blog.jpg'}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="64px"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg">{theme.icon}</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${theme.bg} text-${theme.secondary}`}>
                                    {blog.mainCategory}
                                </span>
                                <span className="text-xs text-gray-500">#{index + 2}</span>
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300">
                                {blog.title}
                            </h3>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {'excerpt' in blog && typeof blog.excerpt === 'string' ? blog.excerpt.split('\n')[0] : 'No excerpt available'}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <BlogDate date={blog.postDate} />
                        <button className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm font-medium cursor-pointer">
                            Read more →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatsCard = ({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) => (
    <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 text-center group-hover:transform group-hover:scale-105">
            <div className="text-3xl mb-3">{icon}</div>
            <div className={`text-2xl font-black text-${color} mb-1`}>{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
        </div>
    </div>
);

// Main Blog Component
const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'IoT', 'Mechanical', 'Life', 'Web Development', 'Mobile App Development', 'Automation'];

    const filteredBlogs = selectedCategory === 'All'
        ? allBlogs.slice(1) // Skip main blog for timeline
        : allBlogs.filter(blog => blog.mainCategory === selectedCategory);

    return (
        <section className="relative py-20 px-4 bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-violet-500/20 to-purple-500/10 blur-3xl animate-pulse [animation-delay:1s]"></div>
                <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 blur-3xl animate-pulse [animation-delay:3s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-rose-500/5 to-transparent blur-2xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-violet-500/20 mb-6">
                        <span className="text-2xl">🧠</span>
                        <span className="text-violet-300 font-medium">Mind Explorations</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6">
                        <span className="bg-gradient-to-r from-violet-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            Thoughts & Ideas
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        A collection of musings on technology, consciousness, and the beautiful complexity of existence.
                        Each piece a fragment of understanding in the infinite puzzle of reality.
                    </p>
                </div>

                {/* Hero Featured Story */}
                <div className="mb-20">
                    <HeroBlogCard blog={blogData.mainBlog} />
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${selectedCategory === category
                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                                : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                                }`}
                        >
                            {category === 'All' && '🌟'} {category}
                        </button>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Timeline Stories - 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
                                <span className="text-black font-bold text-lg">⚡</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Story Timeline</h3>
                                <p className="text-gray-400">Chronological journey through ideas</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {filteredBlogs.map((blog, index) => (
                                <TimelineBlogCard key={blog.id} blog={blog} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-8">
                        {/* Blog Statistics */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="text-2xl">📊</span>
                                Blog Metrics
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <StatsCard icon="📝" value={allBlogs.length.toString()} label="Total Stories" color="emerald-400" />
                                <StatsCard icon="🏷️" value="6" label="Categories" color="violet-400" />
                                <StatsCard icon="📅" value="2023" label="Latest Year" color="cyan-400" />
                                <StatsCard icon="💡" value="∞" label="Ideas" color="rose-400" />
                            </div>
                        </div>

                        {/* Quick Access */}
                        <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-gradient-to-r from-violet-500 to-emerald-500"></span>
                                Quick Access
                            </h3>

                            <div className="space-y-3">
                                {categories.slice(1, 4).map((category) => {
                                    const theme = getCategoryTheme(category);
                                    const count = allBlogs.filter(blog => blog.mainCategory === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{theme.icon}</span>
                                                <span className="text-white font-medium">{category}</span>
                                            </div>
                                            <span className={`text-${theme.secondary} font-bold`}>{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Philosophy Quote */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center">
                                <div className="text-4xl mb-4">💭</div>
                                <blockquote className="text-gray-300 italic leading-relaxed">
                                    &quot;Every blog post is a quantum of thought—collapsing infinite possibilities into finite words, yet somehow expanding consciousness.&quot;
                                </blockquote>
                                <div className="text-emerald-400 font-medium mt-4">— The Digital Philosopher</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;