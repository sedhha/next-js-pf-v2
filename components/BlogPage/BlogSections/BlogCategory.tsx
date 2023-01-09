import React from 'react';
import classes from './BlogSections.module.css';
import BlogGrid from './BlogGrid';
import { IBlogCardProps } from '@/interfaces/fe/blogs';

interface IBlogCategoryProps {
	category: string;
	cards: IBlogCardProps[];
}

const BlogCategory = ({ cards, category }: IBlogCategoryProps) => {
	return (
		<div className={classes.Category}>
			<div className={classes.CategoryTitle}>
				<h2>{category}</h2>
				<button>See All</button>
			</div>
			<BlogGrid cards={cards} />
		</div>
	);
};

export default BlogCategory;
