import React from 'react';
import classes from './Videos.module.css';
import VideoContainer from '@/v2/common/YTPlayer';
import VideoCard from './VideoCard';

const Awards = () => {
	return (
		<section className={classes.BodyModule}>
			<section className={classes.FeaturedVideoSection}>
				<h1>Video Content</h1>
				<VideoContainer
					videoID="daduJoiVKsI"
					containerClass={classes.VideoContainer}
				/>
				<h2>Getting Started With NEXT JS: A Roadmap to Web Development</h2>
				<p>
					The hack theme was based on virtual reality and gaming. We built a mobile
					platform to manage all of this in one centeralized application to handle
					any sort of potential issues.
				</p>
			</section>
			<section className={classes.SecondPart}>
				<div className={classes.VideoGrid}>
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
				</div>
				<button className={classes.BlueButton}>View All Videos</button>
			</section>
		</section>
	);
};

export default Awards;
