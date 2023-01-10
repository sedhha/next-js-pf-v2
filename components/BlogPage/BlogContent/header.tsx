import LazyImage from '@/components/v2/common/LazyImage';
import classes from './Header.module.css';

interface IBlogHeader {
	title: string;
	featuredImage: string;
}
const BlogHeader = ({ title, featuredImage }: IBlogHeader) => {
	return (
		<header className={classes.header}>
			<h1>{title}</h1>
			<LazyImage src={featuredImage} />
		</header>
	);
};
export default BlogHeader;
