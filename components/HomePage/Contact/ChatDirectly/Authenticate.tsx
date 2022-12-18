import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './ChatDirectly.module.css';
import { useAppDispatch } from '../../../../redux/tools/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';

export default function Authenticate() {
	const dispatch = useAppDispatch();
	return (
		<div className={classes.ChatDirectly}>
			<h3 className={classes.ChatDirectlyAlter}>OR</h3>
			<div className={classes.ImageContainer}>
				<LazyImage src={'/chat-icon.png'} className={classes.Image} />
				<div className={classes.onlineIcon} />
			</div>
			<button
				className={`button ${classes.Button}`}
				onClick={() => dispatch(updateInChatMode(true))}
			>
				Authenticate and Chat
			</button>
		</div>
	);
}
