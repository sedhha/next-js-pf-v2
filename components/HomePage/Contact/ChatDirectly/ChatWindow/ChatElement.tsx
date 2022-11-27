import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './ChatElement.module.css';
type Props = {
	message: string;
	uri?: string;
	isFrom: boolean;
};

export default function ChatElement({ message, uri, isFrom }: Props) {
	return (
		<div className={classes.ChatElement}>
			{isFrom && (
				<LazyImage src={uri ?? '/chat-icon.png'} className={classes.ChatImage} />
			)}
			<p
				className={`${classes.MessageContainer} ${
					isFrom ? classes.MessageContainer_from : classes.MessageContainer_to
				}`}
			>
				{message}
			</p>
			{!isFrom && (
				<LazyImage src={'/chat-icon.png'} className={classes.ChatImage} />
			)}
		</div>
	);
}
