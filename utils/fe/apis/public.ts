export const PUBLIC_APIS = {
	WORK_EXPERIENCE: '/api/public/experience',
	CATEGORIES: '/api/public/categories',
	VIDEOS: '/api/public/videos',
	FEATURED_VIDOES: '/api/public/featured/videos',
	PROJECTS: '/api/public/projects',
	EVENTS: '/api/public/events',
	TESTIMONIALS: '/api/public/testimonials',
	TECH_STACK: '/api/public/tech-stack',
	BLOG: '/api/public/blog'
};

export const DB_APIS = {
	// needs CSRF Protection
	CONTACT: '/api/db/contact'
};

export const AUTH_APIS = {
	CSRF: '/api'
};

export const ANALYTICS_APIS = {
	RECORD: '/api/analytics/record',
	CLOSE: '/api/analytics/close',
	SIGNUP: '/api/analytics/signup',
	TRACK: '/api/analytics/track'
};

export const HELPER_APIS = {
	GEO: 'https://ipapi.co/json/',
	CSRF_REST_OPEN:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/rest/open/add-session`
			: `https://${process.env.NEXT_PUBLIC_WS_ENDPOINT}/open/add-session`,
	CSRF_REST:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/rest/add-session`
			: `https://${process.env.NEXT_PUBLIC_WS_ENDPOINT}/rest/add-session`,
	CSRF_REST_GET_SESSION:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/rest/get-session`
			: `https://${process.env.NEXT_PUBLIC_WS_ENDPOINT}/rest/get-session`,
	WEB_SOCKET:
		process.env.NODE_ENV === 'development'
			? `ws://localhost:4200/track`
			: `wss://${process.env.NEXT_PUBLIC_WS_ENDPOINT}/track`
};

export const USER_APIS = {
	SUBSCRIBE_NEWSLETTER: '/api/auth/subscribe-newsletter'
};

export const ADMIN_APIS = {
	ADMIN: '/api/admin',
	CONTACT_FORMS: '/api/admin/forms'
};

// FE Routes

export const FE_ROUTES = {
	CATEGORY_BLOG_COMBO: '/blogs'
};
