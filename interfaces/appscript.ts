export interface IAppScriptReques<T> {
    apiKey: string;
    opType: string;
    opProps: T;
}

export interface ISendEmail {
    searchString?: string;
    to: string;
    subject: string;
    body: string;
    htmlBody: string;
    bccs:
    string;
    name: string;
}