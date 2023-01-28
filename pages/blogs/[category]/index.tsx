import BlogCategoryPage from '@/components/BlogCategoryPage';
import blogCategories from '@/constants/blog-categories.json';

type Props = {
	lastBuild: string;
};
export default function Index({}: Props) {
	return <BlogCategoryPage />;
}
export async function getStaticProps() {
	return {
		props: {
			lastBuild: new Date().toUTCString()
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: Object.keys(blogCategories).map((item) => ({
			params: { category: item }
		})),
		fallback: true
	};
}
