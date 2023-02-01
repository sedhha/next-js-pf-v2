import { NextApiRequest } from 'next';
import videos from '@/constants/cms-constants/backend/videos.json';
import { IVideoContent } from '@/interfaces/videos';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<IVideoContent | null> = (req: NextApiRequest) => {
	const { videoID } = req.query;
	info(`[${req.method}]: [Title By Video ID] | ${req.url}`);
	const video = videos.find((item) => item.id === videoID);
	return {
		statusCode: 200,
		error: false,
		json: video ?? null
	};
};
export default withApiHandler(handler);
