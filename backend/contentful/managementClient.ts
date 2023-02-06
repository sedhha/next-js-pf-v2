import { createClient } from 'contentful-management';
import { environmentCheck } from '@/utils/envVariablesCheck';

environmentCheck();
const environment = 'master';

const client = createClient({
	accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN as string
})
	.getSpace(process.env.CONTENTFUL_SPACE_ID as string)
	.then((space) => space.getEnvironment(environment));

export default client;
