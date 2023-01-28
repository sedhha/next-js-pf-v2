import { db } from '.';
import {
	closeSessionAbruptly,
	getDocIdForSession,
	initiateSessionInDB
} from '@/firebase/analytics';
import { formCSRFPath } from '@/firebase/constants';

const ttl = 3600 * 1000;

const ref = db.ref(formCSRFPath());

const addSession = async (ua: string): Promise<string> => {
	const docID = getDocIdForSession();
	const snapshot = await ref.push({ ua, docID });
	if (!snapshot.key) return addSession(ua);
	const session = await initiateSessionInDB(snapshot.key, ua, docID);
	setTimeout(() => {
		if (session.payload?.id)
			closeSessionAbruptly(session.payload?.id, ua).then(() => {
				if (snapshot.key) {
					ref.child(snapshot.key).remove();
				}
			});
	}, ttl);
	return snapshot.key;
};

const getSession = async (
	session: string,
	agent: string
): Promise<{ ua: string } | undefined> => {
	const snapshot = await ref.child(session).get();
	if (snapshot.exists()) {
		const results = snapshot.val();
		const { ua } = results;
		if (agent === ua) return results;
	}
};

const security = { addSession, getSession };
export default security;
