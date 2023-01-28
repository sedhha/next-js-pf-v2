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
	return {
		paths: [{ params: { blogID: '3fNiHG2SY8Rtb792cxCI9J', category: 'life' } }],
		fallback: true
	};
}
