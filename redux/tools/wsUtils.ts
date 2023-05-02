import { SupportedOps, supportedOperations } from '@/firebase/constants';
import { AttributeValue } from '@/interfaces/fe';

const encodeB64 = <T>(csrf: string, actionType: SupportedOps, body: T) =>
	Buffer.from(
		JSON.stringify({
			headers: { csrf, actionType },
			body
		})
	).toString('base64');

const sendWSNavigationEvent = (
	client: WebSocket,
	csrf: string,
	event: Record<AttributeValue, boolean>
) => {
	const messageString = encodeB64(csrf, supportedOperations.viewEvents, event);
	client.send(messageString);
};

export { sendWSNavigationEvent };
