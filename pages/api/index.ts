import { withApiHandler } from '@/middleware/withApiHandler';
import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import security from '@/firebase/generateTokens';
import { getUAIdentifier } from '@/firebase/csrf';
import { info } from '@/utils/dev-utils';

const containsSomeFromExpected = (ua: string): boolean => {
	const searchParams = [
		'windows',
		'mac',
		'linux',
		'ios',
		'android',
		'iphone',
		'ios',
		'apple',
		'safari',
		'firefox'
	];
	const uaLower = ua.toLowerCase();
	const available = searchParams.find((element) => uaLower.includes(element));
	return available ? true : false;
};

const handler: IApiHandler<Record<string, string>> = async (
	req: NextApiRequest
) => {
	info(
		`[${req.method}]: [CSRF Token Issue] - ${req.url} | message: Requesting CSRF Token`
	);
	const userAgent = req.headers['user-agent']?.toLowerCase() ?? '';
	if (
		req.method !== 'GET' ||
		(!req.headers['sec-ch-ua-platform'] &&
			!containsSomeFromExpected(userAgent)) ||
		!req.headers['user-agent']
	)
		return {
			statusCode: 404
		};
	const ua = getUAIdentifier(
		req.headers['user-agent'],
		req.headers['sec-ch-ua-platform'] as string
	);
	const sessionKey = await security.addSession(ua);
	info(
		`[${req.method}]: [CSRF Token Issue] - ${req.url} | message: Request Completed | ${ua}`
	);
	return {
		statusCode: 200,
		json: { result: sessionKey }
	};
};

export default withApiHandler(handler);
