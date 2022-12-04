import React from 'react';
import classes from './Videos.module.css';
import { pageSections } from '@/constants/index';
import VideoContainer from './YTContainer';
import VideoCard from './VideoCard';

type Props = {};

export default function Awards({}: Props) {
	return (
		<section id={pageSections.VIDEOS} className={classes.WorkSection}>
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>Video Content</h1>
			</div>

			<div className={classes.VideosSection}>
				<div className={classes.FeaturedVideo}>
					<VideoContainer
						videoID="daduJoiVKsI"
						containerClass={classes.VideoContainer}
					/>
					<div className={classes.VideoHeading}>
						<h1>Getting Started With NEXT JS: A Roadmap to Web Development</h1>
						<h4>
							The hack theme was based on virtual reality and gaming. We built a mobile
							platform to manage all of this in one centeralized application to handle
							any sort of potential issues.
						</h4>
					</div>
				</div>
				<div className={classes.MinimizedWindow}>
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
				</div>
			</div>
		</section>
	);
}
