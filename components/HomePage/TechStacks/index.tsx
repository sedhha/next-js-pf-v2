import React from 'react';
import { pageSections } from '@/constants/index';
import classes from './TechStack.module.css';
type Props = {};

export default function Testimonials({}: Props) {
	return (
		<section id={pageSections.TECHSTACK} className="section">
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>Hearing from others</h1>
			</div>
			<div className={classes.TestimonialSection}>
				<div className={classes.Testimonial}>
					<div className={classes.TestimonialEntity}>
						<h1>SHIVAM SAHIL</h1>
						<h2>Software Engineer, Optum, UnitedHealth Group</h2>
						<p>
							The hack theme was based on virtual reality and gaming. We built a mobile
							platform to manage all of this in one centeralized application to handle
							any sort of potential issues.
						</p>
						<p>
							The hack theme was based on virtual reality and gaming. We built a mobile
							platform to manage all of this in one centeralized application to handle
							any sort of potential issues.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
