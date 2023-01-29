import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { withCSRFProtect } from '@/middleware/withCsrfProtect';
import { IFEGeo } from '@/interfaces/analytics';
import operationHandler from '@/firebase/v2/analytics';
import { FEventData } from '@/interfaces/analytics';
import { getUAIdentifier } from '@/backend/firebase/csrf';

type ExpectedBody = IFEGeo | FEventData;
const handler: IApiHandler<string> = async (req: NextApiRequest) => {
	const { method, body, query } = req;
	if (method !== 'POST')
		return {
			statusCode: 422,
			error: true
		};
	const { opType } = query;
	if (typeof opType !== 'string')
		return {
			statusCode: 422,
			error: true
		};
	const csrfToken = req.headers['x-csrf-token'] as string;
	const ua = getUAIdentifier(
		req.headers['user-agent'],
		req.headers['sec-ch-ua-platform'] as string
	);

	const result = await operationHandler(
		opType,
		csrfToken,
		ua,
		body as ExpectedBody
	);
	if (result.error)
		return {
			statusCode: 422,
			error: true
		};
	return {
		statusCode: 201,
		error: false,
		json: result.data as string
	};
};

export default withCSRFProtect(handler);
