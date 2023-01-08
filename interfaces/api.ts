export interface IFetchFEParams {
	url: string;
	method?: string;
	getText?: boolean;
}

export interface IResponse<T> {
	error: boolean;
	statusCode: number;
	message?: string;
	json?: T;
	text?: string;
}
