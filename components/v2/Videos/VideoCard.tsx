import React from 'react';
import classes from './Videos.module.css';
import VideoContainer from '@/v2/common/YTPlayer';

type Props = {
	id: string;
	title: string;
};
const VideoCard = ({ id, title }: Props) => {
	return (
		<div className={classes.VideoCard}>
			<VideoContainer videoID={id} containerClass={classes.VideoContainerSmall} />
			<h1>{title}</h1>
		</div>
	);
};

export default VideoCard;
