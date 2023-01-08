import React from 'react';
import classes from './BlogSections.module.css';
import LazyImage from '@/components/v2/common/LazyImage';

const BlogSection = () => {
	return (
		<section className={classes.BlogSection}>
			<div className={classes.Category}>
				<div className={classes.CategoryTitle}>
					<h2>Computer Vision</h2>
					<button>See All</button>
				</div>
				<div className={classes.BlogGrid}>
					<>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
					</>
				</div>
			</div>
			<div className={classes.Category}>
				<div className={classes.CategoryTitle}>
					<h2>Image Processing</h2>
					<button>See All</button>
				</div>
				<div className={classes.BlogGrid}>
					<>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
						<div className={classes.BlogCard}>
							<LazyImage src={'/sample.png'} className={classes.BlogImage} />
							<div className={classes.MetaDataContent}>
								<h2>Computer Vision: A Promising Technology Of Future</h2>
								<h3>Shivam Sahil</h3>
								<h4>0 views</h4>
							</div>
						</div>
					</>
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
