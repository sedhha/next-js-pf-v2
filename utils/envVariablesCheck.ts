const mustHaveEnvironmentVariables = [
	'CONTENTFUL_SPACE_ID',
	'CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN',
	'CONTENTFUL_BASE_URL',
	'CONTENTFUL_ACCESS_TOKEN',
	'CSRF_DISABLED',
	'CONTENTFUL_RESTORATION_ID_SECRET',
	'APPSCRIPT_API_KEY',
	'APPSCRIPT_INSECURE_DEPLOYMENT_ID',
	'APPSCRIPT_DEPLOYMENT_ID',
	'FB_ADMIN_PROJECT_ID',
	'FB_ADMIN_CLIENT_EMAIL',
	'FB_ADMIN_PRIVATE_KEY',
	'NEXT_PUBLIC_WS_ENDPOINT',
	'IP_LOOKUP_API',
	'NEXT_PUBLIC_WEBSITE',
	'NEXT_PUBLIC_ANALYTICS_API_KEY',
	'NEXT_PUBLIC_ANALYTICS_ENABLED',
	'NEXT_PUBLIC_FB_DATABASE_URL'
];

export const environmentCheck = () =>
	mustHaveEnvironmentVariables.forEach((element) => {
		if (process.env[element] === undefined) {
			throw new Error(
				`${element} is a must have environment variable. But it was not found in configuration file.`
			);
		}
	});
