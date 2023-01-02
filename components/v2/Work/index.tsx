import React from 'react';
import classes from './Work.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';

const Work = () => {
	return (
		<div className={classes.WorkModule}>
			<h1 className={classes.H1Main}>Work Experience</h1>
			<div className={classes.WorkExperienceCard}>
				<SvgLeft className={'NavigationButton'} height={140} />
				<div className={classes.ExperienceCardContainer}>
					<Card className={classes.Card} />
					<Card className={classes.Card} />
					<Card className={classes.Card} />
					<Card className={classes.Card} />
				</div>
				<SvgRight className={'NavigationButton'} height={140} />
			</div>
		</div>
	);
};

export default Work;
