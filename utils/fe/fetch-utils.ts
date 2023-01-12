import { IFetchFEParams, IResponse } from "@/interfaces/api";

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
            const json = (await res.json()) as T;
            return { error: res.status > 399, statusCode: res.status, json };
        } catch (error) {
            return {
                error: true,
                statusCode: res.status,
                message: (error as { message: string }).message
            };
        }
    }

    try {
        const text = await res.text();
        return { error: res.status > 399, statusCode: res.status, text };
    } catch (error) {
        return {
            error: true,
            statusCode: res.status,
            message: (error as { message: string }).message
        };
    }
};
