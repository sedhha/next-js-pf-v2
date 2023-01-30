import { IApiHandler, IResult } from '@/interfaces/api';
import { NextApiRequest } from 'next';
import { withPersonalProtect } from '@/middleware/withPersonalProtect';
import { IContactForm } from '@/interfaces/firebase';
import { getForms } from '@/firebase/contactForms';
import { ITotal } from '@/interfaces/api';
import { info } from '@/utils/dev-utils';
const handler: IApiHandler<ITotal<IContactForm>> = async (
	req: NextApiRequest
) => {
	const { limit, skip } = req.query;
	info(
		`[${req.method}]: [Contact Forms] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);

	if (!limit || !skip)
		return {
			error: false,
			json: {
				total: 0,
				items: [] as IContactForm[]
			}
		} as IResult<ITotal<IContactForm>>;

	return getForms({
		limit: +(skip ?? 0) + +(limit ?? 3),
		skip: +(skip ?? 0)
	})
		.then(
			(res) =>
				({
					error: false,
					json: res
				} as IResult<ITotal<IContactForm>>)
		)
		.catch((err) => ({
			error: true,
			message: err.message,
			statusCode: 500
		}));
};

export default withPersonalProtect(handler);
