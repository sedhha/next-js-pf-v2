import React from 'react';
import classes from './Blog.module.css';
import LazyImage from '@/v2/common/LazyImage';
import SocialIcons from '@/v2/common/SocialIcons';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';
const Blog = () => {
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Blogs Visibility')}
			Component={
				<section className={classes.BlogBody} id={attributes.Blog}>
					<div className={classes.BlogMain}>
						<div className={classes.BlogHead}>
							<h1>Blog</h1>
							<section className={classes.BlogCategories}>
								<h3 is-active="true">Web Development</h3>
								<h3>Mern Stack</h3>
								<h3>IoT Programming</h3>
								<h3>Life</h3>
								<select>
									<option>More</option>
									<option>Gaming</option>
									<option>APIs</option>
									<option>Docker</option>
								</select>
							</section>
						</div>
						<div className={classes.FeaturedBlogBody}>
							<div className={classes.Number}>
								<h4 is-active="true">01</h4>
								<h4>02</h4>
								<h4>03</h4>
								<h4>04</h4>
								<h4>05</h4>
							</div>
							<div className={classes.FeaturedBlogElements}>
								<div className={classes.FeaturedBlogTitleSection}>
									<h2>29 June 2022</h2>
									<h3>Web Development</h3>
									<h4>View All</h4>
								</div>
								<h1>Getting Started With NEXT JS</h1>
								<div className={classes.ContentSection}>
									<div>
										<LazyImage src={'/sample.png'} className={classes.Img} />
										<div>
											<SocialIcons iconColorClass={classes.Icon} />
										</div>
									</div>
									<div>
										<div>
											<p>
												Working as a Software Engineer, I have majorly been involved in
												making end to end applications using React and Scala as a backend
												service. I have been also focussing on building microservices ...
											</p>
											<p>
												Working as a Software Engineer, I have majorly been involved in
												making end to end applications using React and Scala as a backend
												service. I have been also focussing on building microservices ...
											</p>
											<p>I have been also focussing on building microservices ...</p>
											<button>Read Complete Blog</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.SideBar}>
						<div className={classes.RelatedBlogCard}>
							<LazyImage src={'/sample.png'} />
							<h3>Web Development</h3>
							<h4>Getting Started With NEXT JS</h4>
							<h5>22nd August 2022</h5>
						</div>
						<div className={classes.RelatedBlogCard}>
							<LazyImage src={'/sample.png'} />
							<h3>Web Development</h3>
							<h4>Getting Started With NEXT JS</h4>
							<h5>22nd August 2022</h5>
						</div>
					</div>
					<div className={classes.MobileView}>
						<div className={classes.MobileBlogContainer}>
							<LazyImage src={'/sample.png'} />
							<div className={classes.MobileMetaData}>
								<h4 is-active="true">01</h4>
								<h1>Getting Started With NEXT JS</h1>
								<div className={classes.MetaDataElements}>
									<h3>Web Development</h3>
									<h4>29 July 2022</h4>
								</div>
							</div>
						</div>
						<div className={classes.MobileBlogContainer}>
							<LazyImage src={'/sample.png'} />
							<div className={classes.MobileMetaData}>
								<h4 is-active="true">01</h4>
								<h1>Getting Started With NEXT JS</h1>
								<div className={classes.MetaDataElements}>
									<h3>Web Development</h3>
									<h4>29 July 2022</h4>
								</div>
							</div>
						</div>
						<div className={classes.MobileBlogContainer}>
							<LazyImage src={'/sample.png'} />
							<div className={classes.MobileMetaData}>
								<h4 is-active="true">01</h4>
								<h1>Getting Started With NEXT JS</h1>
								<div className={classes.MetaDataElements}>
									<h3>Web Development</h3>
									<h4>29 July 2022</h4>
								</div>
							</div>
						</div>
					</div>
				</section>
			}
		/>
	);
};

export default Blog;