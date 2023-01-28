import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { IContentfulBlog } from '@/interfaces/contentful';
import { queryBlogWithCategoryAndID } from '@/backend/contentful';

const handler: IApiHandler<IContentfulBlog> = (req: NextApiRequest) => {
	const { blogID, category } = req.query;
	console.info(
		`[${req.method}]: [Category Articles] - ID: ${blogID} | Category: ${category} | ${req.url}`
	);

	if (!blogID || !category)
		return {
			statusCode: 204,
			error: false
		};
	return queryBlogWithCategoryAndID(category, blogID)
		.then((data) => {
			if (data === null)
				return {
					statusCode: 204
				};
			else
				return {
					statusCode: 200,
					error: false,
					json: data
				};
		})
		.catch((err) => ({
			statusCode: 500,
			error: true,
			message: err.message
		}));
};
export default withApiHandler(handler);
