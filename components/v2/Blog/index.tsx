import React from 'react';
import classes from './Blog.module.css';
import LazyImage from '@/v2/common/LazyImage';
import SocialIcons from '@/v2/common/SocialIcons/Conditional';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { useDispatch } from 'react-redux';
import {
	onClickSocialHandle,
	onFeaturedBlogView,
	onNewSectionView
} from '@/slices/analytics.slice';
import blogs from '@/constants/blog.json';
import { useRouter } from 'next/router';
import { FE_ROUTES } from '@/utils/fe/apis/public';
import Circle from '@/v2/common/Circle';
import { icons } from '@/v2/common/Icons';
import { ISocialHandles } from '../../../interfaces/testimonials';
import { useAppSelector } from '@/redux/hooks';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';
import { AttributeValue } from '@/interfaces/fe';

const { mainBlog, relatedBlogs, rankedBlogs } = blogs;

const numberedBlogs = [mainBlog, ...rankedBlogs.slice(0, 4)];

const originUrl = process.env.NEXT_PUBLIC_WEBSITE ?? 'http://localhost:3000';

const generateSocialIcons = (
	blogID: string,
	categoryID: string
): ISocialHandles[] => {
	const url = `${originUrl}blogs/${categoryID}/${blogID}`;
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
	const {
		analytics: {
			visitorID,
			staticContent: { clickEvents }
		},
		navigation: { userUid, csrfToken }
	} = useAppSelector((state) => state);
	const router = useRouter();
	const [rank, setRank] = React.useState(0);

	const onChangeRank = (rank: number) => {
		setRank(rank);
		dispatch(
			onFeaturedBlogView({
				blog: {
					category: numberedBlogs[rank].categoryID,
					blogID: numberedBlogs[rank].id,
					timesClicked: 1,
					actionType: 'rank-navigate'
				},
				rank: `${rank}`
			})
		);
	};

	const onClickShareIcon = (icon: ISocialHandles) => {
		dispatch(
			onClickSocialHandle({
				url: icon.url,
				category: numberedBlogs[rank].categoryID,
				blogID: numberedBlogs[rank].id,
				clickCount: 1,
				socialHandle: icon.id,
				fingerprint: visitorID,
				userID: userUid
			})
		);
		const key = `featuredBlogSocialClick-${icon.url}`;
		const payload = {
			clickDescription: `This event denotes that user has clicked on social icon url to share the blog - ${icon.url}`,
			clickedTimes: 1,
			clickIdentifier: key,
			clickPerformedAt: new Date().toISOString(),
			identifier1: 'featuredBlogSocialShare',
			identifier2: icon.url
		};
		if (csrfToken) logEvent(csrfToken, key, payload);
	};

	const onClickNavigate = (category: string, id: string) => {
		router.push(`${FE_ROUTES.CATEGORY_BLOG_COMBO}/${category}/${id}`);
		dispatch(
			onFeaturedBlogView({
				blog: {
					category: category,
					blogID: id,
					timesClicked: 1,
					actionType: 'blog-navigate'
				},
				rank: `${rank}`
			})
		);
		const key = `featuredBlog-${id}-${category}-${rank}`;
		const description = `This event denotes that user has viewed ${id} blog with category: ${category}`;
		const payload = {
			clickDescription: description,
			clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1,
			clickIdentifier: key,
			clickPerformedAt: new Date().toISOString(),
			identifier1: 'featuredBlogView',
			identifier2: rank.toString(),
			identifier3: id,
			identifier4: category
		};
		if (csrfToken) logEvent(csrfToken, key, payload);
	};

	const onCategoryNavigate = (category: string) => {
		router.push(`${FE_ROUTES.CATEGORY_BLOG_COMBO}/${category}`);
		dispatch(
			onFeaturedBlogView({
				blog: {
					category: category,
					blogID: 'category-only-navigate',
					timesClicked: 1,
					actionType: 'category-navigate'
				},
				rank: `${rank}`
			})
		);
		const key = `featuredBlog-category-only-navigate-${category}-${rank}`;
		const description = `This event denotes that user has viewed 'category-only-navigate' blog with category: ${category}`;
		const payload = {
			clickDescription: description,
			clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1,
			clickIdentifier: key,
			clickPerformedAt: new Date().toISOString(),
			identifier1: 'featuredBlogView',
			identifier2: rank.toString(),
			identifier3: 'category-only-navigate',
			identifier4: category
		};
		if (csrfToken) logEvent(csrfToken, key, payload);
	};

	return (
		<VisibilityHandler
			onVisibleCallback={() =>
				//@ts-ignore
				dispatch(onNewSectionView(attributes.Blog as AttributeValue))
			}
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
												onClick={onClickShareIcon}
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
