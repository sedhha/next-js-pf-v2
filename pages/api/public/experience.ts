import { NextApiRequest } from 'next';
import workExperience from '@/constants/cms-constants/backend/we.json';
import { IWork } from '@/interfaces/work';
import { ITotal } from '@/interfaces/api';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/index';

const handler: IApiHandler<ITotal<IWork>> = (req: NextApiRequest) => {
	const { limit, skip } = req.query;
	console.info(
		`[${req.method}]: [Work Experience] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = (workExperience as IWork[]).slice(
		+(skip ?? 0),
		+(skip ?? 0) + +(limit ?? 3)
	);
	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: { items: result, total: workExperience.length }
	};
};
export default withApiHandler(handler);
