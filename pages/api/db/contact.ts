import { NextApiRequest } from 'next';
import { IContactForm } from '@/interfaces/firebase/contact-form';
import { IApiHandler } from '@/interfaces/api';
import { uploadToStore } from '@/firebase/uploadContact';
import { withCSRFProtect } from '@/middleware/withCsrfProtect';

const handler: IApiHandler<null> = async (req: NextApiRequest) => {
	const payload = req.body as IContactForm;
	console.info(
		`[${req.method}]: [Contact Form] - Email: ${payload.email} | ${req.url}`
	);
	return uploadToStore(payload)
		.then(() => ({
			error: false,
			statusCode: 201
		}))
		.catch((error) => ({
			error: true,
			statusCode: 500,
			message: error.message
		}));
};

export default withCSRFProtect(handler);
