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
	TITLE_BY_VIDEO_ID: '/api/public/title-by-video-id'
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
			? `http://localhost:4200/auth/get-session`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/auth/get-session`,
	CSRF_REST:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/auth/get-csrf`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/auth/get-csrf`,
	CSRF_REST_START:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/web-analytics/record-session`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/web-analytics/record-session`,
	CSRF_REST_KILL:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/web-analytics/close-session`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/web-analytics/close-session`,
	CSRF_REST_RECORD_VIEW:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/web-analytics/record-view`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/web-analytics/record-view`,
	CSRF_REST_RECORD_EVENT:
		process.env.NODE_ENV === 'development'
			? `http://localhost:4200/web-analytics/record-event`
			: `https://${process.env.NEXT_PUBLIC_REST_ENDPOINT}/web-analytics/record-event`,
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
	CONTACT_FORMS: '/api/admin/forms',
	UPLOAD_IMAGES: '/api/admin/import-images'
};

// FE Routes

export const FE_ROUTES = {
	CATEGORY_BLOG_COMBO: '/blogs'
};
