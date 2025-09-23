export interface IBlog {
	mainCategory: string;
	title: string;
	featuredImage?: string;
	postDate: string;
	id: string;
	categoryID: string;
	excerpt?: string;
}
export interface Blog {
	selectedCategory: string;
	categories: string[];
	categoryFilteredBlogs: IBlog[];
}
