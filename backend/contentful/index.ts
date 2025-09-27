/*
curl 'https://graphql.contentful.com/content/v1/spaces/eowwrv5buqcq/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer x6cYdXasSQZ7kU31GHsalXGJa1kZsVcWK2gQIRGrom4' --data-binary '{"query":"query($limit:Int!,$skip:Int!) {\n workExperienceCollection(limit:$limit,skip:$skip) {\n  items {\n    orgName\n    designation\n    startDate\n    currentOrg\n    image {\n      url\n    }\n    description\n  }\n}\n}","variables":{"limit":20,"skip":1}}' --compressed
*/
import fetch from 'node-fetch';
import {
	blogWithCategoryAndIDQuery,
	blogWithPreRendering,
	getAllCategories,
	getBlogsByCategorySlugs,
	getCategoriesWithBlogCountQuery,
	workExperienceQuery
} from './query';
import { ITotal } from '@/interfaces/api';
import { IWork } from '@/interfaces/work';
import {
	IBlogShort,
	ICFWorkExperience,
	IContentfulBlog,
	IContentfulBlogs,
	IContentfulResponse,
	IContentfulSys,
	ILinkedForm,
	IPreRenderedResponse
} from '@/interfaces/contentful';
import { ICategoryArticles } from '@/interfaces/categories';

const standarizeContentfulWorkExperience = (
	data: IContentfulResponse<ICFWorkExperience>
): ITotal<IWork> => ({
	total: data.data.output.total ?? 0,
	items: data.data.output.items.map(
		(item) =>
			({
				org: item.orgName,
				designation: item.designation,
				current: item.currentOrg,
				img: item.image.url,
				description: item.description,
				startDate: new Date(item.startDate).getTime(),
				...(item.endDate && { endDate: new Date(item.endDate).getTime() })
			} as IWork)
	)
});
const queryWorkExperience = async (
	limit: number,
	skip: number
): Promise<ITotal<IWork>> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: workExperienceQuery,
			variables: {
				limit,
				skip
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			return standarizeContentfulWorkExperience(
				data as IContentfulResponse<ICFWorkExperience>
			);
		})
	);
};

const queryBlogWithCategoryAndID = async (
	category: string | string[],
	ids: string | string[]
): Promise<IContentfulBlog | null> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}
	const idsFilter = typeof ids === 'string' ? [ids] : ids;
	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: blogWithCategoryAndIDQuery,
			variables: {
				ids: idsFilter,
				slugs: typeof category === 'string' ? [category] : category
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			const finalResult = (data as IContentfulResponse<IContentfulBlog>)?.data
				?.output?.items;
			return finalResult[0] || null;
		})
	);
};

const queryBlogsByCategory = async (
	categorySlug: string | string[],
	limit: number,
	skip: number
): Promise<ITotal<ICategoryArticles>> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}
	const slugs = typeof categorySlug === 'string' ? [categorySlug] : categorySlug;

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: getBlogsByCategorySlugs,
			variables: {
				slugs,
				limit,
				skip
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			if (
				!(data as IContentfulResponse<ILinkedForm<IContentfulSys>>).data.output
					.items?.length
			)
				return { total: 0, items: [] };
			const result = (
				data as IContentfulResponse<IContentfulBlogs>
			).data.output.items.map(
				(item) =>
					({
						img: item?.primaryImage?.url,
						authorImg: item.author.avatar?.url,
						authorName: item.author.authorName,
						title: item.title,
						excerpt: item.excerpt,
						date: item.publishDate,
						id: item.sys.id,
						categories: item.categoriesCollection.items.map((cat) => ({
							title: cat.title,
							slug: cat.slug
						}))
					} as ICategoryArticles)
			);
			return {
				total:
					(data as IContentfulResponse<IContentfulBlogs>).data.output.total ??
					result.length,
				items: result
			};
		})
	);
};

const queryPreRenderBlogs = async (): Promise<IPreRenderedResponse> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: blogWithPreRendering,
			variables: null
		})
	}).then((res) =>
		res.json().then((data) => {
			return data as IPreRenderedResponse;
		})
	);
};

const queryAllCategories = async (): Promise<
	IContentfulResponse<{ slug: string; title: string }>
> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: getAllCategories,
			variables: null
		})
	}).then((res) =>
		res.json().then((data) => {
			return data as IContentfulResponse<{ slug: string; title: string }>;
		})
	);
};

const generateBlogCategoryIds = (
	blogs: IPreRenderedResponse,
	categories: IContentfulResponse<{ slug: string }>
): {
	categories: string[];
	blogCategoryCombination: { blogID: string; category: string }[];
} => {
	const blogCategoryCombos: { blogID: string; category: string }[] = [];
	blogs.data.output.items.forEach((blog) => {
		blog.categoriesCollection.items.forEach((category) => {
			blogCategoryCombos.push({ blogID: blog.sys.id, category: category.slug });
		});
	});
	const categoryOnlyItems = categories.data.output.items.map(
		(item) => item.slug
	);

	return {
		categories: categoryOnlyItems,
		blogCategoryCombination: blogCategoryCombos
	};
};

const getRequiredPreRenderingBlogAndCategories = async (): Promise<{
	categories: string[];
	blogCategoryCombination: { blogID: string; category: string }[];
}> => {
	const [blogs, categoryResults] = await Promise.all([
		queryPreRenderBlogs(),
		queryAllCategories()
	]);
	const result = generateBlogCategoryIds(blogs, categoryResults);
	return result;
};

const getCategoriesWithBlogCount = async (): Promise<
	{ title: string; total: number; slug: string }[]
> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: getCategoriesWithBlogCountQuery,
			variables: null
		})
	}).then((res) =>
		res.json().then((res) => {
			const finalItems =
				(
					(res as IContentfulResponse<{
						slug: string;
						title: string;
						linkedFrom: { blogCollection: { total: number } };
					}>) ?? { data: { output: { items: [] } } }
				)?.data?.output?.items ?? [];
			return finalItems
				.reduce((acc, curr) => {
					if (curr.title && curr.slug && curr.linkedFrom?.blogCollection?.total)
						acc.push({
							title: curr.title,
							total: curr.linkedFrom.blogCollection.total,
							slug: curr.slug
						});
					return acc;
				}, [] as { title: string; total: number; slug: string }[])
				.sort((a, b) => b.total - a.total)
				.slice(0, 4); // Max 4 categories
		})
	);
};

const queryAllBlogs = async (): Promise<
	{ category: string; slug: string }[]
> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: blogWithPreRendering,
			variables: null
		})
	}).then((res) =>
		res.json().then((data) => {
			const finalResult =
				(data as IContentfulResponse<IBlogShort>)?.data?.output?.items ?? [];
			const transformed = finalResult.reduce((acc, curr) => {
				const [category] = curr.categoriesCollection.items;
				if (category?.slug) {
					acc.push({
						slug: curr.sys.id,
						category: category.slug
					});
				}
				return acc;
			}, [] as { category: string; slug: string }[]);
			return transformed;
		})
	);
};

export {
	queryAllBlogs,
	queryAllCategories,
	queryWorkExperience,
	queryBlogWithCategoryAndID,
	queryBlogsByCategory,
	getCategoriesWithBlogCount,
	getRequiredPreRenderingBlogAndCategories
};
