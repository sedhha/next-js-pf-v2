/*
curl 'https://graphql.contentful.com/content/v1/spaces/eowwrv5buqcq/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer x6cYdXasSQZ7kU31GHsalXGJa1kZsVcWK2gQIRGrom4' --data-binary '{"query":"query($limit:Int!,$skip:Int!) {\n workExperienceCollection(limit:$limit,skip:$skip) {\n  items {\n    orgName\n    designation\n    startDate\n    currentOrg\n    image {\n      url\n    }\n    description\n  }\n}\n}","variables":{"limit":20,"skip":1}}' --compressed
*/
import fetch from 'node-fetch';
import {
	blogWithCategoryAndIDQuery,
	blogWithPreRendering,
	getAllCategories,
	getBlogIdsByCategory,
	getBlogsByIds,
	workExperienceQuery
} from './query';
import { ITotal } from '@/interfaces/api';
import { IWork } from '@/interfaces/work';
import {
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
	const categoryFilter =
		typeof category !== 'string' ? category?.[0] ?? '' : category;
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
				ids: idsFilter
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			const result = (
				data as IContentfulResponse<IContentfulBlog>
			).data.output.items.find((item) =>
				item.categoriesCollection.items.find(
					(element) => element.slug.toLowerCase() === categoryFilter.toLowerCase()
				)
			);
			return result ?? null;
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
	const slug =
		typeof categorySlug === 'string' ? categorySlug : categorySlug?.[0];
	if (!slug || !slug?.length) return { total: 0, items: [] };

	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: getBlogIdsByCategory,
			variables: {
				categorySlug: slug.toLowerCase()
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			if (
				!(data as IContentfulResponse<ILinkedForm<IContentfulSys>>).data.output
					.items?.length
			)
				return { total: 0, items: [] };
			const result = (data as IContentfulResponse<ILinkedForm<IContentfulSys>>)
				.data.output.items[0];

			const ids = result.linkedFrom.output.items.map((item) => item.sys.id);
			return fetch(process.env.CONTENTFUL_BASE_URL as string, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Connection': 'keep-alive',
					'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
				},
				body: JSON.stringify({
					query: getBlogsByIds,
					variables: {
						ids,
						limit,
						skip
					}
				})
			}).then((res) =>
				res.json().then((data) => {
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
export {
	queryAllCategories,
	queryWorkExperience,
	queryBlogWithCategoryAndID,
	queryBlogsByCategory,
	getRequiredPreRenderingBlogAndCategories
};
