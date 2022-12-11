import React from 'react';
import classes from './Blog.module.css';
import { pageSections } from '@/constants/index';
import BlogSections from './BlogSections';
import mostPopularBlogs from '@/constants/most-popular-blogs.json';
import { useAppSelector, useAppDispatch } from '../../../redux/tools/hooks';
import { updateMostPopularSelected } from '@/slices/navigation.slice';
import LazyImage from '@/components/common/ImageUtility';
import SocialIcons from '@/components/common/SocialIcons';
import RelatedBlogCard from '@/components/HomePage/Blog/RelatedBlogCard';

export default function BlogPage() {
	const { mostPopularSelectedBlogId } = useAppSelector(
		(state) => state.navigation
	);
	const dispatch = useAppDispatch();
	return (
		<section className={classes.BlogModule} id={pageSections.BLOG}>
			<div className={classes.HighlightedBlogs}>
				<div className={classes.IntroHeader}>
					<h1 className={classes.IntroHeaderContent}>Blog</h1>
					<BlogSections />
				</div>
				<div className={classes.HighlightedBlog}>
					<div className={classes.Top5Blogs}>
						{mostPopularBlogs.map((blog, index) => {
							const isActive = mostPopularSelectedBlogId === blog.id;
							return (
								<h2
									key={blog.id}
									onClick={() =>
										!isActive && dispatch(updateMostPopularSelected(blog.id))
									}
									className={`${classes.Top5BlogNumber} ${
										isActive
											? classes.Top5BlogNumber_active
											: classes.Top5BlogNumber_passive
									}`}
								>
									{`${index + 1}`.padStart(2, '0')}
								</h2>
							);
						})}
					</div>
					<div className={classes.HighlightedBlogContent}>
						<div className={classes.MetaDataDetails}>
							<div className={classes.Contains}>
								<h3 className={classes.DateSection}>29 June 2022</h3>
								<div className={classes.CategoryRow}>
									<div className={classes.Circle}></div>
									<h4 className={classes.PrimaryCategoryTag}>Web Development</h4>
								</div>
							</div>
							<button className={`button ${classes.Button}`}>View All</button>
						</div>
						<h1 className={classes.FeaturedBlogHeading}>
							Getting started with NEXT JS
						</h1>
						<br />
						<div className={classes.BlogDetails}>
							<div className={classes.ImageContainer}>
								<LazyImage src={'/sample.png'} className={classes.Image} />
								<SocialIcons />
							</div>
							<div className={classes.ParaGraphContainer}>
								<p>
									Working as a Software Engineer, I have majorly been involved in making
									end to end applications using React and Scala as a backend service.
									Working as a Software Engineer, I have majorly been involved in making
									end to end applications. Working as a Software Engineer, I have majorly
									been involved in making end to end applications using React and Scala
									as a backend service.
								</p>
								<p>
									Working as a Software Engineer, I have majorly been involved in making
									end to end applications using React and Scala as a backend service.
									Working as a Software Engineer, I have majorly been involved in making
									end to end applications. Working as a Software Engineer, I have majorly
									been involved in making end to end applications using React and Scala
									as a backend service.
								</p>
								<div className={classes.ButtonGroup}>
									<button className={`button ${classes.ButtonG}`}>
										Read Complete Blog
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.RelatedBlogs}>
				<RelatedBlogCard />
				<RelatedBlogCard />
			</div>
		</section>
	);
}
