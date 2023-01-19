import { NextApiRequest } from 'next';
export interface IFetchFEParams {
	url: string;
	method?: string;
	getText?: boolean;
	headers?: Record<string, string>;
	body?: BodyInit | null;
	keepAlive?: boolean;
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
	req: NextApiRequest
) => Promise<IResult<T>> | IResult<T>;
