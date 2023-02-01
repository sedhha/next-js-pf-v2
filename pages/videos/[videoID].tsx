import FullScreenVideo from '@/components/AllVideosPage/FullScreenVideo';

export default function Index() {
	return <FullScreenVideo />;
}

// export async function getStaticPaths() {
// 	return {
// 		paths: videos.map((item) => ({ params: { videoID: item.id } })),
// 		fallback: true
// 	};
// }
