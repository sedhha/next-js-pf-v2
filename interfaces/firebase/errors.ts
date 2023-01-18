export interface IProcess<T> {
	errored: boolean;
	message?: string;
	payload?: T;
}
