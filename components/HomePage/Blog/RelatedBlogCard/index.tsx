import LazyImage from '@/components/common/ImageUtility';
import React from 'react';

import classes from './RelatedBlogCard.module.css';
export default function BlogCard() {
	return (
		<div className={classes.BlogCard}>
			<LazyImage src={'/sample.png'} className={classes.BlogCardImage} />
			<div className={classes.CategoryRow}>
				<div className={classes.Circle}></div>
				<h2>Web Development</h2>
			</div>
			<h3>Getting Started With NEXT JS</h3>
			<h4>22nd August 2021</h4>
		</div>
	);
}
