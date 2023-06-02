import { NextApiRequest, NextApiResponse } from 'next';
import { info } from '@/utils/dev-utils';
import { IProxyRequest } from '@/interfaces/gzb-proxy';
import { proxyGZBServer } from '@/backend/proxyHandler';

const handler = async <T>(req: NextApiRequest, res: NextApiResponse) => {
	const { body }: { body: IProxyRequest } = req;
	info(
		`Proxy Server Request: ${req.method} | URL: ${body.url} | Body: ${
			body.payload
		} | Headers: ${JSON.stringify(body.headers)}\n\n\n`
	);
	const result = await proxyGZBServer(body);
	return res
		.status(
			(result as { status: number }).status
				? (result as { status: number }).status
				: 500
		)
		.json(result ?? {});
};
export default handler;
