import React from 'react';
import classes from './Testimonials.module.css';
import SvgRight from '@/components/common/SvgRight';
import SvgLeft from '@/components/common/SvgLeft';
import SocialIcons from '@/v2/common/SocialIcons';
import LazyImage from '@/components/common/ImageUtility';
type Props = {};

export default function Testimonials({}: Props) {
	return (
		<section className={classes.BodyModule}>
			<h1>A word about me!</h1>
			<div className={classes.TestimonialSection}>
				<SvgLeft className={classes.NavigationButton} height={140} />
				<div className={classes.Testimonial}>
					<div className={classes.TestimonialEntity}>
						<LazyImage src={'/chat-icon.png'} className={classes.ChatIcon} />
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
						<SocialIcons iconColorClass={classes.SocialIcon} />
					</div>
				</div>
				<SvgRight className={classes.NavigationButton} height={140} />
			</div>
		</section>
	);
}
