import { NextApiRequest } from 'next';
import { IApiHandler } from '@/interfaces/api';
import { withCSRFProtect } from '@/middleware/withCsrfProtect';
import { signUpForEmailNewsletter } from '@/firebase/signup';

const handler: IApiHandler<null> = async (req: NextApiRequest) => {
	const {
		query: { email }
	} = req;
	return signUpForEmailNewsletter(email as string);
};

export default withCSRFProtect(handler);
