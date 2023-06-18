import { HELPER_APIS } from '@/utils/fe/apis/public';

const ipLookup = async (userIP: string) => {
	return fetch(`${process.env.IP_LOOKUP_API}/${userIP}`)
		.then((res) => res.json().then((data) => data))
		.catch(() => ({}))
		.catch(() => ({}));
};

export { ipLookup };
