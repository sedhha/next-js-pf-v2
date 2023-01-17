import { withApiHandler } from '@/middleware/withApiHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { IApiHandler } from '@/interfaces/api';

const handler: IApiHandler<Record<string, string>> = (req: NextApiRequest) => {
	return {
		statusCode: 200,
		json: { hello: 'World' }
	};
};

export default withApiHandler(handler);
