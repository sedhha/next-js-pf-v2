import React from 'react';
import YTContainer from '../YTContainer';
import classes from './VideoCard.module.css';

type Props = {};

export default function VideoCard({}: Props) {
	return (
		<div className={classes.VideoCard}>
			<YTContainer videoID="daduJoiVKsI" containerClass={classes.VideoEntity} />
			<h1>Getting Started With NEXT JS: A Roadmap to Web Development</h1>
		</div>
	);
}
