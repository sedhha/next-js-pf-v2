import { ITotal } from '@/interfaces/api';
import { ICategoryArticles } from '@/interfaces/categories';
import { IBlog } from './types';
import { IContentfulResponse } from '@/interfaces/contentful';

// Enhanced category color mapping with consistent emerald-purple theme
export const getCategoryTheme = (category: string) => {
	const themes: {
		[key: string]: {
			primary: string;
			secondary: string;
			bg: string;
			border: string;
			gradient: string;
			icon: string;
		};
	} = {
		'IoT': {
			primary: 'emerald-400',
			secondary: 'emerald-300',
			bg: 'emerald-500/10',
			border: 'emerald-500/30',
			gradient: 'from-emerald-400 to-cyan-400',
			icon: '🔌'
		},
		'Mechanical': {
			primary: 'cyan-400',
			secondary: 'cyan-300',
			bg: 'cyan-500/10',
			border: 'cyan-500/30',
			gradient: 'from-cyan-400 to-emerald-400',
			icon: '⚙️'
		},
		'Life': {
			primary: 'purple-400',
			secondary: 'purple-300',
			bg: 'purple-500/10',
			border: 'purple-500/30',
			gradient: 'from-purple-400 to-violet-400',
			icon: '💭'
		},
		'Web Development': {
			primary: 'violet-400',
			secondary: 'violet-300',
			bg: 'violet-500/10',
			border: 'violet-500/30',
			gradient: 'from-violet-400 to-purple-400',
			icon: '💻'
		},
		'Mobile App Development': {
			primary: 'cyan-400',
			secondary: 'cyan-300',
			bg: 'cyan-500/10',
			border: 'cyan-500/30',
			gradient: 'from-cyan-400 to-emerald-400',
			icon: '📱'
		},
		'Automation': {
			primary: 'emerald-400',
			secondary: 'emerald-300',
			bg: 'emerald-500/10',
			border: 'emerald-500/30',
			gradient: 'from-emerald-400 to-cyan-400',
			icon: '🤖'
		}
	};
	return (
		themes[category] || {
			primary: 'violet-400',
			secondary: 'violet-300',
			bg: 'violet-500/10',
			border: 'violet-500/30',
			gradient: 'from-violet-400 to-purple-400',
			icon: '📝'
		}
	);
};

export const toFEBlog = (data: ITotal<ICategoryArticles>): IBlog[] => {
	return data.items.reduce((acc, blog) => {
		const { title = '', slug = '' } = blog.categories?.[0] ?? {};
		if (!title || !slug) return acc;
		acc.push({
			id: blog.id,
			title: blog.title,
			mainCategory: title,
			featuredImage: blog.img,
			postDate: blog.date,
			categoryID: slug,
			excerpt: blog.excerpt
		});
		return acc;
	}, [] as IBlog[]);
};

export const toFECategory = (
	result: IContentfulResponse<{ slug: string; title: string }>
): { title: string; slug: string }[] => {
	return result.data.output.items.map((item) => ({
		title: item.title,
		slug: item.slug
	}));
};
