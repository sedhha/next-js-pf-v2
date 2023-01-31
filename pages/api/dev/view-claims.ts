import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { info } from '@/utils/dev-utils';
import { withDevProtect } from '@/middleware/withDevProtect';
import { auth } from '@/firebase/index';

const handler: IApiHandler<Record<string, any>> = async (
	req: NextApiRequest
) => {
	info(`[${req.method}]: [Dev] | ${req.url}`);
	const { uid } = req.query;
	if (typeof uid !== 'string')
		return {
			statusCode: 422,
			json: {}
		};
	const claims = (await auth.getUser(uid)).customClaims;
	return {
		statusCode: 200,
		json: claims
	};
};

export default withDevProtect(handler);
