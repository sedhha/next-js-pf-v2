import { IDateFormatProps } from '../interfaces/fe/dates';
import { throwAndLogError } from './dev-utils';
const monthFunction = [
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
export const getMonthAndYearString = (timeStamp: number) => {
    const month = new Date(timeStamp).getMonth();
    const year = new Date(timeStamp).getFullYear();
    return `${monthFunction[month]}, ${year}`;
};
export const workDateFormatter = ({
    startDate,
    endDate,
    current
}: IDateFormatProps): string => {

    const startMonth = getMonthAndYearString(startDate);
    if (!current) {
        if (endDate) {
            const endMonth = getMonthAndYearString(endDate);
            return `${startMonth} - ${endMonth}`;
        } else {
            throwAndLogError('Neither endDate nor current value provided');
            return '';
        }
    } else return `${startMonth} - Present`;
};

const dayStyler = (day: number): string => {
    switch (day) {
        case 1:
        case 21:
        case 31:
            return `${day}st`;
        case 2:
        case 22:
            return `${day}nd`;
        case 3:
        case 23:
            return `${day}rd`;
        default: return `${day}th`
    }
}


export const stdDateFormatter = (date: string): string => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const day = dt.getDate();
    return `${dayStyler(day)} ${monthFunction[month]}, ${year}`
}