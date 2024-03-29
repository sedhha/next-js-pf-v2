// Keep updating the session as user Requests -> New API (CSRF Protected)
import { IAnalyticsData, IFEData } from '@/interfaces/analytics';
import {
	formCSRFPath,
	getCollectionPath,
	isAnalyticsEnabled,
	storeCollectionPaths
} from '@/firebase/constants';
import { store, db } from '@/firebase/index';
import { IProcess } from '@/interfaces/firebase/errors';

const ref = db.ref(formCSRFPath());

const initSession = (
	csrfToken: string,
	docPath: string,
	ua: string
): IAnalyticsData => ({
	docPath,
	ua,
	sessionID: csrfToken,
	events: [],
	// Geo Data
	ip: 'Initiated Session',
	network: 'Initiated Session',
	version: 'Initiated Session',
	city: 'Initiated Session',
	region: 'Initiated Session',
	region_code: 'Initiated Session',
	country: 'Initiated Session',
	country_name: 'Initiated Session',
	country_code: 'Initiated Session',
	country_code_iso3: 'Initiated Session',
	country_capital: 'Initiated Session',
	country_tld: 'Initiated Session',
	continent_code: 'Initiated Session',
	in_eu: false,
	postal: 'Initiated Session',
	latitude: -1,
	longitude: -1,
	timezone: 'Initiated Session',
	utc_offset: 'Initiated Session',
	country_calling_code: 'Initiated Session',
	currency: 'Initiated Session',
	currency_name: 'Initiated Session',
	languages: 'Initiated Session',
	country_area: -1,
	country_population: -1,
	asn: 'Initiated Session',
	org: 'Initiated Session',
	// Session Data
	connectedAt: new Date().getTime(),
	disconnectedAt: new Date().getTime(),
	duration: 0,
	disconnectedForcefully: false,

	// viewed Sections
	workViewed: false,
	blogViewed: false,
	contactViewed: false,
	projectsViewed: false,
	awardsViewed: false,
	videosViewed: false,
	testimonialsViewed: false,
	techStackViewed: false
});

// Create a session Record in the BE -> Existing API when creating CSRF Token
const getDocIdForSession = (): string => {
	const sessionPath = getCollectionPath(storeCollectionPaths.sessionAnalytics);
	const newDoc = store.collection(sessionPath).doc();
	return newDoc.id;
};
const initiateSessionInDB = async (
	csrfToken: string,
	ua: string,
	docID: string
): Promise<IProcess<{ id: string }>> => {
	const sessionPath = getCollectionPath(storeCollectionPaths.sessionAnalytics);
	const newDoc = store.collection(sessionPath).doc(docID);
	const newSession = initSession(csrfToken, docID, ua);
	return isAnalyticsEnabled
		? newDoc
				.set(newSession as IAnalyticsData)
				.then(() => ({
					errored: false,
					payload: { id: newDoc.id }
				}))
				.catch((error) => ({
					errored: true,
					message: error.message
				}))
		: { errored: false };
};

// Close the session abruptly when ttl expires
const closeSessionAbruptly = async (
	csrfToken: string,
	agent: string
): Promise<IProcess<null>> => {
	const sessionPath = getCollectionPath(storeCollectionPaths.sessionAnalytics);
	const docPath = await getDocId(csrfToken, agent);
	if (!docPath?.docID)
		return { errored: true, message: 'Unable to Obtain session correctly!' };
	const doc = store.collection(sessionPath).doc(docPath.docID);
	const currentSession = await doc.get();
	if (currentSession.exists) {
		const data = currentSession.data() as IAnalyticsData;
		if (data) {
			const disconnectedAt = new Date().getTime();
			const duration = disconnectedAt - data.connectedAt;
			if (data.disconnectedAt !== data.connectedAt) {
				if (isAnalyticsEnabled)
					doc
						.set(
							{
								disconnectedAt,
								duration,
								disconnectedForcefully: true
							},
							{ merge: true }
						)
						.then(() => ({ errored: false }))
						.catch((error) => {
							console.error(
								`Error Occured while trying to forcefully close session: ${error.message}`
							);
							return { errored: true };
						});
				else return { errored: false };
			} else return { errored: false };
		}
	}
	return { errored: true };
};
// GET Doc ID from csrfToken:
const getDocId = async (
	session: string,
	agent: string
): Promise<{ docID: string; key: string } | undefined> => {
	const snapshot = await ref.child(session).get();
	if (snapshot.exists()) {
		const { ua, docID } = snapshot.val();
		if (agent === ua && snapshot.key)
			return { docID: docID as string, key: snapshot.key };
	}
};
// Close the session with the events when user disconnects
const closeSessionGracefully = async (
	csrfToken: string,
	events: IFEData,
	agent: string
): Promise<IProcess<null>> => {
	const sessionPath = getCollectionPath(storeCollectionPaths.sessionAnalytics);
	const docPath = await getDocId(csrfToken, agent);
	if (!docPath?.docID || !docPath?.key)
		return { errored: true, message: 'Unable to Obtain session correctly!' };
	const doc = store.collection(sessionPath).doc(docPath.docID);
	const currentSession = await doc.get();
	if (currentSession.exists) {
		const data = currentSession.data() as IAnalyticsData;
		if (data) {
			if (isAnalyticsEnabled) {
				const disconnectedAt = new Date().getTime();
				const duration = disconnectedAt - data.connectedAt;
				return doc
					.set({ ...events, duration, disconnectedAt }, { merge: true })
					.then(async () => {
						return ref
							.child(docPath.key)
							.remove()
							.then(() => ({ errored: false }));
					})
					.catch((error) => {
						console.error(
							`Error Occured while trying to forcefully close session: ${error.message}`
						);
						return { errored: true };
					});
			} else
				return ref
					.child(docPath.key)
					.remove()
					.then(() => ({ errored: false }))
					.catch(() => ({ errored: true }));
		}
	}
	return { errored: true };
};
// Record the session
const recordSession = async (
	csrfToken: string,
	agent: string,
	events: IFEData
): Promise<IProcess<null>> => {
	const sessionPath = getCollectionPath(storeCollectionPaths.sessionAnalytics);
	const docPath = await getDocId(csrfToken, agent);
	if (!docPath?.docID)
		return { errored: true, message: 'Unable to Obtain session correctly!' };
	const doc = store.collection(sessionPath).doc(docPath.docID);
	const currentSession = await doc.get();
	if (currentSession.exists) {
		if (isAnalyticsEnabled) {
			return doc
				.set(events, { merge: true })
				.then(() => ({ errored: false, message: 'Recorded successfully!' }))
				.catch((error) => {
					console.error(
						`Error Occured while trying to forcefully close session: ${error.message}`
					);
					return { errored: true };
				});
		}
		return { errored: false };
	}
	return { errored: true };
};

export {
	initiateSessionInDB,
	closeSessionAbruptly,
	closeSessionGracefully,
	recordSession,
	getDocIdForSession
};
