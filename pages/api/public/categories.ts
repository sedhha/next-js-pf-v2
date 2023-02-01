import { NextApiRequest } from 'next';
import { ICategoryArticles } from '@/interfaces/index';
import { ITotal } from '@/interfaces/api';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { info } from '@/utils/dev-utils';
import { queryBlogsByCategory } from '@/backend/contentful';

const handler: IApiHandler<ITotal<ICategoryArticles>> = async (
	req: NextApiRequest
) => {
	const { limit, skip, category } = req.query;
	info(
		`[${req.method}]: [Category Articles] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	if (!category || isNaN(+(limit ?? '')) || isNaN(+(skip ?? '')))
		return { statusCode: 200, json: { items: [], total: 0 } };

	return queryBlogsByCategory(
		category,
		+(limit ?? 100) + +(skip ?? 0),
		+(skip ?? 0)
	).then((result) => ({ statusCode: 200, json: result }));
};
export default withApiHandler(handler);
