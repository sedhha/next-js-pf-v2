export interface IContentfulResponse<T> {
	data: {
		output: {
			total?: number;
			items: T[];
		};
	};
}

export interface ILinkedForm<T> {
	linkedFrom: {
		output: {
			total?: number;
			items: T[];
		};
	};
}

export interface IContentfulSys {
	sys: {
		id: string;
	};
}

export interface IAuthor {
	authorName: string;
	bio: string;
	avatar?: IContentfulImage;
}

export interface IContentfulImage {
	title?: string;
	description?: string;
	url: string;
}

export interface IMultiItemResult<T> {
	items: T[];
}

export interface ICategories {
	title?: string;
	slug: string;
}

export interface ICategoriesWithTitle {
	title: string;
	slug: string;
}
export interface IContentfulBlog {
	sys: {
		id: string;
	};
	title: string;
	content: string;
	author: IAuthor;
	excerpt: string;
	primaryImage?: IContentfulImage;
	categoriesCollection: IMultiItemResult<ICategories>;
	publishDate: string;
	youtubeUrl?: string;
}

export interface IBlogShort {
	sys: {
		id: string;
	};
	categoriesCollection: IMultiItemResult<ICategories>;
}

export interface ICFWorkExperience {
	orgName: string;
	designation: string;
	startDate: string;
	endDate?: string;
	currentOrg: boolean;
	image: IContentfulImage;
	description: string;
}
export interface IContentfulBlogs extends IContentfulSys {
	title: string;
	excerpt: string;
	publishDate: string;
	primaryImage?: IContentfulImage;
	author: IAuthor;
	categoriesCollection: IMultiItemResult<ICategoriesWithTitle>;
}

export interface IMainPageBlog {
	mainCategory: string;
	title: string;
	featuredImage?: string;
	postDate: string;
	id: string;
	categoryID: string;
	excerpt: string;
}

export interface IContentfulMainBlogPage {
	mainBlog: IMainPageBlog[];
	relatedBlogs: IMainPageBlog[];
}

export type IPreRenderedResponse = IContentfulResponse<{
	categoriesCollection: {
		items: { slug: string }[];
	};
	sys: { id: string };
}>;

export interface IContentfulUploadImage {
	url: string;
	title: string;
	description: string;
	contentType: string;
	fileName: string;
}
