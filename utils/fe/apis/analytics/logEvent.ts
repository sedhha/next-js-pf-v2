import { IClickInteractions } from '@/interfaces/analytics';
import { feFetch } from '@/utils/fe/fetch-utils';
import { HELPER_APIS } from '@/utils/fe/apis/public';

export const logEvent = async (
	csrf: string,
	key: string,
	event: IClickInteractions
) => {
	return feFetch({
		url: HELPER_APIS.CSRF_REST_RECORD_EVENT,
		sendToProxy: true,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-csrf-token': csrf
		},
		body: JSON.stringify({ events: { [key]: event } })
	});
};
