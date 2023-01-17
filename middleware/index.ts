import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/index';
import { IApiHandler } from '@/interfaces/api';

export const withApiHandler = <T>(handler: IApiHandler<T>) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const result = await handler(req);
			return res.status(result.statusCode ?? 200).json({
				error: result.error,
				message: result.message,
				json: result.json,
				text: result.text
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
