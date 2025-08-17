import React from 'react';
import classes from './AwardCard.module.css';
import LazyImage from '@/v2/common/LazyImage';
import { IEventAndParticipations } from '@/interfaces/events-and-participations';
import { getMonthAndYearString } from '@/utils/date-utils';
import { useAppDispatch } from '@/redux/hooks';
import { onClickEventTrigger } from '@/slices/analytics.slice';
import clickActions from '@/constants/click-actions.json';
import { BlogDate } from '@/components/v2/FormattedDate';


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
	achievementType,
	title
}: Props) => {
	const altered = getAlterParam(alter);
	const dispatch = useAppDispatch();
	const onClick = () =>
		dispatch(
			onClickEventTrigger({
				attribute: clickActions.awardCardDetails,
				description,
				identifier1: title,
				identifier2: url,
				identifier3: name,
				identifier4: description
			})
		);
	return (
		<div className={classes.AwardCard}>
			<LazyImage src={img} className={classes.SideImage} loadLazily />
			<div
				className={`${classes.Details} ${altered === 0 ? classes.oddBG : classes.evenBG
					}`}
			>
				<div className={classes.TitleAndDescription}>
					<div className={classes.RowElements}>
						<h1>{name}</h1>
						<a
							className={`${classes.AchievementButton} ${altered === 0 ? classes.AlterButton : classes.NormalButton
								}`}
							href={url}
							target="_blank"
							rel="noreferrer"
							onClick={onClick}
						>
							View Achievement
						</a>
					</div>
					<h2><BlogDate date={getMonthAndYearString(date)} /></h2>
				</div>
				<h3 className={classes[achievementType ?? 'rest']}>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default AwardCard;
