import { IRoutes } from '@/interfaces/ui';

export const routes = {
	HOME_ROUTE: '',
	ABOUT_ROUTE: 'about',
	EXPERIENCE_ROUTE: 'experience',
	BLOG_ROUTE: 'blog',
	CONTACT_ROUTE: 'contact',
	PROJECT_ROUTE: 'project',
	AWARDS_ROUTE: 'awards',
	VIDEOS_ROUTE: 'videos',
	TECH_STACK: 'TECH_STACK',
	TESTIMONIALS: 'TESTIMONIALS'
};

export const routeKeys = {
	HOME_ROUTE: 'HOME_ROUTE',
	ABOUT_ROUTE: 'ABOUT_ROUTE',
	EXPERIENCE_ROUTE: 'EXPERIENCE_ROUTE',
	BLOG_ROUTE: 'BLOG_ROUTE',
	CONTACT_ROUTE: 'CONTACT_ROUTE',
	PROJECT_ROUTE: 'PROJECT_ROUTE',
	AWARDS_ROUTE: 'AWARDS_ROUTE',
	VIDEOS_ROUTE: 'VIDEOS_ROUTE',
	TECH_STACK: 'TECH_STACK',
	TESTIMONIALS: 'TESTIMONIALS'
} as const;

export const routers: IRoutes = [
	{
		routeName: routeKeys.ABOUT_ROUTE,
		routeDisplay: 'About'
	},
	{
		routeName: routeKeys.EXPERIENCE_ROUTE,
		routeDisplay: 'Experience'
	},
	{
		routeName: routeKeys.BLOG_ROUTE,
		routeDisplay: 'Blog'
	},
	{
		routeName: routeKeys.CONTACT_ROUTE,
		routeDisplay: 'Contact'
	},
	{
		routeName: routeKeys.PROJECT_ROUTE,
		routeDisplay: 'Project'
	},
	{
		routeName: routeKeys.AWARDS_ROUTE,
		routeDisplay: 'Awards'
	},
	{
		routeName: routeKeys.VIDEOS_ROUTE,
		routeDisplay: 'Videos'
	},
	{
		routeName: routeKeys.TECH_STACK,
		routeDisplay: 'Tech Stack'
	},
	{
		routeName: routeKeys.TESTIMONIALS,
		routeDisplay: 'Testimonials'
	}
];
export type AvailableRoutes = keyof typeof routes;
