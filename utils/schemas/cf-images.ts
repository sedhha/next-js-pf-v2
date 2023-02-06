import { z } from 'zod';

const cfImageSchema = z.array(
	z.object({
		url: z.string(),
		title: z.string(),
		description: z.string(),
		contentType: z.string(),
		fileName: z.string()
	})
);

export { cfImageSchema };
