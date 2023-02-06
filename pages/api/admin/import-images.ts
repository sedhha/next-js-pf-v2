import { IApiHandler } from '@/interfaces/api';
import { NextApiRequest } from 'next';
import { withPersonalProtect } from '@/middleware/withPersonalProtect';
import { uploadImagesToContentful } from '@/backend/contentful/upload';
const handler: IApiHandler<null> = async (req: NextApiRequest) => {
	const { body } = req;
	const parsedBody = JSON.parse(body);
	const result = await uploadImagesToContentful(parsedBody);
	return {
		statusCode: result.statusCode,
		json: result.json,
		error: result.error,
		message: result.message
	};
};

export default withPersonalProtect(handler);
