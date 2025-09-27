import blogData from '@/data/blogs.json';
import categoryData from '@/data/blog-categories.json';
import { queryBlogsByCategory } from '@/backend/contentful';
import { ICategoryArticles } from '@/interfaces/index';

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
	blogs: ICategoryArticles[];
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

export async function getBlogsByCategory(
	categorySlug: string,
	skip: number = 0,
	limit: number = 10
): Promise<BlogListResponse> {
	const categoryBlogs = await queryBlogsByCategory(categorySlug, limit, skip);

	return {
		blogs: categoryBlogs.items,
		total: categoryBlogs.total,
		hasMore: limit < categoryBlogs.total,
		currentPage: Math.floor(skip / (limit - skip)) + 1,
		totalPages: Math.ceil(categoryBlogs.total / (limit - skip))
	};
}

export function getFeaturedBlogs(): BlogPost[] {
	return blogData.filter((blog) => blog.featured);
}

export function getBlogById(id: string): BlogPost | null {
	return blogData.find((blog) => blog.id === id) || null;
}
