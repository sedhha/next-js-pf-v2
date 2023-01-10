import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';

interface IBlogHeader {
	title: string;
	featuredImage: string;
}
const BlogHeader = ({ title, featuredImage }: IBlogHeader) => {
	return (
		<header className={classes.header}>
			<div className={classes.headerDetails}>
				<h1>{title}</h1>
				<div className={classes.AvatarBox}>
					<LazyImage src={'/sample.png'} className={classes.AvatarImage} />
					<h2>Shivam Sahil</h2>
				</div>
				<p className={classes.Excerpt}>
					Next.js gives you the best developer experience with all the features you
					need for production: hybrid static & server rendering, TypeScript support,
					smart bundling, route pre-fetching, and more. No config needed.
				</p>
			</div>
			<LazyImage src={featuredImage} />
		</header>
	);
};
export default BlogHeader;
