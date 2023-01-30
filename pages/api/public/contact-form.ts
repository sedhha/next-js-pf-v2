import { NextApiRequest } from 'next';
import categoryArticles from '@/constants/cms-constants/backend/category-articles.json';
import { ICategoryArticles } from '@/interfaces/index';
import { ITotal } from '@/interfaces/api';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<ITotal<ICategoryArticles>> = (
	req: NextApiRequest
) => {
	const { limit, skip, category } = req.query;
	info(
		`[${req.method}]: [Category Articles] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = (
		categoryArticles[
			(category ?? '') as string as keyof typeof categoryArticles
		] ?? []
	)
		.slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3))
		.map((item) => ({
			...item,
			title: item.title + '-' + skip + '-' + (+(skip ?? 0) + +(limit ?? 0))
		}));
	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: {
			items: result as ICategoryArticles[],
			total: (
				categoryArticles[
					(category ?? '') as string as keyof typeof categoryArticles
				] ?? []
			).length
		}
	};
};
export default withApiHandler(handler);
