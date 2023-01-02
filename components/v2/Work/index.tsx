import React from 'react';
import classes from './Work.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';

const Work = () => {
	return (
		<div className={classes.BodyModule}>
			<h1 className={classes.H1Main}>Work Experience</h1>
			<div className={classes.WorkExperienceContainer}>
				<SvgLeft height={50} />
				<div className={classes.WorkCardContainer}>
					<Card className={classes.Card} imgClassName={classes.Image} />
					<Card className={classes.Card} imgClassName={classes.Image} />
					<Card className={classes.Card} imgClassName={classes.Image} />
				</div>
				<SvgRight height={50} />
			</div>
		</div>
	);
};

export default Work;
