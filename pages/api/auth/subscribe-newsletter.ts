import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { completeSubscription } from '@/firebase/signup';
import { withUserProtect } from '@/middleware/withUserProtect';
import { info } from '@/utils/dev-utils';

type IUserData = {
	'x-secure-uid': string;
	'x-secure-email': string;
};

const handler: IApiHandler<null> = async (req: NextApiRequest) => {
	const payload = req.headers as IUserData;
	info(
		`[${req.method}]: [Newsletter Test] - Email: ${payload['x-secure-email']} | ${req.url}`
	);
	const email = payload['x-secure-email'];
	const uid = payload['x-secure-uid'];
	return completeSubscription(email, uid);
};

export default withUserProtect(handler);
