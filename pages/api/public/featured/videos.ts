import { NextApiRequest } from 'next';
import videos from '@/constants/cms-constants/backend/videos.json';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { IFeaturedVideo } from '@/interfaces/videos';

const handler: IApiHandler<IFeaturedVideo> = (req: NextApiRequest) => {
	console.info(`[${req.method}]: [Featured Videos] | ${req.url}`);
	const top4 = videos
		.filter((video) => video.tags?.includes('top4'))
		.slice(0, 4);
	const highlightedVideo = videos.find((video) =>
		video.tags?.includes('highlighted')
	);
	const firstVideo = videos[0];
	return {
		statusCode: 200,
		json: {
			highlighted: highlightedVideo ?? firstVideo,
			top4
		}
	};
};
export default withApiHandler(handler);
