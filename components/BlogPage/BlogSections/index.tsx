import React from 'react';
import classes from './BlogSections.module.css';
import BlogCategory from './BlogCategory';

const cards = [
	{
		img: '/sample.png',
		title: 'Getting Started with Computer Vision',
		author: 'Shivam Sahil',
		views: 0
	},
	{
		img: '/sample.png',
		title: 'Getting Started with Computer Vision',
		author: 'Shivam Sahil',
		views: 1
	},
	{
		img: '/sample.png',
		title: 'Getting Started with Computer Vision',
		author: 'Shivam Sahil',
		views: 2
	},
	{
		img: '/sample.png',
		title: 'Getting Started with Computer Vision',
		author: 'Shivam Sahil',
		views: 3
	},
	{
		img: '/sample.png',
		title: 'Getting Started with Computer Vision',
		author: 'Shivam Sahil',
		views: 4
	}
];

const BlogSection = () => {
	return (
		<section className={classes.BlogSection}>
			<BlogCategory category="Web Development" cards={cards} />
			<BlogCategory category="IoT Development" cards={cards} />
			<BlogCategory category="Workflow Automation" cards={cards} />
		</section>
	);
};

export default BlogSection;
