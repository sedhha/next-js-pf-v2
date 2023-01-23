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
	userMessageMetadata: 'user-message-metadata',
	csrfTokens: 'csrf-token'
};

const formRootMessagesPath = (isProd: boolean) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.userMessageMetadata}`;

const formMessagesPath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.userMessages}/${uid}/messages`;

const lastModifiedPath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${
		dbPaths.userMessageMetadata
	}/${uid}/lastModified`;

const emailRefPath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${
		dbPaths.userMessageMetadata
	}/${uid}/emailOfSender`;

const readRecipientPath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.userMessageMetadata}/${uid}/readByMe`;

const readRecipientPathUser = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.userMessageMetadata}/${uid}/readByUser`;

const latestMessagePath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-${
		dbPaths.userMessageMetadata
	}/${uid}/latestMessage`;

const typingUserPath = (isProd: boolean, uid: string, isVisitor: boolean) =>
	isVisitor
		? `${isProd ? 'prod' : 'dev'}-${
				dbPaths.userMessageMetadata
		  }/${uid}/visitorTyping`
		: `${isProd ? 'prod' : 'dev'}-${dbPaths.userMessageMetadata}/${uid}/meTyping`;

const formCSRFPath = (isProd: boolean) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.csrfTokens}`;
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

export {
	formRootMessagesPath,
	formMessagesPath,
	lastModifiedPath,
	emailRefPath,
	readRecipientPath,
	latestMessagePath,
	typingUserPath,
	formCSRFPath,
	readRecipientPathUser
};