import { throwAndLogError } from '@/utils/dev-utils';
const getEnvPrefix = () => {
	switch (process.env.NODE_ENV) {
		case 'production':
			return 'prod';
		case 'development':
		default:
			return 'dev';
	}
};
export const storeCollectionPaths = {
	feedback: 'feedback',
	sessions: 'sessions',
	events: 'events'
};

export const getCollectionPath = (path: string): string => {
	const prefix = getEnvPrefix();
	const storagePath =
		storeCollectionPaths[path as keyof typeof storeCollectionPaths];
	if (!storagePath) {
		throwAndLogError(
			`Path for ${path} does not exist. Make sure you want to have a dynamic collection.`
		);
		return '';
	}
	return `${prefix}-${storagePath}`;
};

export const dbPaths = {
	userMessages: 'user-messages',
	csrfTokens: 'csrf-token'
};

export const getDBPath = (path: string): string => {
	const prefix = getEnvPrefix();
	const storagePath = dbPaths[path as keyof typeof dbPaths];
	if (!storagePath) {
		throwAndLogError(
			`Path for ${path} does not exist. Make sure you want to have a dynamic collection.`
		);
		return '';
	}
	return `${prefix}-${storagePath}`;
};

export const formCSRFPath = (isProd: boolean) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.csrfTokens}`;
