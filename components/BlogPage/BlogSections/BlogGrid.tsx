import React from 'react';
import classes from './BlogSections.module.css';
import BlogCard from './BlogCard';
import { IBlogCardProps } from '@/interfaces/fe/blogs/index';

const BlogGrid = ({ cards }: { cards: IBlogCardProps[] }) => {
	return (
		<div className={classes.BlogGrid}>
			{cards.map((card, index) => (
				<BlogCard key={index} {...card} />
			))}
		</div>
	);
};

export default BlogGrid;
