import { formAdminIsOnlinePath } from '@/firebase/constants';
import { IFEGeo, IFEStartSession } from '@/interfaces/analytics';
import { info } from '@/utils/dev-utils';
import { HELPER_APIS } from '@/utils/fe/apis/public';
import app from '@/utils/fe/apis/services/firebase';
import { getUniqueBrowserID } from '@/utils/fe/getVisitor';
import {
	User,
	getAuth,
	isSignInWithEmailLink,
	signInWithEmailLink
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const auth = getAuth(app);
const db = getDatabase(app);
const convertToFEData = ({ uid, email, geo, fp }: IFEStartSession): IFEGeo => ({
	uid,
	email,
	visitorID: getUniqueBrowserID() ?? undefined,
	// Geo Data
	ip: geo.ip,
	network: geo.network,
	version: geo.version,
	city: geo.city,
	region: geo.region,
	region_code: geo.region_code,
	country: geo.country,
	country_name: geo.country_name,
	country_code: geo.country_code,
	country_code_iso3: geo.country_code_iso3,
	country_capital: geo.country_capital,
	country_tld: geo.country_tld,
	continent_code: geo.continent_code,
	in_eu: geo.in_eu,
	postal: geo.postal,
	latitude: geo.latitude,
	longitude: geo.longitude,
	timezone: geo.timezone,
	utc_offset: geo.utc_offset,
	country_calling_code: geo.country_calling_code,
	currency: geo.currency,
	currency_name: geo.currency_name,
	languages: geo.languages,
	country_area: geo.country_area,
	country_population: geo.country_population,
	asn: geo.asn,
	org: geo.org,
	// FP Data
	fp_visitorID: fp?.visitorId,
	fp_browserName: fp?.fp_browserName,
	fp_browserVersion: fp?.fp_browserVersion,
	fp_device: fp?.fp_device,
	fp_ip: fp?.fp_ip,
	fp_cityName: fp.fp_cityName,
	fp_continentName: fp.fp_continentName,
	fp_continentCode: fp.fp_continentCode,
	fp_country: fp.fp_country,
	fp_countryCode: fp.fp_countryCode,
	fp_latitude: fp.fp_latitude,
	fp_longitude: fp.fp_longitude,
	fp_postCode: fp.fp_postCode,
	fp_timezone: fp.fp_timezone,
	fp_OS: fp.fp_OS,
	fp_OSVersion: fp.fp_OSVersion
});

function* newConnectionRequest(start = 0) {
	let value = start;
	while (true) {
		value += 1;
		yield value;
	}
}
const g = newConnectionRequest();

const getNewWSConnection = (url: string) => {
	info(`[getNewWSConnection-${g.next().value}]: Trying to connect`);
	return new WebSocket(url);
};

const maxRetriedConnections = async (
	url: string,
	maxRetries: number = 0,
	maxWaitTimeoutInMillis: number = 5000, // milliseconds of wait before next retry attempt
	prevConnection: WebSocket | null = null
): Promise<WebSocket> => {
	const connection = prevConnection ? prevConnection : getNewWSConnection(url);
	if (maxRetries <= 0) return connection; // Returns in whatever state it is currently

	return new Promise((resolve) => {
		setTimeout(() => {
			const socketInReadyState = connection.readyState;
			info({ socketInReadyState });
			if (socketInReadyState) {
				info(`ASW Connected`, connection.readyState);
				resolve(connection);
			} else
				return maxRetriedConnections(url, maxRetries - 1, maxWaitTimeoutInMillis);
		}, maxWaitTimeoutInMillis);
	});
};

const handleURLLoginFlow = async (): Promise<void | User> => {
	const isLoggedIn = isSignInWithEmailLink(auth, window.location.href);
	if (!isLoggedIn) return;
	let email = window.localStorage.getItem('emailForSignIn');
	if (!email) {
		email = window.prompt('Please provide your email for confirmation');
	}
	if (!email) return;
	return signInWithEmailLink(auth, email, window.location.href).then(
		(user) => user.user
	);
};

// Set Admin Status
const adminRefPath = formAdminIsOnlinePath();
const adminRef = ref(db, adminRefPath);
const updateAdminOnlineStatus = async (status = true) => {
	set(adminRef, status);
};

const setOnlineStatus = (isAdmin: boolean) => {
	const visibility = document.visibilityState === 'visible';
	if (isAdmin) {
		updateAdminOnlineStatus(visibility);
	}
};
export {
	convertToFEData,
	handleURLLoginFlow,
	setOnlineStatus,
	adminRef,
	maxRetriedConnections
};
