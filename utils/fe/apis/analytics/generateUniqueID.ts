import crypto from 'crypto-js';
import generator from 'crypto';
import { z } from 'zod';
interface IBrowserProps {
	ua: string;
	platform: string;
	hwConcurrency: number;
	deviceMemory: number;
	mxTouchPoints: number;
	pixelRatio: number;
	eventCountSize?: number;
	jsHeapSize?: number;
}

const generateUniqueID = (b64string: string) => {
	const decodedData = Buffer.from(b64string, 'base64').toString('utf-8');
	const browserProps = JSON.parse(decodedData) as IBrowserProps;
	const parsed = z
		.object({
			ua: z.string(),
			platform: z.string(),
			hwConcurrency: z.number(),
			deviceMemory: z.number(),
			mxTouchPoints: z.number(),
			pixelRatio: z.number(),
			eventCountSize: z.number().optional(),
			jsHeapSize: z.number().optional()
		})
		.safeParse(browserProps);
	if (!parsed.success) return '';
	const browserID = crypto.AES.encrypt(
		JSON.stringify({
			ua: browserProps.ua,
			platform: browserProps.platform,
			hwConcurrency: browserProps.hwConcurrency,
			deviceMemory: browserProps.deviceMemory,
			mxTouchPoints: browserProps.mxTouchPoints,
			pixelRatio: browserProps.pixelRatio,
			eventCountSize: browserProps.eventCountSize ?? -1,
			jsHeapSize: browserProps.jsHeapSize ?? -1,
			idx: generator.randomUUID()
		}),
		process.env.APPSCRIPT_API_KEY as string
	).toString();
	return browserID;
};

export { generateUniqueID };
