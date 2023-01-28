import BlogPage from '@/components/BlogPage';
import preGenerated from '@/constants/blog-pre-generated.json';

const { blogCategoryCombination } = preGenerated;

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
	return {
		paths: blogCategoryCombination.map((item) => ({ params: item })),
		fallback: true
	};
}
