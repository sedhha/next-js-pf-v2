interface IProxyRequest {
	url: string;
	method?: string;
	payload: string;
	headers: Record<string, string>;
}

export type { IProxyRequest };
