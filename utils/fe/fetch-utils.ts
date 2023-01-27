import { IFetchFEParams, IResponse, IResult } from '@/interfaces/api';

export const feFetch = async <T>({
	url,
	method,
	getText,
	headers,
	body,
	keepAlive
}: IFetchFEParams): Promise<IResponse<T>> => {
	try {
		const res = await fetch(url, {
			keepalive: keepAlive,
			method: method ?? 'GET',
			headers,
			body
		});

		if (!getText) {
			try {
				if (res.status === 204)
					return {
						error: false,
						status: res.status
					};
				const json = (await res.json()) as IResult<T>;
				return {
					error: res.status > 399,
					json: json.json,
					status: res.status,
					message: json.message
				};
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
