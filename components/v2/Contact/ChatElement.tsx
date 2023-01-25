import LazyImage from '@/v2/common/LazyImage';
import React from 'react';
import classes from './Contact.module.css';
type Props = {
	message: string;
	uri?: string;
	isFromAdmin: boolean;
};

export default function ChatElement({ message, isFromAdmin }: Props) {
	return (
		<div className={classes.ChatElement}>
			{isFromAdmin && (
				<LazyImage src={'/chat-icon.png'} className={classes.ChatImage} />
			)}
			<p
				className={`${classes.ElementMessageContainer} ${
					isFromAdmin ? classes.MessageContainer_from : classes.MessageContainer_to
				}`}
			>
				{message}
			</p>
			{!isFromAdmin && (
				<LazyImage src={'/user.png'} className={classes.ChatImage} />
			)}
		</div>
	);
}
