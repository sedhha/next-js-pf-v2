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

export const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const BASE_URL = !isDevelopmentEnv
	? `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}`
	: 'http://localhost:4200';
export const HELPER_APIS = {
	GEO: 'https://ipapi.co/json/',
	// IP: 'https://checkip.amazonaws.com', // Only for BE
	IP: 'https://api.db-ip.com/v2/free/self',
	ID: '/api/public/get-id',
	IP_SERVER: '/api/public/ip-lookup',
	CSRF_REST_OPEN: `${BASE_URL}/auth/get-session`,
	CSRF_REST: `/auth/get-csrf`,
	CSRF_REST_START: `/web-analytics/record-session`,
	CSRF_REST_KILL: `/web-analytics/close-session`,
	CSRF_REST_RECORD_VIEW: `/web-analytics/record-view`,
	CSRF_REST_RECORD_EVENT: `/web-analytics/record-event`,
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

export const V2_APIS = {
	CONTACT: '/apis/v2/contact'
};
