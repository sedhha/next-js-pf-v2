import * as React from 'react';
import classes from './Work.module.css';
import { pageSections } from '../../../constants/index';
import SvgRight from '@/components/common/SvgRight';
import SvgLeft from '@/components/common/SvgLeft';
import SvgContainer from './SvgContainer/index';
import WorkExperienceContainer from './WorkExperienceContainer';

export default function WorkExperience() {
	return (
		<section id={pageSections.WORK} className={classes.WorkSection}>
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>
					Professional Career and Work Experience
				</h1>
			</div>
			<div className={classes.WorkExperienceCardsContainer}>
				<SvgContainer SvgComponent={<SvgLeft height={80} />} />
				<WorkExperienceContainer />
				<SvgContainer SvgComponent={<SvgRight height={80} />} />
			</div>
		</section>
	);
}
