import React from 'react';
import Card from './WorkExperienceCard';
import classes from './WorkExperienceContainer.module.css';

export default function WorkExperienceContainer() {
	return (
		<div className={classes.WorkExperienceContainer}>
			<Card />
			<Card />
			<Card />
		</div>
	);
}
