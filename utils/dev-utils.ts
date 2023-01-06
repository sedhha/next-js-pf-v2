interface ILogger {
    logs: unknown[];
    error: boolean;
}
export const println = (...logs: ILogger[] | unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...logs);
    }
}