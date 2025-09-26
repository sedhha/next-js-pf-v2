export interface VideoContent {
	id: string;
	title: string;
	excerpt: string;
	date: string; // ISO
	author: string;
	authorAvatar?: string;
}

export interface Paged<T> {
	items: T[];
	total: number;
	limit: number;
	skip: number;
}
