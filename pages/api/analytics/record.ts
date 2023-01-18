import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { validateSchema } from '@/utils/validate-request';
import { analyticsDataSchema } from '@/utils/schemas/analytics';
import { withCSRFProtect } from '@/middleware/withCsrfProtect';
import { recordSession } from '@/firebase/analytics';
import { IFEData } from '@/interfaces/analytics';

const handler: IApiHandler<Record<string, string>> = async (
	req: NextApiRequest
) => {
	const { method, body, headers } = req;
	const csrf = headers['x-csrf-token'] as string;
	const ua = `${headers['user-agent']}::${headers['sec-ch-ua-platform']}`;
	if (method !== 'POST')
		return {
			statusCode: 422,
			message: 'Unable to process the request'
		};
	const valid = validateSchema(analyticsDataSchema, body);
	if (!valid.payload || valid.errored)
		return {
			statusCode: 422,
			message: valid.message
		};
	return recordSession(csrf, ua, valid.payload as IFEData)
		.then((res) => ({
			statusCode: 201,
			message: res.message
		}))
		.catch((error) => ({
			statusCode: 500,
			message: error.message
		}));
};

export default withCSRFProtect(handler);
