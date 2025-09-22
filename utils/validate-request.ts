import * as z from 'zod';
import { IProcess } from '@/interfaces/firebase/errors';

export function validateSchema<T extends z.ZodTypeAny>(
	schema: T,
	data: z.input<T>
): IProcess<z.output<T>> {
	const result = schema.safeParse(data);
	if (result.success) {
		return {
			errored: false,
			message: 'Response closed successfully!',
			payload: result.data
		};
	}
	return { errored: true, message: result.error.message };
}
