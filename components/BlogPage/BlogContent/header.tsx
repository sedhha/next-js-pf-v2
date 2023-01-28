import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';

interface IBlogHeader {
	title: string;
	featuredImage: string;
	authorName: string;
	excerpt: string;
	authorUrl?: string;
}
const BlogHeader = ({
	title,
	featuredImage,
	authorName,
	excerpt,
	authorUrl
}: IBlogHeader) => {
	return (
		<header className={classes.header}>
			<div className={classes.headerDetails}>
				<h1>{title}</h1>
				<div className={classes.AvatarBox}>
					<LazyImage
						src={authorUrl ?? '/sample.png'}
						className={classes.AvatarImage}
						loadLazily
					/>
					<h2>{authorName ?? 'Shivam Sahil'}</h2>
				</div>
				<p className={classes.Excerpt}>{excerpt}</p>
			</div>
			<LazyImage
				src={featuredImage}
				className={classes.FeaturedImage}
				loadLazily
			/>
		</header>
	);
};
export default BlogHeader;
