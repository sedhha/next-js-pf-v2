import { NextApiRequest } from 'next';
import testimonials from '@/constants/cms-constants/backend/testimonial.json';
import { ITotal } from '@/interfaces/api';
import { ITestimonials } from '@/interfaces/testimonials';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<ITotal<ITestimonials>> = (req: NextApiRequest) => {
	const { limit, skip } = req.query;
	info(
		`[${req.method}]: [Testimonial] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = testimonials.slice(
		+(skip ?? 0),
		+(skip ?? 0) + +(limit ?? 3)
	) as ITestimonials[];
	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: { items: result, total: testimonials.length }
	};
};
export default withApiHandler(handler);
