export interface ICategoryArticles {
	img?: string;
	authorImg: string;
	authorName: string;
	title: string;
	excerpt: string;
	date: string;
	id: string;
	categories: { title: string; slug: string }[];
}

export interface InfiniteCardProps {
	img?: string;
	avatarImg?: string;
	avatarTitle: string;
	title: string;
	excerpt: string;
	date: string;
	id: string;
	yt?: boolean;
	allowFullScreen?: boolean;
	overwriteImageClass?: string;
	onCardClick?: () => void;
}
