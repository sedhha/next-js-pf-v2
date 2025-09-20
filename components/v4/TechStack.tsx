import Image from 'next/image';
import { ITechStack } from '@/interfaces/tech-stack';
import techStacksData from '@/constants/cms-constants/tech-stacks.json';

const techStacks = techStacksData as ITechStack[];

type TechCategories = {
    'Core Powers': ITechStack[];
    'Backend Sorcery': ITechStack[];
    'Cloud Mysteries': ITechStack[];
    'Data Alchemy': ITechStack[];
    'Ancient Wisdom': ITechStack[];
    'Forbidden Arts': ITechStack[];
};

const categorizeTeechnologies = (): TechCategories => {
    const categories: TechCategories = {
        'Core Powers': techStacks.filter(tech =>
            ['React JS', 'NEXT JS', 'TypeScript', 'JavaScript', 'HTML | HTML5', 'Cascading Style Sheets (CSS)'].includes(tech.name)
        ),
        'Backend Sorcery': techStacks.filter(tech =>
            ['Python', 'Scala', 'Flask | Fast API', 'Firebase', 'MongoDB'].includes(tech.name)
        ),
        'Cloud Mysteries': techStacks.filter(tech =>
            ['Google Cloud', 'Adobe Experience Manager', 'Contentful CMS'].includes(tech.name)
        ),
        'Data Alchemy': techStacks.filter(tech =>
            ['Tensorflow', 'PyTorch', 'Pandas', 'OpenCV', 'Matlab'].includes(tech.name)
        ),
        'Ancient Wisdom': techStacks.filter(tech =>
            ['Git | Github', 'Microsoft Office', 'Quickbooks', 'UIPath - RPA'].includes(tech.name)
        ),
        'Forbidden Arts': techStacks.filter(tech =>
            !['React JS', 'NEXT JS', 'TypeScript', 'JavaScript', 'HTML | HTML5', 'Cascading Style Sheets (CSS)',
                'Python', 'Scala', 'Flask | Fast API', 'Firebase', 'MongoDB',
                'Google Cloud', 'Adobe Experience Manager', 'Contentful CMS',
                'Tensorflow', 'PyTorch', 'Pandas', 'OpenCV', 'Matlab',
                'Git | Github', 'Microsoft Office', 'Quickbooks', 'UIPath - RPA'].includes(tech.name)
        )
    };

    return categories;
};

const getPowerLevel = (rating: number) => {
    switch (rating) {
        case 5: return { color: 'from-red-400 to-orange-400', shadow: 'shadow-red-500/50', glow: 'bg-red-400/20' };
        case 4: return { color: 'from-purple-400 to-pink-400', shadow: 'shadow-purple-500/50', glow: 'bg-purple-400/20' };
        case 3: return { color: 'from-cyan-400 to-blue-400', shadow: 'shadow-cyan-500/50', glow: 'bg-cyan-400/20' };
        case 2: return { color: 'from-green-400 to-emerald-400', shadow: 'shadow-green-500/50', glow: 'bg-green-400/20' };
        default: return { color: 'from-gray-400 to-gray-500', shadow: 'shadow-gray-500/50', glow: 'bg-gray-400/20' };
    }
};

const TechCard = ({ tech, index }: { tech: ITechStack; index: number }) => {
    const powerLevel = getPowerLevel(tech.rating);

    return (
        <div
            className="group transform transition-all duration-1000 opacity-0 translate-y-8 animate-[fadeInUp_1s_ease-out_forwards] w-[220px] mx-auto"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className={`bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/60 transition-all duration-500 hover:bg-black/90 ${powerLevel.shadow} shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2`}>
                <div className="flex justify-end gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 h-4 rounded-full transition-all duration-300 ${i < tech.rating
                                ? `bg-gradient-to-t ${powerLevel.color} shadow-lg ${powerLevel.shadow} animate-pulse`
                                : 'bg-gray-700/50'
                                }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        />
                    ))}
                </div>

                <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden bg-gray-900/50 border border-gray-700/30">
                    <Image
                        src={`${tech.thumbnail}?w=200&h=200&fit=thumb`}
                        alt={tech.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-125"
                        unoptimized
                    />
                </div>

                <h3 className={`font-bold text-sm text-center text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${powerLevel.color} transition-all duration-300 min-h-[2.5rem] flex items-center justify-center mb-2`}>
                    {tech.name}
                </h3>

                <div className="text-xs text-center">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${powerLevel.color} font-semibold`}>
                        {tech.rating === 5 ? 'PROFICIENT' :
                            tech.rating === 4 ? 'COMFORTABLE' :
                                tech.rating === 3 ? 'FAMILIAR' :
                                    tech.rating === 2 ? 'BASIC' : 'EXPLORING'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CategorySection = ({ title, technologies }: {
    title: string;
    technologies: ITechStack[];
}) => {
    return (
        <div className="mb-16 transform transition-all duration-1000 opacity-0 translate-y-8 animate-[fadeInUp_1.2s_ease-out_forwards]">
            <div className="text-center mb-8 relative">
                <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-400/40 rounded-full shadow-lg shadow-purple-500/20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
                        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50 [animation-delay:0.2s]" />
                    </div>
                    <span className="text-purple-300 font-semibold tracking-wide text-sm uppercase">
                        {title}
                    </span>
                    <div className="w-6 h-0.5 bg-gradient-to-r from-purple-400 via-cyan-400 to-transparent" />
                </div>
            </div>

            {/* Auto-fit grid that centers tracks + centers items */}
            <div
                className="
          grid gap-6 justify-center place-items-center
          grid-cols-[repeat(auto-fit,minmax(220px,max-content))]
        "
            >
                {technologies.map((tech, index) => (
                    <TechCard key={tech.name} tech={tech} index={index} />
                ))}
            </div>
        </div>
    );
};

const TechStack = () => {
    const categories = categorizeTeechnologies();

    return (
        <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />
                <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/40 rounded-full floating-orb blur-sm" />
                <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/60 rounded-full floating-orb blur-sm [animation-delay:1s]" />
                <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-red-400/30 rounded-full floating-orb blur-sm [animation-delay:2s]" />
                <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-green-400/50 rounded-full floating-orb blur-sm [animation-delay:3s]" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400/40 rounded-full floating-orb blur-sm [animation-delay:4s]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(var(--tw-gradient-stops))] from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[radial-gradient(var(--tw-gradient-stops))] from-purple-500/10 via-red-500/5 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent scanning-line" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent scanning-line [animation-delay:2s]" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent scanning-line [animation-delay:4s]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 relative animate-[fadeInUp_1s_ease-out_forwards]">
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/40 rounded-full shadow-lg shadow-cyan-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50 [animation-delay:0.2s]" />
                        </div>
                        <span className="text-cyan-300 font-semibold tracking-wide">
                            DIGITAL ARSENAL
                        </span>
                        <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent" />
                    </div>

                    <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6">
                        <span className="glitch-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-300 hover:from-cyan-400 hover:via-purple-400 hover:to-red-400 transition-all duration-700 transform hover:scale-105 drop-shadow-lg">
                            Tech
                        </span>
                        <br />
                        <span className="glitch-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-red-400 hover:from-white hover:via-cyan-300 hover:to-purple-300 transition-all duration-700 transform hover:scale-105 drop-shadow-lg [animation-delay:0.1s]">
                            Arsenal
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
                        Journey through the digital realm where code meets consciousness. Each technology mastered, each skill forged in the fires of countless deployments.
                    </p>
                </div>

                <div className="space-y-16">
                    {Object.entries(categories).map(([category, technologies], i) => {
                        if (technologies.length === 0) return null;
                        return (
                            <div key={category} style={{ animationDelay: `${i * 200}ms` }}>
                                <CategorySection title={category} technologies={technologies} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
