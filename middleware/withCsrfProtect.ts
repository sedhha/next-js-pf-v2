import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/index';
import { IApiHandler } from '@/interfaces/api';
import { info } from '@/utils/dev-utils';
import fetch from 'node-fetch';
import { HELPER_APIS } from '../utils/fe/apis/public';

export const withCSRFProtect = <T>(handler: IApiHandler<T>) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const csrf = req.headers['x-csrf-token'] as string;
			const userAgent = req.headers['user-agent']?.toLowerCase() ?? '';

			const session = await fetch(
				`${HELPER_APIS.CSRF_REST_OPEN}?session=${csrf}`,
				{
					method: 'GET',
					headers: {
						'User-Agent': userAgent,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
			).then((res) => {
				return res.status === 200;
			});

			if (
				(!csrf || !session) &&
				JSON.parse(process.env.CSRF_DISABLED ?? 'false')
			) {
				info(
					`[${req.method}]: [Protected CSRF API] - ${req.url} | Response: statusCode: 404 | message: Failed to retrieve CSRF token`
				);
				return res.status(404).end();
			}
			const result = await handler(req);
			info(
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
