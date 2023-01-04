import React from 'react';
import classes from './Projects.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';

const Projects = () => {
	return (
		<section className={classes.BodyModule}>
			<h1 className={classes.H1Main}>Cool things I did!</h1>
			<div className={classes.WorkExperienceContainer}>
				<SvgLeft height={50} />
				<div className={classes.WorkCardContainer}>
					<Card className={classes.Card} imgClassName={classes.Image} />
					<Card className={classes.Card} imgClassName={classes.Image} />
					<Card className={classes.Card} imgClassName={classes.Image} />
				</div>
				<SvgRight height={50} />
			</div>
		</section>
	);
};

export default Projects;
