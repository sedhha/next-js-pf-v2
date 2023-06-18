const priceListsCacheMap: Map<string, Promise<Response>> = new Map();

const cacheFetch = async <T>(
	url: string,
	isJson: boolean = true,
	init?: RequestInit
): Promise<T> => {
	const headers = JSON.stringify(init?.headers ?? '');
	const body = JSON.stringify(init?.body ?? '');
	const method = init?.method ?? '';
	const hash = `${url}-${headers}-${body}-${method}`;
	if (!priceListsCacheMap.get(hash)) {
		priceListsCacheMap.set(
			hash,
			fetch(url, init).then(async (res) => {
				if (res.status === 204) return isJson ? {} : '';
				return await (isJson ? res.json() : res.text());
			})
		);
	}
	return priceListsCacheMap.get(hash) as unknown as Promise<T>;
};
export { cacheFetch };
