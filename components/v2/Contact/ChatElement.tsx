import LazyImage from '@/v2/common/LazyImage';
import React from 'react';
import classes from './Contact.module.css';
type Props = {
	message: string;
	uri?: string;
	isFrom: boolean;
};

export default function ChatElement({ message, isFrom }: Props) {
	return (
		<div className={classes.ChatElement}>
			{isFrom && (
				<LazyImage src={'/chat-icon.png'} className={classes.ChatImage} />
			)}
			<p
				className={`${classes.ElementMessageContainer} ${
					isFrom ? classes.MessageContainer_from : classes.MessageContainer_to
				}`}
			>
				{message}
			</p>
			{!isFrom && <LazyImage src={'/user.png'} className={classes.ChatImage} />}
		</div>
	);
}
