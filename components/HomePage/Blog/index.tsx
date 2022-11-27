import React from 'react';
import classes from './Blog.module.css';
import { pageSections } from '@/constants/index';
import BlogSections from './BlogSections';

export default function BlogPage() {
	return (
		<section className={classes.BlogModule} id={pageSections.BLOG}>
			<div className={classes.HighlightedBlogs}>
				<div className={classes.IntroHeader}>
					<h1 className={classes.IntroHeaderContent}>Blog</h1>
					<BlogSections />
				</div>
			</div>
			<div className={classes.RelatedBlogs}>Related blogs</div>
		</section>
	);
}
