import blogData from '@/data/blogs.json';
import categoryData from '@/data/blog-categories.json';

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	category: string;
	excerpt: string;
	content: string;
	featuredImage: string;
	publishDate: string;
	author: {
		name: string;
		avatar: string;
		bio: string;
	};
	readTime: number;
	tags: string[];
	featured: boolean;
}

export interface BlogCategory {
	id: string;
	name: string;
	slug: string;
	icon: string;
	description: string;
	theme: {
		primary: string;
		secondary: string;
		bg: string;
		border: string;
		gradient: string;
	};
}

export interface BlogListResponse {
	blogs: BlogPost[];
	total: number;
	hasMore: boolean;
	currentPage: number;
	totalPages: number;
}

export function getAllCategories(): BlogCategory[] {
	return categoryData;
}

export function getCategoryBySlug(slug: string): BlogCategory | null {
	return categoryData.find((category) => category.slug === slug) || null;
}

export function getBlogsByCategory(
	categorySlug: string,
	from: number = 0,
	to: number = 10
): BlogListResponse {
	const categoryBlogs = blogData.filter(
		(blog) => blog.category === categorySlug
	);
	const paginatedBlogs = categoryBlogs.slice(from, to);

	return {
		blogs: paginatedBlogs,
		total: categoryBlogs.length,
		hasMore: to < categoryBlogs.length,
		currentPage: Math.floor(from / (to - from)) + 1,
		totalPages: Math.ceil(categoryBlogs.length / (to - from))
	};
}

export function getAllBlogs(
	from: number = 0,
	to: number = 10
): BlogListResponse {
	const paginatedBlogs = blogData.slice(from, to);

	return {
		blogs: paginatedBlogs,
		total: blogData.length,
		hasMore: to < blogData.length,
		currentPage: Math.floor(from / (to - from)) + 1,
		totalPages: Math.ceil(blogData.length / (to - from))
	};
}

export function getFeaturedBlogs(): BlogPost[] {
	return blogData.filter((blog) => blog.featured);
}

export function getBlogById(id: string): BlogPost | null {
	return blogData.find((blog) => blog.id === id) || null;
}
