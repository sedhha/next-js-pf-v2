import React from 'react';
import classes from './YTPlayer.module.css';
import { useAppDispatch } from '@/redux/hooks';
import { onClickEvent } from '@/slices/analytics.slice';
import clickActions from '@/constants/click-actions.json';

type Props = {
	videoID: string;
	title?: string;
	allowString?: string;
	allowFullScreen?: boolean;
	containerClass?: string;
};

export default function YTContainer({
	videoID,
	title,
	allowFullScreen,
	allowString,
	containerClass
}: Props) {
	const dispatch = useAppDispatch();
	const onVideoClick = () => {
		dispatch(
			onClickEvent({
				attribute: clickActions.videoPlayEvent,
				description: videoID,
				identifier1: title
			})
		);
	};
	return (
		<div
			className={`${containerClass} ${classes.VideoContainer}`}
			onClick={onVideoClick}
		>
			<iframe
				width="560"
				height="315"
				src={`https://www.youtube.com/embed/${videoID ?? 'daduJoiVKsI'}`}
				title={title ?? 'YouTube video player'}
				allow={
					allowString ??
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				}
				allowFullScreen={allowFullScreen ?? true}
			></iframe>
		</div>
	);
}
