import { IFetchFEParams, IResponse, IResult } from '@/interfaces/api';
import { PUBLIC_APIS, isDevelopmentEnv } from './apis/public';

const getUserAgentInfo = (): {
	'user-agent': string;
	'sec-ch-ua': string;
} => {
	const userAgent = navigator?.userAgent ?? 'unknown-agent';
	//@ts-ignore
	const secChUa = navigator?.userAgentData?.brands
		?.map((brand: { brand: string; version: string }) => {
			return brand.brand + ' ' + brand.version;
		})
		.join(', ');
	return {
		'sec-ch-ua': secChUa,
		'user-agent': userAgent
	};
};

export const feFetch = async <T>({
	url,
	method,
	getText,
	headers,
	body,
	keepAlive,
	sendToProxy
}: IFetchFEParams): Promise<IResponse<T>> => {
	if (sendToProxy) {
		const completeHeaders = { ...getUserAgentInfo(), ...headers };
		if (JSON.parse(process.env.NEXT_PUBLIC_RUN_ANALYTICS ?? 'false')) {
			return fetch(PUBLIC_APIS.PROXY_API, {
				keepalive: true,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url,
					method: method ?? 'GET',
					headers: completeHeaders,
					payload: body
				})
			}).then((res) =>
				res.json().then((data) => {
					return {
						status: data.code,
						error: data.error,
						json: data.content.json
					};
				})
			);
		} else return { status: 200, error: false };
	}
	try {
		const res = await fetch(url, {
			keepalive: keepAlive,
			method: method ?? 'GET',
			headers,
			body
		});

		if (!getText) {
			try {
				if (res.status === 204) {
					return {
						error: false,
						status: res.status
					};
				} else {
					const json = (await res.json()) as IResult<T>;
					return {
						error: res.status > 399,
						json: json.json,
						status: res.status,
						message: json.message
					};
				}
			} catch (error) {
				return {
					error: true,
					message: (error as { message: string }).message,
					status: res.status
				};
			}
		}

		try {
			const text = await res.text();
			return { error: res.status > 399, text, status: res.status };
		} catch (error) {
			return {
				error: true,
				message: (error as { message: string }).message,
				status: res.status
			};
		}
	} catch (error) {
		console.error(
			`Error Occured while sending request: ${
				(error as { message: string }).message
			}`
		);
		return {
			error: true,
			message: (error as { message: string }).message,
			status: 500
		};
	}
};
