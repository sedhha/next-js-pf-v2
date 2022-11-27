import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './ChatDirectly.module.css';

export default function ChatDirectly() {
	return (
		<div className={classes.ChatDirectly}>
			<div className={classes.ImageContainer}>
				<LazyImage src={'/chat-icon.png'} className={classes.Image} />
				<div className={classes.onlineIcon} />
			</div>
			<button className={`button ${classes.Button}`}>Authenticate and Chat</button>
		</div>
	);
}
