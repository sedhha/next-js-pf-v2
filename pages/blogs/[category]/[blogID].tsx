import { getRequiredPreRenderingBlogAndCategories } from '@/backend/contentful';
import BlogPage from '@/components/BlogPage';

type Props = {
	lastBuild: string;
};
export default function Blog({ lastBuild }: Props) {
	return <BlogPage lastBuild={lastBuild} />;
}
export async function getStaticProps() {
	return {
		props: {
			lastBuild: new Date().toUTCString()
		}
	};
}
export async function getStaticPaths() {
	const { blogCategoryCombination } =
		await getRequiredPreRenderingBlogAndCategories();
	return {
		paths: blogCategoryCombination.map((item) => ({ params: { ...item } })),
		fallback: true
	};
}
