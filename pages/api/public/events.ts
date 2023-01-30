import { NextApiRequest } from 'next';
import events from '@/constants/cms-constants/backend/events-participations.json';
import { ITotal } from '@/interfaces/api';
import { IEventAndParticipations } from '@/interfaces/events-and-participations';
import { IApiHandler } from '@/interfaces/api';
import { withApiHandler } from '@/middleware/withApiHandler';
import { info } from '@/utils/dev-utils';

const handler: IApiHandler<ITotal<IEventAndParticipations>> = (
	req: NextApiRequest
) => {
	const { limit, skip } = req.query;
	info(
		`[${req.method}]: [Events-And-Participations] - Limit:${limit
			?.toString()
			.padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`
	);
	const result = events.slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3));
	const noData = result.length === 0;
	return {
		statusCode: noData ? 204 : 200,
		json: { items: result, total: events.length }
	};
};
export default withApiHandler(handler);
