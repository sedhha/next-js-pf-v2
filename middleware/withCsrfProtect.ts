import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/index';
import { IApiHandler } from '@/interfaces/api';
import security from '@/firebase/generateTokens';

export const withCSRFProtect = <T>(handler: IApiHandler<T>) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const csrf = req.headers['x-csrf-token'] as string;
			const ua = `${req.headers['user-agent']}::${req.headers['sec-ch-ua-platform']}`;
			const session = await security.getSession(csrf, ua);
			
			if (
				(!csrf || !session) &&
				JSON.parse(process.env.CSRF_DISABLED ?? 'false')
			) {
				console.info(
					`[${req.method}]: [Protected CSRF API] - ${req.url} | Response: statusCode: 404 | message: Failed to retrieve CSRF token`
				);
				return res.status(404).end();
			}
			const result = await handler(req);
			console.info(
				`[${req.method}]: [Protected CSRF API] - ${
					req.url
				} | Response: statusCode: ${result.statusCode} | message: ${
					result.message ?? 'Success'
				}`
			);
			return res.status(result.statusCode ?? 200).json({
				error: result.error,
				message: result.message,
				json: result.json,
				text: result.text,
				status: result.statusCode ?? 200
			} as IResponse<T>);
		} catch (e) {
			console.error(
				`Error Occured while processing Request: ${req.url} - ${
					(e as { message: string }).message
				}`
			);
			return res.status(500).json({
				error: true,
				message: (e as { message: string }).message
			});
		}
	};
};
