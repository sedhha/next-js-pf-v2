import React from 'react';
import classes from './AwardCard.module.css';
import LazyImage from '@/v2/common/LazyImage';
import { IEventAndParticipations } from '@/interfaces/events-and-participations';
import { getMonthAndYearString } from '@/utils/date-utils';

type Props = {
	alter: number;
} & IEventAndParticipations;

const getAlterParam = (index: number) => {
	return index % 4 == 0 || index % 4 == 3 ? 1 : 0;
};

const AwardCard = ({
	alter,
	img,
	name,
	url,
	date,
	description,
	achievementType
}: Props) => {
	const altered = getAlterParam(alter);
	return (
		<div className={classes.AwardCard}>
			<LazyImage src={img} className={classes.SideImage} />
			<div
				className={`${classes.Details} ${
					altered === 0 ? classes.oddBG : classes.evenBG
				}`}
			>
				<div className={classes.TitleAndDescription}>
					<div className={classes.RowElements}>
						<h1>{name}</h1>
						<a
							className={`${classes.AchievementButton} ${
								altered === 0 ? classes.AlterButton : classes.NormalButton
							}`}
							href={url}
							target="_blank"
							rel="noreferrer"
						>
							View Achievement
						</a>
					</div>
					<h2>{getMonthAndYearString(date)}</h2>
				</div>
				<h3 className={classes[achievementType ?? 'rest']}>
					Community Mentoring App Award
				</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default AwardCard;
