export interface IVideoContent {
	id: string;
	title: string;
	excerpt: string;
	yt: boolean;
	date: string;
	author: string;
	authorAvatar: string;
	tags?: string[];
	order: number;
}

export interface IFeaturedVideo {
	highlighted: IVideoContent;
	top4: IVideoContent[];
}