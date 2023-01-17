import { NextApiRequest } from 'next';
import videos from '@/constants/cms-constants/backend/videos.json';
import { ITotal } from '@/interfaces/api';
import { IVideoContent } from '@/interfaces/videos';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/index';

const handler: IApiHandler<ITotal<IVideoContent>> = (req: NextApiRequest) => {
	const { limit, skip } = req.query;
	console.info(
		`[${req.method}]: [Category Articles] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = videos
		.slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3))
		.map((item) => ({
			...item,
			title: item.title + '-' + skip + '-' + (+(skip ?? 0) + +(limit ?? 0))
		}));
	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: {
			items: result as IVideoContent[],
			total: videos.length
		}
	};
};
export default withApiHandler(handler);
