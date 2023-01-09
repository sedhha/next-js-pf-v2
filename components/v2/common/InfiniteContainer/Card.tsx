import React from 'react';
import classes from './InfiniteContainer.module.css';
import LazyImage from '@/v2/common/LazyImage';
import { InfiniteCardProps } from '@/interfaces/categories';

export default function BlogCard({
	img,
	avatarImg,
	avatarTitle,
	title,
	excerpt,
	date
}: InfiniteCardProps) {
	return (
		<div className={classes.Card}>
			<LazyImage src={img} className={classes.CardImage} />
			<div className={classes.BlogMetaData}>
				<div className={classes.AuthorWithAvatar}>
					<LazyImage src={avatarImg} className={classes.AvatarImage} />
					<h1>{avatarTitle}</h1>
				</div>
				<h2>{title}</h2>
				<h3>{excerpt}</h3>
				<h4>{date}</h4>
			</div>
		</div>
	);
}
