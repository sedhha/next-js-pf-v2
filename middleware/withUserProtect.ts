import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '@/interfaces/index';
import { IApiHandler } from '@/interfaces/api';
import { auth } from '@/firebase/index';

export const withUserProtect = <T>(handler: IApiHandler<T>) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			console.info(`[${req.method}]: [Protected CSRF API] - ${req.url}`);
			const { authorization } = req.headers;
			if (!authorization) return res.status(401).end();
			const [tokenType, tokenValue] = authorization.split(' ');
			if (tokenType.toLowerCase() !== 'bearer' || !tokenValue)
				return res.status(401).end();

			const verified = await auth
				.verifyIdToken(tokenValue)
				.then((user) => ({ uid: user.uid, email: user.email }))
				.catch((e) => {
					console.error('Error Occured: - ', e.message, e.code);
					return null;
				});
			if (!verified) return res.status(401).end();
			req.headers['x-secure-uid'] = verified.uid;
			req.headers['x-secure-email'] = verified.email;
			const result = await handler(req);
			return res.status(result.statusCode ?? 200).json({
				error: result.error ?? true,
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
