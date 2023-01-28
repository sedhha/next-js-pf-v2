export interface ICategoryArticles {
	img: string;
	authorImg: string;
	authorName: string;
	title: string;
	excerpt: string;
	date: string;
	id: string;
}

export interface InfiniteCardProps {
	img: string;
	avatarImg: string;
	avatarTitle: string;
	title: string;
	excerpt: string;
	date: string;
	yt?: boolean;
	allowFullScreen?: boolean;
	overwriteImageClass?: string;
}
