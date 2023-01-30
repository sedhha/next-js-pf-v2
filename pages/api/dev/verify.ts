import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { withCSRFProtect } from '@/middleware/withCsrfProtect';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<Record<string, string>> = (req: NextApiRequest) => {
	info(`[${req.method}]: [Dev] | ${req.url}`);
	return {
		statusCode: 200,
		json: { result: 'Hello' }
	};
};

export default withCSRFProtect(handler);
