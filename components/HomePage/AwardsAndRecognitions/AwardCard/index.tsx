import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './AwardCard.module.css';
type Props = {
	alter: number;
};

export default function AwardCard({ alter }: Props) {
	return (
		<div className={classes.AwardCard}>
			<LazyImage src={'/sample.png'} className={classes.SideImage} />
			<div
				className={`${classes.Details} ${
					alter === -1 ? classes.oddBG : classes.evenBG
				}`}
			>
				<button className={`${classes.AchievementButton} button`}>
					View Achievement
				</button>
				<div className={classes.TitleAndDescription}>
					<h1>Grab Hackathon</h1>
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
}
