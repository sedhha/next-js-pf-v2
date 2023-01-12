export interface IFetchFEParams {
	url: string;
	method?: string;
	getText?: boolean;
	headers?: Record<string, string>;
	body?: BodyInit | null;
}

export interface IResponse<T> {
	error: boolean;
	statusCode: number;
	message?: string;
	json?: T;
	text?: string;
}

export interface ITotal<T> {
	items: T[];
	total: number;
}