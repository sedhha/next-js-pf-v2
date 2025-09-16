import { NextApiRequest } from 'next';
export interface IFetchFEParams {
	url: string;
	method?: string;
	getText?: boolean;
	headers?: Record<string, string>;
	body?: unknown | null;
	keepAlive?: boolean;
	sendToProxy?: boolean;
}

export interface IResponse<T> {
	status: number;
	error: boolean;
	message?: string;
	json?: T;
	text?: string;
}

export interface ITotal<T> {
	items: T[];
	total: number;
}

export interface IResult<T> {
	statusCode: number;
	error?: boolean;
	message?: string;
	json?: T;
	text?: string;
}

export type IApiHandler<T> = (
	// eslint-disable-next-line no-unused-vars
	req: NextApiRequest
) => Promise<IResult<T>> | IResult<T>;
