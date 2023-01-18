import * as z from 'zod';
import { IProcess } from '@/interfaces/firebase/errors';
import { IAnalyticsData } from '@/interfaces/analytics';

function validateSchema<T extends z.ZodType>(
	schema: T,
	data: z.infer<T>
): IProcess<IAnalyticsData> {
	const result = schema.safeParse(data);
	if (result.success)
		return {
			errored: false,
			message: 'Response closed successfully!',
			payload: result.data
		};
	else return { errored: true, message: result.error.message };
}

export { validateSchema };
