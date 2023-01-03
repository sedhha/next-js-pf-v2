import React from 'react';
import classes from './Videos.module.css';
import VideoContainer from '@/v2/common/YTPlayer';

const VideoCard = () => {
	return (
		<div className={classes.VideoCard}>
			<VideoContainer
				videoID="daduJoiVKsI"
				containerClass={classes.VideoContainerSmall}
			/>
			<h1>Getting Started With NEXT JS: A Roadmap to Web Development</h1>
		</div>
	);
};

export default VideoCard;
