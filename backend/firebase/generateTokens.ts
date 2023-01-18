import { db } from '.';
import { dbPaths } from './constants';

const ttl = 3600 * 1000;

const formCSRFPath = (isProd: boolean) =>
	`${isProd ? 'prod' : 'dev'}-${dbPaths.csrfTokens}`;

const ref = db.ref(formCSRFPath(process.env.NODE_ENV === 'production'));

const addSession = async (ua: string): Promise<string> => {
	const snapshot = await ref.push({ ua });
	console.log('Snapshot Created = ', snapshot.key);
	setTimeout(() => {
		if (snapshot.key) ref.child(snapshot.key).remove();
	}, ttl);
	if (!snapshot.key) return addSession(ua);
	return snapshot.key;
};

const getSession = async (
	session: string,
	agent: string
): Promise<{ ua: string } | undefined> => {
	const snapshot = await ref.child(session).get();
	if (snapshot.exists()) {
		const { ua } = snapshot.val();
		if (agent === ua) return snapshot.val();
	}
};

const security = { addSession, getSession };
export default security;
