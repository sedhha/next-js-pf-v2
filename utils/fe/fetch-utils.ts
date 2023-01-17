import { IFetchFEParams, IResponse } from '@/interfaces/api';

export const feFetch = async <T>({
	url,
	method,
	getText,
	headers,
	body
}: IFetchFEParams): Promise<IResponse<T>> => {
	const res = await fetch(url, {
		method: method ?? 'GET',
		headers,
		body
	});

	if (!getText) {
		try {
			const { json } = (await res.json()) as { json: T };
			return { error: res.status > 399, json, status: res.status };
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
};
