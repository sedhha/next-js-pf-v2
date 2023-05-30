import { IProxyRequest } from '@/interfaces/gzb-proxy';
import fetch, { Response } from 'node-fetch';

const getMethod = (method: string) =>
	['get', 'post', 'delete'].includes(method?.toLowerCase?.())
		? method?.toLowerCase?.()
		: 'get';

const getUrl = (url: string) => `https://blushing-yak-tutu.cyclic.app${url}`;

const returnResponse = async (
	response: Response
): Promise<{
	status?: number;
	errored?: boolean;
	content?: unknown;
	message?: string;
}> => {
	const status = response.status;
	return response
		.json()
		.then((data) => ({ status, content: data, error: false }))
		.catch((error) => ({ error: true, message: error.message }));
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
