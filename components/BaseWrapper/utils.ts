import { formAdminIsOnlinePath } from '@/firebase/constants';
import { IFEGeo, IFEStartSession } from '@/interfaces/analytics';
import app from '@/utils/fe/apis/services/firebase';
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
	visitorID: localStorage.getItem('visitorID') ?? undefined,
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
	fp_browserName: fp?.browserName,
	fp_browserVersion: fp?.browserVersion,
	fp_confidenceScore: fp?.confidence?.score,
	fp_device: fp?.device,
	fp_firstSeenAt_global: fp?.firstSeenAt?.global ?? undefined,
	fp_firstSeenAt_subscription: fp?.firstSeenAt?.subscription ?? undefined,
	fp_incognito: fp?.incognito,
	fp_ip: fp?.ip,
	fp_accuracyRadius: fp?.ipLocation?.accuracyRadius,
	fp_cityName: fp?.ipLocation?.city?.name,
	fp_continentName: fp?.ipLocation?.continent?.name,
	fp_continentCode: fp?.ipLocation?.continent?.code,
	fp_country: fp?.ipLocation?.country?.name,
	fp_countryCode: fp?.ipLocation?.country?.code,
	fp_latitude: fp?.ipLocation?.latitude,
	fp_longitude: fp?.ipLocation?.longitude,
	fp_postCode: fp?.ipLocation?.postalCode,
	fp_subDivision: fp?.ipLocation?.subdivisions
		? [...fp.ipLocation.subdivisions]
		: undefined,
	fp_timezone: fp?.ipLocation?.timezone,
	fp_lastSeenAt_global: fp?.lastSeenAt?.global ?? undefined,
	fp_lastSeenAt_subscription: fp?.lastSeenAt?.subscription ?? undefined,
	fp_metaVersion: fp?.meta?.version,
	fp_OS: fp?.os,
	fp_OSVersion: fp?.osVersion,
	fp_Visitor: fp?.visitorFound
});

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
const updateAdminOnlineStatus = async (status = true) => {
	const adminRefPath = formAdminIsOnlinePath();
	const adminRef = ref(db, adminRefPath);
	set(adminRef, status);
};

const setOnlineStatus = (isAdmin: boolean) => {
	const visibility = document.visibilityState === 'visible';
	if (isAdmin) {
		updateAdminOnlineStatus(visibility);
	}
};
export { convertToFEData, handleURLLoginFlow, setOnlineStatus };
