import { IProxyRequest } from '@/interfaces/gzb-proxy';
import { info } from '@/utils/dev-utils';
import { isDevelopmentEnv } from '@/utils/fe/apis/public';
import fetch, { Response } from 'node-fetch';

const getMethod = (method: string) =>
	['get', 'post', 'delete'].includes(method?.toLowerCase?.())
		? method?.toLowerCase?.()
		: 'get';

const getUrl = (url: string) =>
	isDevelopmentEnv
		? `http://localhost:4200${url}`
		: `https://blushing-yak-tutu.cyclic.app${url}`;

const returnResponse = async (
	response: Response
): Promise<{
	status?: number;
	errored?: boolean;
	content?: unknown;
	message?: string;
}> => {
	const status = response.status;
	try {
		return response
			.json()
			.then((data) => {
				info(
					`Proxy Server Success Response: ${status} | Content: ${JSON.stringify(
						data
					)}\n\n\n`
				);
				return { status, content: data, error: false };
			})
			.catch((error) => {
				info(
					`Proxy Server Error Response: ${status} | Message: ${error.message}\n\n\n`
				);
				return { errored: true, message: error.message };
			});
	} catch (er) {
		console.log('Error occured = ', (er as { message: string }).message);
		return { errored: true, message: (er as { message: string }).message };
	}
};

export const proxyGZBServer = async (reqObject: IProxyRequest) => {
	const { url, method = 'get', payload = '{}', headers = {} } = reqObject;
	if (
		!url ||
		!method ||
		!(typeof url === 'string') ||
		!(typeof method === 'string')
	)
		return { code: 400, content: { message: 'Invalid Request' } };
	const reqMethod = getMethod(method);
	const reqUrl = getUrl(url);
	info(
		`Proxy to External Server Request: ${reqMethod} | URL: ${reqUrl} | Body: ${JSON.stringify(
			payload
		)} | Headers: ${JSON.stringify(headers)}\n\n\n`
	);
	switch (reqMethod) {
		case 'get': {
			return fetch(reqUrl, {
				method: 'get',
				headers: headers
			}).then(returnResponse);
		}
		case 'post': {
			return fetch(reqUrl, {
				method: 'post',
				headers: headers,
				body: payload
			}).then(returnResponse);
		}
		case 'delete': {
			return fetch(reqUrl, {
				method: 'delete',
				headers: headers
			}).then(returnResponse);
		}
	}
};
