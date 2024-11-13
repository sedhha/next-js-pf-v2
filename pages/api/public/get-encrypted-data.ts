import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { info } from '@/utils/dev-utils';
import { handleFirebaseEncryption } from '@/firebase/v3/encryptor';

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	info(`[${req.method}]: [Firebase-Encryption] | ${req.url}`);
	const { method, encryption, keyField } = req.query ?? {
		method: 'get',
		encryption: ''
	};
	const op = typeof method === 'object' ? method[0] ?? '' : (method as string);
	const encrypted =
		typeof encryption === 'string' ? encryption : (encryption ?? '')[0] ?? '';
	const key =
		typeof keyField === 'string' ? keyField : (keyField ?? '')[0] ?? '';
	return handleFirebaseEncryption(op, key, encrypted).then((result) => {
		if (result.error) {
			return res.status(400).json(result);
		}

		const statusCode = op.toLowerCase() === 'get' ? 200 : 201;
		return res.status(statusCode).json(result);
	});
};
export default handler;
