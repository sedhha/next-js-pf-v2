import React from 'react';
import classes from './AwardCard.module.css';
import LazyImage from '@/v2/common/LazyImage';

type Props = {
	alter: number;
};

const AwardCard = ({ alter }: Props) => {
	return (
		<div className={classes.AwardCard}>
			<LazyImage src={'/sample.png'} className={classes.SideImage} />
			<div
				className={`${classes.Details} ${
					alter === -1 ? classes.oddBG : classes.evenBG
				}`}
			>
				<div className={classes.TitleAndDescription}>
					<div className={classes.RowElements}>
						<h1>Grab Hackathon</h1>
						<button
							className={`${classes.AchievementButton} ${
								alter === -1 ? classes.AlterButton : classes.NormalButton
							}`}
						>
							View Achievement
						</button>
					</div>
					<h2>June, 2022</h2>
				</div>
				<h3>Community Mentoring App Award</h3>
				<p>
					The hack theme was based on virtual reality and gaming. We built a mobile
					platform to manage all of this in one centeralized application to handle
					any sort of potential issues.
				</p>
			</div>
		</div>
	);
};

export default AwardCard;
