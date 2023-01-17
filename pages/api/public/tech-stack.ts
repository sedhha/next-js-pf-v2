import { NextApiRequest } from 'next';
import techStack from '@/constants/cms-constants/backend/tech-stacks.json';
import { ITotal } from '@/interfaces/api';
import { ITechStack } from '@/interfaces/tech-stack';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';

const handler: IApiHandler<ITotal<ITechStack>> = (req: NextApiRequest) => {
	const { search } = req.query;
	console.info(`[${req.method}]: [TechStack] - Search:${search} | ${req.url}`);
	const result = techStack.filter((item) =>
		item.name.toLowerCase().includes(((search as string) ?? '').toLowerCase())
	);

	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: { items: result, total: techStack.length }
	};
};
export default withApiHandler(handler);
