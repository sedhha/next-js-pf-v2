export const StatsCard = ({
    icon,
    value,
    label,
    color
}: {
    icon: string;
    value: string;
    label: string;
    color: string;
}) => (
    <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 text-center group-hover:transform group-hover:scale-105">
            <div className="text-3xl mb-3">{icon}</div>
            <div className={`text-2xl font-black text-${color} mb-1`}>{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
        </div>
    </div>
);