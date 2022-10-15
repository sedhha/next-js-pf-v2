import React from 'react';
import classes from './WorkSection.module.css';
import SectionIds from '@/constants/sections.json';

export default function WorkSection() {
	return (
		<section className={classes.WorkSection} id={SectionIds.workSection}>
			<div className={classes.WorkExperienceHeaderContainer}>
				<h1 className={classes.WorkExperienceHeader}>
					Professional Career & Work Experience
				</h1>
			</div>
		</section>
	);
}
