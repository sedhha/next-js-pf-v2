import React from 'react';
import classes from './BlogSections.module.css';
import LazyImage from '@/components/v2/common/LazyImage';
import { IBlogCardProps } from '@/interfaces/fe/blogs';

const BlogCard = ({ img, title, author, views }: IBlogCardProps) => {
	return (
		<div className={classes.BlogCard}>
			<LazyImage src={img ?? '/sample.png'} className={classes.BlogImage} />
			<div className={classes.MetaDataContent}>
				<h2>{title}</h2>
				<h3>{author}</h3>
				<h4>{views} views</h4>
			</div>
		</div>
	);
};

export default BlogCard;
