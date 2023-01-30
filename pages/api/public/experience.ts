import { NextApiRequest } from 'next';
import { IWork } from '@/interfaces/work';
import { ITotal } from '@/interfaces/api';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { queryWorkExperience } from '@/backend/contentful';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<ITotal<IWork>> = async (req: NextApiRequest) => {
	const { limit, skip } = req.query;
	info(
		`[${req.method}]: [Work Experience] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = await queryWorkExperience(+(limit ?? 3), +(skip ?? 0));

	const noData = result.items.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: result
	};
};
export default withApiHandler(handler);
