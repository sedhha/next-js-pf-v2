import React from 'react';
import classes from './InfiniteContainer.module.css';
import LazyImage from '@/v2/common/LazyImage';
import { InfiniteCardProps } from '@/interfaces/categories';
import YTPlayer from '@/v2/common/YTPlayer';

export default function BlogCard({
	img,
	avatarImg,
	avatarTitle,
	title,
	excerpt,
	date,
	yt,
	allowFullScreen,
	overwriteImageClass,
	onCardClick
}: InfiniteCardProps) {
	return (
		<div className={classes.Card} onClick={onCardClick}>
			{yt ? (
				<YTPlayer
					videoID={img as string}
					title={title}
					allowFullScreen={allowFullScreen}
					containerClass={overwriteImageClass ?? classes.YTVideo}
				/>
			) : (
				<LazyImage
					src={img ?? '/waiting.png'}
					className={overwriteImageClass ?? classes.CardImage}
				/>
			)}
			<div className={classes.BlogMetaData}>
				<div className={classes.AuthorWithAvatar}>
					<LazyImage
						src={avatarImg ?? '/user.png'}
						className={classes.AvatarImage}
					/>
					<h1>{avatarTitle}</h1>
				</div>
				<h2>{title}</h2>
				<h3>{excerpt}</h3>
				<h4>{date}</h4>
			</div>
		</div>
	);
}
