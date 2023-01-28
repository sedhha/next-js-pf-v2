import React from 'react';
import classes from './Blog.module.css';
import LazyImage from '@/v2/common/LazyImage';
import SocialIcons from '@/v2/common/SocialIcons';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { useDispatch } from 'react-redux';
import {
	sendAnalytics,
	updateViewed,
	updateActiveSection,
	updateActiveBlogCategory
} from '@/slices/navigation.slice';
import { useAppSelector } from '@/redux/hooks';
import blogCategories from '@/constants/blog-categories.json';
import blogs from '@/constants/blog.json';
import { useRouter } from 'next/router';
import { FE_ROUTES } from '@/utils/fe/apis/public';

const { mainBlog, relatedBlogs } = blogs;
const keys = Object.keys(blogCategories);
const activeKeyinSelect = (activeKey: string) =>
	activeKey !== keys[0] && activeKey !== keys[1] && activeKey !== keys[2];

const Blog = () => {
	const dispatch = useDispatch();
	const { blogViewed, activeBlogCategory } = useAppSelector(
		(state) => state.navigation
	);
	const router = useRouter();
	const [rank, setRank] = React.useState(1);

	const onChangeRank = (rank: number) => {
		setRank(rank);
	};

	React.useEffect(() => {
		if (blogViewed) {
			//@ts-ignore
			dispatch(sendAnalytics());
		}
	}, [dispatch, blogViewed]);

	const onClickNavigate = (category: string, id: string) =>
		router.push(`${FE_ROUTES.CATEGORY_BLOG_COMBO}/${category}/${id}`);

	return (
		<VisibilityHandler
			onVisibleCallback={() => {
				dispatch(updateViewed('blogViewed'));
				dispatch(updateActiveSection(attributes.Blog));
			}}
			Component={
				<section className={classes.BlogBody} id={attributes.Blog}>
					<div className={classes.BlogMain}>
						<div className={classes.BlogHead}>
							<h1>Blog</h1>
							<section className={classes.BlogCategories}>
								{keys.map((key) => (
									<h3
										key={key}
										is-active={`${key === activeBlogCategory}`}
										onClick={() => dispatch(updateActiveBlogCategory(key))}
									>
										{blogCategories[key as keyof typeof blogCategories]}
									</h3>
								))}
								<select
									is-active={`${activeKeyinSelect(activeBlogCategory)}`}
									onChange={(e) =>
										dispatch(
											updateActiveBlogCategory(
												keys[e.target.selectedIndex - 1] ?? 'all-categories'
											)
										)
									}
								>
									<option>All Categories</option>
									{keys.map((key) => (
										<option
											key={key}
											className={
												activeBlogCategory === key ? classes.ActiveBlogItem : undefined
											}
											value={blogCategories[key as keyof typeof blogCategories]}
											onClick={() => {
												dispatch(updateActiveBlogCategory(key));
											}}
										>
											{blogCategories[key as keyof typeof blogCategories]}
										</option>
									))}
								</select>
							</section>
						</div>
						<div className={classes.FeaturedBlogBody}>
							<div className={classes.Number}>
								<h4 is-active={`${rank === 1}`} onClick={() => onChangeRank(1)}>
									01
								</h4>
								<h4 is-active={`${rank === 2}`} onClick={() => onChangeRank(2)}>
									02
								</h4>
								<h4 is-active={`${rank === 3}`} onClick={() => onChangeRank(3)}>
									03
								</h4>
								<h4 is-active={`${rank === 4}`} onClick={() => onChangeRank(4)}>
									04
								</h4>
								<h4 is-active={`${rank === 5}`} onClick={() => onChangeRank(5)}>
									05
								</h4>
							</div>
							<div className={classes.FeaturedBlogElements}>
								<div className={classes.FeaturedBlogTitleSection}>
									<h2>{new Date(mainBlog.postDate).toDateString()}</h2>
									<h3>{mainBlog.mainCategory}</h3>
									<h4>View All</h4>
								</div>
								<h1>{mainBlog.title}</h1>
								<div className={classes.ContentSection}>
									<div>
										<LazyImage
											loadLazily
											src={mainBlog.featuredImage ?? '/sample.png'}
											className={classes.Img}
										/>
										<div>
											<SocialIcons iconColorClass={classes.Icon} />
										</div>
									</div>
									<div>
										<div>
											{mainBlog.excerpt.split('\n').map((line, i) => (
												<p key={i}>{line}</p>
											))}
											<button
												onClick={() => onClickNavigate(mainBlog.categoryID, mainBlog.id)}
											>
												Read Complete Blog
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.SideBar}>
						{relatedBlogs.map((blog) => (
							<div key={blog.id} className={classes.RelatedBlogCard}>
								<LazyImage loadLazily src={blog.featuedImage ?? '/sample.png'} />
								<h3>{blog.mainCategory}</h3>
								<h4 onClick={() => onClickNavigate(blog.categoryID, blog.id)}>
									{blog.title}
								</h4>
								<h5>{new Date(blog.postDate).toDateString()}</h5>
							</div>
						))}
					</div>
					<div className={classes.MobileView}>
						{relatedBlogs.map((blog, index) => (
							<div key={blog.id} className={classes.MobileBlogContainer}>
								<LazyImage loadLazily src={blog.featuedImage ?? '/sample.png'} />
								<div className={classes.MobileMetaData}>
									<h4>0{index + 1}</h4>
									<h1>{blog.title}</h1>
									<div className={classes.MetaDataElements}>
										<h3>{blog.mainCategory}</h3>
										<h4>{new Date(blog.postDate).toDateString()}</h4>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			}
		/>
	);
};

export default Blog;
