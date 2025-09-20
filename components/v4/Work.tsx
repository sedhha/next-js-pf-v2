import Image from 'next/image';

// Static work experience data with a 4th card added
const workExperience = [
    {
        id: '1',
        org: 'ThoughtGenesis',
        designation: 'Senior Software Engineer',
        startDate: 1699986600000,
        current: true,
        img: 'https://images.ctfassets.net/eowwrv5buqcq/1xb9H5lExwcaL13gUhnoS3/30e19fa82c2273dcb3ad7429e42ebe64/tg_logo.png',
        description: 'Working as a Scala Developer for Apple Maps team, I am working on multiple Scala and Java based microservices. These services involve interaction with Big Data using Spark, CI/CD pipelines, and managing binary blob storage and retrieval services at scale.',
        technologies: ['Scala', 'Java', 'Apache Spark', 'Big Data', 'CI/CD', 'Microservices']
    },
    {
        id: '2',
        org: 'Optum Inc, UnitedHealth Group',
        designation: 'Software Engineer',
        startDate: 1637433000000,
        endDate: 1699986600000,
        img: 'https://images.ctfassets.net/eowwrv5buqcq/79FlZqqOkBsll0fhhvlL7J/07835697b44e303b45d1111007c42dda/we-uhg.jpg',
        description: 'Working as a Software Engineer, I have majorly been involved in making end to end applications using React and Scala as a backend service. Building microservices and creating CI/CD workflow pipeline.',
        technologies: ['React', 'Scala', 'Microservices', 'CI/CD', 'Full Stack']
    },
    {
        id: '3',
        org: 'Yoptima Media Pvt. Ltd',
        designation: 'Software Engineer',
        startDate: 1578853800000,
        endDate: 1635618600000,
        img: 'https://images.ctfassets.net/eowwrv5buqcq/6SJfeAoPI2n8Epy2Aztb5V/d7ab5da1e486b42ce6a15b1bb0edc19f/we-yoptima.png',
        description: 'My major focus was upon building scalable applications, analytics web dashboards and automated alert chat-bots. Built AdCampaign Automation tools for digital marketing optimization.',
        technologies: ['JavaScript', 'Analytics', 'Chatbots', 'Marketing', 'Automation']
    },
    {
        id: '4',
        org: 'Freelance Projects',
        designation: 'Full Stack Developer',
        startDate: 1546300200000,
        endDate: 1578853800000,
        img: 'https://images.ctfassets.net/eowwrv5buqcq/1xb9H5lExwcaL13gUhnoS3/30e19fa82c2273dcb3ad7429e42ebe64/tg_logo.png', // placeholder
        description: 'Developed various web applications and mobile solutions for small businesses. Focused on modern tech stacks and responsive design patterns.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Mobile Apps']
    }
];

// Simple date formatter - Fixed for SSR hydration using UTC
function formatDate(timestamp: number, endTimestamp?: number, isCurrent?: boolean) {
    const formatDateSafely = (ts: number) => {
        const date = new Date(ts);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Use UTC methods to ensure consistent rendering across timezones
        return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
    };

    const start = formatDateSafely(timestamp);

    if (isCurrent) {
        return `${start} - Present`;
    }

    if (endTimestamp) {
        const end = formatDateSafely(endTimestamp);
        return `${start} - ${end}`;
    }

    return start;
}

// Work Card Component - Optimized for 4 cards in a row
function WorkCard({ work }: { work: typeof workExperience[0] }) {
    return (
        <div className="group relative bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-all duration-500 hover:bg-black/60 h-full">
            {/* Company Logo */}
            <div className="relative w-16 h-16 mb-4 rounded-lg overflow-hidden bg-gray-800/50">
                <Image
                    src={work.img}
                    alt={`${work.org} logo`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="64px"
                />
            </div>

            {/* Content */}
            <div className="space-y-3">
                {/* Company & Role */}
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 line-clamp-1">
                        {work.org}
                    </h3>
                    <h4 className="text-sm font-medium text-gray-300 mt-1 line-clamp-2">
                        {work.designation}
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">
                        {formatDate(work.startDate, work.endDate, work.current)}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                        {work.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                    {work.technologies.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {work.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full">
                            +{work.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
    );
}

// Dynamic stats calculation
function calculateStats(workData: typeof workExperience) {
    const companies = workData.length;
    const currentRoles = workData.filter(work => work.current).length;

    // Calculate total years of experience
    const totalYearsExperience = workData.reduce((total, work) => {
        const startDate = new Date(work.startDate);
        const endDate = work.endDate ? new Date(work.endDate) : new Date();
        const yearsAtCompany = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return total + yearsAtCompany;
    }, 0);

    // Get unique technologies across all experiences
    const allTechnologies = workData.reduce((techSet, work) => {
        work.technologies.forEach(tech => techSet.add(tech));
        return techSet;
    }, new Set<string>());

    return {
        companies,
        currentRoles,
        yearsExperience: Math.floor(totalYearsExperience),
        technologies: allTechnologies.size
    };
}

// Main Work Component
export default function Work() {
    const stats = calculateStats(workExperience);
    return (
        <section className="relative py-20 px-4 bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                        <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                            Work Experience
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        A journey through different organizations, building impactful solutions and growing as a developer.
                    </p>
                </div>

                {/* Work Grid - 4 cards in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {workExperience.map((work) => (
                        <WorkCard key={work.id} work={work} />
                    ))}
                </div>

                {/* Stats Section - Dynamic calculations */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-300 mb-2">
                            {stats.companies}
                        </div>
                        <p className="text-gray-400">Companies</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-300 mb-2">
                            {stats.currentRoles}
                        </div>
                        <p className="text-gray-400">Current Role{stats.currentRoles !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-violet-300 mb-2">
                            {stats.yearsExperience}+
                        </div>
                        <p className="text-gray-400">Years Experience</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-rose-300 mb-2">
                            {stats.technologies}+
                        </div>
                        <p className="text-gray-400">Technologies</p>
                    </div>
                </div>
            </div>
        </section>
    );
}