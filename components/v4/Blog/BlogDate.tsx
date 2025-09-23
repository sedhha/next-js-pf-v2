export const BlogDate = ({ date }: { date: string }) => {
    const dateObj = new Date(date);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const formatted = `${months[dateObj.getUTCMonth()]
        } ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}`;
    return <span className="text-sm text-gray-400">{formatted}</span>;
};