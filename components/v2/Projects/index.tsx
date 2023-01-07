import React from 'react';
import classes from './Projects.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';

const Projects = () => {
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Projects visible')}
			Component={
				<section className={classes.BodyModule} id={attributes.Projects}>
					<h1 className={classes.H1Main}>Cool things I did!</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft height={50} />
						<div className={classes.WorkCardContainer}></div>
						<SvgRight height={50} />
					</div>
				</section>
			}
		/>
	);
};

export default Projects;
