export interface IPopup {
	type: 'error' | 'success' | 'pending';
	title: string;
	description: string;
	timeout: number;
}