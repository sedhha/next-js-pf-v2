export interface IContentfulResponse<T> {
	data: {
		output: {
			total?: number;
			items: T[];
		};
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
export interface IContentfulBlog {
	sys: {
		id: string;
	};
	title: string;
	content: string;
	author: IAuthor;
	excerpt: string;
	primaryImage: IContentfulImage;
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