import React from 'react';
import classes from './BlogCategoryPage.module.css';
import LazyImage from '@/v2/common/LazyImage';
import { stdDateFormatter } from '../../utils/date-utils';

interface IBlogCardProps {
	img: string;
	authorImg: string;
	authorName: string;
	title: string;
	excerpt: string;
	date: string;
}

export default function BlogCard({
	img,
	authorImg,
	authorName,
	title,
	excerpt,
	date
}: IBlogCardProps) {
	return (
		<div className={classes.Card}>
			<LazyImage src={img} className={classes.CardImage} />
			<div className={classes.BlogMetaData}>
				<div className={classes.AuthorWithAvatar}>
					<LazyImage src={authorImg} className={classes.AvatarImage} />
					<h1>{authorName}</h1>
				</div>
				<h2>{title}</h2>
				<h3>{excerpt}</h3>
				<h4>{stdDateFormatter(date)}</h4>
			</div>
		</div>
	);
}
