import React from 'react';
import classes from './WorkSection.module.css';
import SectionIds from '@/constants/sections.json';
import ArrowIcon from '@/components/Svgs/ArrowIcon';
import CardComponent from '@/components/Utility/Card';

export default function WorkSection() {
	return (
		<section className={classes.WorkSection} id={SectionIds.workSection}>
			<div className={classes.WorkExperienceHeaderContainer}>
				<h1 className={classes.WorkExperienceHeader}>
					Professional Career & Work Experience
				</h1>
			</div>
			<div className={classes.ExperienceContainer}>
				<div className={`${classes.NavigationButtonBox}`}>
					<ArrowIcon height={60} width={30} />
				</div>
				<CardComponent />
				<CardComponent />
				<CardComponent />

				<div className={`${classes.NavigationButtonBox}`}>
					<ArrowIcon className={classes.RightArrow} height={60} width={30} />
				</div>
			</div>
		</section>
	);
}
