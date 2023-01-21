import { IApiHandler } from '@/interfaces/api';
import { NextApiRequest } from 'next';
import { withPersonalProtect } from '@/middleware/withPersonalProtect';
const handler: IApiHandler<boolean> = async (_: NextApiRequest) => {
	return {
		statusCode: 200,
		json: true,
		error: false
	};
};

export default withPersonalProtect(handler);
