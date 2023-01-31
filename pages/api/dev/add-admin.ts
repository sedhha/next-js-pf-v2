import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { info } from '@/utils/dev-utils';
import { withDevProtect } from '@/middleware/withDevProtect';
import { auth } from '@/firebase/index';

const handler: IApiHandler<string> = async (req: NextApiRequest) => {
	info(`[${req.method}]: [Dev] | ${req.url}`);
	const { uid } = req.query;
	if (typeof uid !== 'string')
		return {
			statusCode: 422,
			json: 'Unprocessable Entity'
		};
	await auth.setCustomUserClaims(uid, { admin: true });
	return {
		statusCode: 200,
		json: 'Admin Added'
	};
};

export default withDevProtect(handler);
