import React from 'react';
import classes from './YTPlayer.module.css';
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
	return (
		<div className={`${containerClass} ${classes.VideoContainer}`}>
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
