import { useEffect, useState } from 'react';

export const BlogDate = ({ date }: { date: string }) => {
    const [formatted, setFormatted] = useState('');

    useEffect(() => {
        setFormatted(new Date(date).toDateString());
    }, [date]);

    return <span>{formatted}</span>;
};
