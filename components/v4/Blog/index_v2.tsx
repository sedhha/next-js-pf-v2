'use client';
import { useState } from 'react';
import { WorkInProgressBar } from '@/components/v4/Blog/WorkInProgressBar';
import { getCategoryTheme } from '@/components/v4/Blog/utils';
import { HeroBlogCard } from './HeroBlogCard';
import { TimelineBlogCard } from './TimelineBlogCard';
import { StatsCard } from './StatsCard';

// Blog data from your JSON
const blogData = {
    mainBlog: {
        mainCategory: 'IoT',
        title: 'Invisible Talking Camera Using Python',
        featuredImage:
            'https://images.ctfassets.net/eowwrv5buqcq/6fBcxSKAVQ3OFbPkdXfZWr/2aeeeeaaa2cfc66c27c03275cf330da7/image.png',
        postDate: '2019-05-05T00:00:00.000+05:30',
        id: '5NCdethgGWdzylLaFMQPIQ',
        categoryID: 'iot',
        excerpt:
            'The Invisible talking camera uses Python OpenCV and pyttsx library in order to calibrate your background based on HSL thresholding.\nIt then performs bit wise operations background subtraction along with minor Gaussian Bluring and smoothening and segmentation to make you invisible in the frame!\nPyTTS is used to talk with your program to give basic inputs like initiating calibration, varying thresholds etc.'
    },
    rankedBlogs: [
        {
            mainCategory: 'IoT',
            title: 'How To Make Your Own Artificial Spider Sense Device?',
            postDate: '2019-05-15T00:00:00.000+05:30',
            id: '6YFNbCpC6LYHhccXdyf4oo',
            categoryID: 'iot',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/7tVFtoXSQB5yqmThMBsYlt/6ef2579858198a151af10c0e91775368/how-to-make-your-own-artificial-spider-sense-device--jw4cozxs.jpeg',
            excerpt:
                'We all have grown up watching cool superhero movies and cartoon series. Every superhero is involved either with some cool super power or super awesome sci-fi tech. Spiderman is one of those. I personally like the character most due to the fact I can relate so many things to him.'
        },
        {
            mainCategory: 'Mechanical',
            title: 'Additive Manufacturing and SolidWorks',
            postDate: '2019-12-25T00:00:00.000+05:30',
            id: '3aLEKtdfPgti7hIgz2PLJo',
            categoryID: 'mechanical',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/2VGZR6l5I1GknOyHUMBuib/cc940b915f8007fad81edc0082df7ec5/thumbnail-additive-manufacturing-and-solidworks.png',
            excerpt:
                "We all know Additive Manufacturing is booming today's industrial sector. With the help of Additive manufacturing, there's now almost no limit to design constraints and material wastage is also reduced by a significant amount."
        },
        {
            mainCategory: 'Life',
            title: 'Dear Best Friend...',
            postDate: '2019-05-30T00:00:00.000+05:30',
            id: 'WrKoeYkBOfWNBXdyp7Wuk',
            categoryID: 'life',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/7u25VSC3DZfhvFyucAH2Wn/b8cd18452cdf91692a5812a79af85a6b/the-garden-or-words-featured-image-jwa531ht.jpeg',
            excerpt:
                'I did stand for you. I understand we all have preferences and sometimes our experiments can go wrong. I know deep inside you were crying hard but then you just smiled and moved out.'
        },
        {
            mainCategory: 'Web Development',
            title: 'Getting Started With HTML and Web Development',
            postDate: '2020-03-22T00:00:00.000+05:30',
            id: '1gFsRM3HHf95pAb9IGuFv7',
            categoryID: 'web-development',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/6ywjAk5sqc4QkjHAQdj0w/24b83c86f814b95920abd06b2c959941/webdev.jpeg',
            excerpt:
                'For a better sense of understanding, take an example of the entire human body. The skeleton of the human body is the HTML part of it. Skeleton is the supporting structure consisting of bones and joints.'
        }
    ],
    relatedBlogs: [
        {
            mainCategory: 'Mobile App Development',
            title: 'Thriller StoryBook App in Flutter',
            postDate: '2019-07-31T00:00:00.000+05:30',
            id: '4YMPrxuotjCLYKKeCYx5bk',
            categoryID: 'mobile-app-development',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/4y55dG7U2XBVd2CmbvgNRK/0522c2a5a8cab09faf92ae218d4bf445/4-1-e1570947245316.jpg'
        },
        {
            mainCategory: 'Automation',
            title: 'UIPath Startup Script on Windows 10 Server',
            postDate: '2023-01-28T00:00:00.000+05:30',
            id: '57ipaNewAcgnAjQsTKOja9',
            categoryID: 'automation',
            featuredImage:
                'https://images.ctfassets.net/eowwrv5buqcq/5JRUplrKPNg1kw0pCCNrDo/92833035562e8892b45d2f1702ca35dd/thumbnail-uipath-setup.png'
        }
    ]
};

// Combine all blogs for the timeline
const allBlogs = [
    blogData.mainBlog,
    ...blogData.rankedBlogs,
    ...blogData.relatedBlogs
];

// Main Blog Component
const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = [
        'All',
        'IoT',
        'Mechanical',
        'Life',
        'Web Development',
        'Mobile App Development',
        'Automation'
    ];

    const filteredBlogs =
        selectedCategory === 'All'
            ? allBlogs.slice(1) // Skip main blog for timeline
            : allBlogs.filter((blog) => blog.mainCategory === selectedCategory);

    return (
        <section className="relative py-20 px-4 bg-black pb-32">
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
                        A collection of musings on technology, consciousness, and the beautiful
                        complexity of existence. Each piece a fragment of understanding in the
                        infinite puzzle of reality.
                    </p>
                </div>

                {/* Work in Progress Bar */}
                <WorkInProgressBar />

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
                                <StatsCard
                                    icon="📝"
                                    value={allBlogs.length.toString()}
                                    label="Total Stories"
                                    color="emerald-400"
                                />
                                <StatsCard icon="🏷️" value="6" label="Categories" color="violet-400" />
                                <StatsCard
                                    icon="📅"
                                    value="2023"
                                    label="Latest Year"
                                    color="cyan-400"
                                />
                                <StatsCard icon="💡" value="∞" label="Ideas" color="purple-400" />
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
                                    const count = allBlogs.filter(
                                        (blog) => blog.mainCategory === category
                                    ).length;
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
                                    &quot;Every blog post is a quantum of thought—collapsing infinite
                                    possibilities into finite words, yet somehow expanding
                                    consciousness.&quot;
                                </blockquote>
                                <div className="text-emerald-400 font-medium mt-4">
                                    — The Digital Philosopher
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
