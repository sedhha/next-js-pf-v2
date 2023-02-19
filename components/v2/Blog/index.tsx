import React from 'react';
import classes from './Blog.module.css';
import LazyImage from '@/v2/common/LazyImage';
import SocialIcons from '@/v2/common/SocialIcons/Conditional';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { useDispatch } from 'react-redux';
import {
	sendAnalytics,
	updateViewed,
	updateActiveSection
} from '@/slices/navigation.slice';
import { useAppSelector } from '@/redux/hooks';
import blogs from '@/constants/blog.json';
import { useRouter } from 'next/router';
import { FE_ROUTES } from '@/utils/fe/apis/public';
import Circle from '@/v2/common/Circle';
import { icons } from '@/v2/common/Icons';
import { ISocialHandles } from '../../../interfaces/testimonials';

const { mainBlog, relatedBlogs, rankedBlogs } = blogs;

const numberedBlogs = [mainBlog, ...rankedBlogs.slice(0, 4)];

const originUrl = process.env.NEXT_PUBLIC_WEBSITE ?? 'http://localhost:3000';

const generateSocialIcons = (
	blogID: string,
	categoryID: string
): ISocialHandles[] => {
	const url = `${originUrl}${categoryID}/${blogID}`;
	const facebookShare = {
		id: icons.FaFacebookF,
		url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
		isSvg: true
	};
	const twitterShare = {
		id: icons.BsTwitter,
		url: `https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20blog%20by%20Shivam&url=${encodeURIComponent(
			url
		)}`,
		isSvg: true
	};
	const whatsAppShare = {
		id: icons.AiOutlineWhatsApp,
		url: `https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20blog%20by%20Shivam%20${url}`,
		isSvg: true
	};
	const directURL = {
		id: icons.AiOutlineCopy,
		url,
		isSvg: true
	};
	return [facebookShare, twitterShare, whatsAppShare, directURL];
};

const Blog = () => {
	const dispatch = useDispatch();
	const { blogViewed } = useAppSelector((state) => state.navigation);
	const router = useRouter();
	const [rank, setRank] = React.useState(0);

	const onChangeRank = (rank: number) => {
		setRank(rank);
	};

	React.useEffect(() => {}, []);

	React.useEffect(() => {
		if (blogViewed) {
			//@ts-ignore
			dispatch(sendAnalytics());
		}
	}, [dispatch, blogViewed]);

	const onClickNavigate = (category: string, id: string) =>
		router.push(`${FE_ROUTES.CATEGORY_BLOG_COMBO}/${category}/${id}`);

	const onCategoryNavigate = (category: string) =>
		router.push(`${FE_ROUTES.CATEGORY_BLOG_COMBO}/${category}`);

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
						</div>
						<div className={classes.FeaturedBlogBody}>
							<div className={classes.Number}>
								{numberedBlogs.map((blog, index) => (
									<h4
										key={blog.id}
										is-active={`${rank === index}`}
										onClick={() => onChangeRank(index)}
									>
										0{index + 1}
									</h4>
								))}
							</div>
							<div className={classes.FeaturedBlogElements}>
								<div className={classes.FeaturedBlogTitleSection}>
									<h2>{new Date(numberedBlogs[rank].postDate).toDateString()}</h2>
									<div>
										<Circle className={classes.CategoryCircle} />
										<h3
											onClick={() => onCategoryNavigate(numberedBlogs[rank].categoryID)}
										>
											{numberedBlogs[rank].mainCategory}
										</h3>
									</div>
								</div>
								<h1>{numberedBlogs[rank].title}</h1>
								<div className={classes.ContentSection}>
									<div>
										<LazyImage
											loadLazily
											src={numberedBlogs[rank].featuredImage ?? '/sample.png'}
											className={classes.Img}
											alt={numberedBlogs[rank].title}
										/>
										<div>
											<SocialIcons
												socialHandles={generateSocialIcons(
													numberedBlogs[rank].id,
													numberedBlogs[rank].categoryID
												)}
												openInNewTab
												iconColorClass={classes.Icon}
											/>
										</div>
									</div>
									<div>
										<div>
											{numberedBlogs[rank].excerpt.split('\n').map((line, i) => (
												<p key={i}>{line}</p>
											))}
											<button
												onClick={() =>
													onClickNavigate(
														numberedBlogs[rank].categoryID,
														numberedBlogs[rank].id
													)
												}
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
						{numberedBlogs.map((blog, index) => (
							<div key={blog.id} className={classes.MobileBlogContainer}>
								<LazyImage loadLazily src={blog.featuredImage ?? '/sample.png'} />
								<div className={classes.MobileMetaData}>
									<h4>0{index + 1}</h4>
									<h1>{blog.title}</h1>
									<div className={classes.MetaDataElements}>
										<h3 onClick={() => onClickNavigate(blog.categoryID, blog.id)}>
											{blog.mainCategory}
										</h3>
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
