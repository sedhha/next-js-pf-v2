import { withApiHandler } from '@/middleware/withApiHandler';
import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import security from '@/firebase/generateTokens';

const handler: IApiHandler<Record<string, string>> = async (
	req: NextApiRequest
) => {
	if (req.method !== 'GET' || !req.headers['sec-ch-ua-platform'])
		return {
			statusCode: 404
		};
	const ua = `${req.headers['user-agent']}::${req.headers['sec-ch-ua-platform']}`;
	const sessionKey = await security.addSession(ua);
	return {
		statusCode: 200,
		json: { result: sessionKey }
	};
};

export default withApiHandler(handler);
