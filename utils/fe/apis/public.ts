export const PUBLIC_APIS = {
	WORK_EXPERIENCE: '/api/public/experience',
	CATEGORIES: '/api/public/categories',
	VIDEOS: '/api/public/videos',
	FEATURED_VIDOES: '/api/public/featured/videos',
	PROJECTS: '/api/public/projects',
	EVENTS: '/api/public/events',
	TESTIMONIALS: '/api/public/testimonials',
	TECH_STACK: '/api/public/tech-stack',
	BLOG: '/api/public/blog',
	TITLE_BY_VIDEO_ID: '/api/public/title-by-video-id',
	PROXY_API: '/api/public/proxy'
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

export const isDevelopmentEnv = process.env.NODE_ENV !== 'development';
const BASE_URL = isDevelopmentEnv
	? `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}`
	: '';
export const HELPER_APIS = {
	GEO: 'https://ipapi.co/json/',
	CSRF_REST_OPEN: isDevelopmentEnv
		? `http://localhost:4200/auth/get-session`
		: `${BASE_URL}/auth/get-session`,
	CSRF_REST: isDevelopmentEnv
		? `http://localhost:4200/auth/get-csrf`
		: `${BASE_URL}/auth/get-csrf`,
	CSRF_REST_START: isDevelopmentEnv
		? `http://localhost:4200/web-analytics/record-session`
		: `${BASE_URL}/web-analytics/record-session`,
	CSRF_REST_KILL: isDevelopmentEnv
		? `http://localhost:4200/web-analytics/close-session`
		: `${BASE_URL}/web-analytics/close-session`,
	CSRF_REST_RECORD_VIEW: isDevelopmentEnv
		? `http://localhost:4200/web-analytics/record-view`
		: `${BASE_URL}/web-analytics/record-view`,
	CSRF_REST_RECORD_EVENT: isDevelopmentEnv
		? `http://localhost:4200/web-analytics/record-event`
		: `${BASE_URL}/web-analytics/record-event`,
	WEB_SOCKET: isDevelopmentEnv
		? `ws://localhost:4200/track`
		: `wss://${process.env.NEXT_PUBLIC_WS_ENDPOINT}/track`
};

export const USER_APIS = {
	SUBSCRIBE_NEWSLETTER: '/api/auth/subscribe-newsletter'
};

export const ADMIN_APIS = {
	ADMIN: '/api/admin',
	CONTACT_FORMS: '/api/admin/forms',
	UPLOAD_IMAGES: '/api/admin/import-images'
};

// FE Routes

export const FE_ROUTES = {
	CATEGORY_BLOG_COMBO: '/blogs'
};
