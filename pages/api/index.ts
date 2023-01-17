import { withApiHandler } from '@/middleware/withApiHandler';
import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import security from '@/backend/security/index.js';

const handler: IApiHandler<Record<string, string>> = (req: NextApiRequest) => {
	if (req.method !== 'GET' || !req.headers['sec-ch-ua-platform'])
		return {
			statusCode: 404
		};
	const ua = `${req.headers['user-agent']}::${req.headers['sec-ch-ua-platform']}`;
	const sessionKey = security.addSession(ua);
	console.log(security.activeSessions);
	return {
		statusCode: 200,
		json: { result: sessionKey }
	};
};

export default withApiHandler(handler);
