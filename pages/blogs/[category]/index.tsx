import { getRequiredPreRenderingBlogAndCategories } from '@/backend/contentful';
import BlogCategoryPage from '@/components/BlogCategoryPage';

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
	const { categories } = await getRequiredPreRenderingBlogAndCategories();
	return {
		paths: categories.map((item) => {
			return {
				params: { category: item }
			};
		}),
		fallback: true
	};
}
