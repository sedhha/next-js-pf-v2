import React from 'react';
import classes from './Work.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';
import attributes from '@/constants/header-attr.json';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { println, throwAndLogError } from '@/utils/dev-utils';
import workExperience from '@/constants/cms-constants/work-experience.json';

const limit = 3;
const initialItems = workExperience.slice(0, limit);

interface IDateFormatProps {
	startDate: number;
	endDate?: number;
	current?: boolean;
}

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
const dateFormatter = ({
	startDate,
	endDate,
	current
}: IDateFormatProps): string => {
	const getMonthAndYearString = (timeStamp: number) => {
		const month = new Date(timeStamp).getMonth();
		const year = new Date(timeStamp).getFullYear();
		return `${monthFunction[month]}, ${year}`;
	};
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

const Work = () => {
	const [skip, setSkip] = React.useState(0);
	const [cardItems, setCardItems] = React.useState(initialItems);

	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Visible Work Experience')}
			Component={
				<section className={classes.BodyModule} id={attributes.WorkExperience}>
					<h1 className={classes.H1Main}>Work Experience</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft height={50} />
						<div className={classes.WorkCardContainer}>
							{cardItems.map((item, index) => (
								<Card
									className={classes.Card}
									imgClassName={classes.Image}
									key={index}
									h1Text={item.org}
									h2Text={item.designation}
									h3Text={dateFormatter({
										startDate: item.startDate,
										endDate: item.endDate,
										current: item.current
									})}
									pText={item.description}
									imgSrc={item.img}
								/>
							))}
						</div>
						<SvgRight height={50} />
					</div>
				</section>
			}
		/>
	);
};

export default Work;
