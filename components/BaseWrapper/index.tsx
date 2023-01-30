import { useAppDispatch } from '@/redux/hooks';
import {
	updateAuthState,
	updateCloseReqd,
	updateCsrfToken,
	updateFingerPrint,
	updateIDToken,
	updateIsAdmin,
	updateIsAdminOnline,
	updatePopup,
	updateUserEmail,
	updateUserSignIn,
	updateUserUid
} from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { ADMIN_APIS, ANALYTICS_APIS, AUTH_APIS } from '@/utils/fe/apis/public';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
import { closeAnalytics } from '@/slices/navigation.slice';
import { useAppSelector } from '@/redux/hooks';
import {
	User,
	isSignInWithEmailLink,
	onAuthStateChanged,
	getAuth,
	signInWithEmailLink
} from 'firebase/auth';
import { ref, getDatabase, set, onValue, off } from 'firebase/database';
import app from '@/utils/fe/apis/services/firebase';
import { USER_APIS } from '@/utils/fe/apis/public';
import {
	formAdminIsOnlinePath,
	supportedOperations
} from '@/firebase/constants';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { IFEStartSession, IFEGeo } from '@/interfaces/analytics';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component
const auth = getAuth(app);
const db = getDatabase(app);

const updateAdminOnlineStatus = async (status = true) => {
	const adminRefPath = formAdminIsOnlinePath();
	const adminRef = ref(db, adminRefPath);
	set(adminRef, status);
};

const setOnlineStatus = (isAdmin: boolean, visibility: boolean) => {
	if (isAdmin) {
		updateAdminOnlineStatus(visibility);
	}
};

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const { isAdmin, userUid, userEmail, csrfToken, loadingAuthState, closeReqd } =
		useAppSelector((state) => state.navigation);
	const { isLoading, error, data } = useVisitorData({
		extendedResult: true
	});
	const startSession = React.useCallback(
		async ({ uid, email, csrfToken, geo, fp }: IFEStartSession) => {
			if (!csrfToken) return;
			const feAnalyticsData: IFEGeo = {
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
			};
			feFetch<string>({
				keepAlive: true,
				url: `${ANALYTICS_APIS.TRACK}?opType=${supportedOperations.start}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-csrf-token': csrfToken
				},
				body: JSON.stringify(feAnalyticsData)
			}).then((res) => {
				if (res.json) {
					localStorage.setItem('visitorID', res.json);
					dispatch(updateFingerPrint(res.json));
				}
			});
		},
		[dispatch]
	);
	const endSession = React.useCallback(
		(e: BeforeUnloadEvent) => {
			e.preventDefault();
			dispatch(updateCloseReqd(false));
			dispatch(closeAnalytics(true));
		},
		[dispatch]
	);
	const onVisibilityChange = React.useCallback(() => {
		const isHidden = document.visibilityState === 'hidden';
		setOnlineStatus(isAdmin, !isHidden);
		if (isHidden && closeReqd) {
			dispatch(closeAnalytics(false));
		} else {
			if (!isLoading && csrfToken && data && !loadingAuthState && !error) {
				getGeoData().then((res) => {
					startSession({
						uid: userUid,
						email: userEmail,
						csrfToken: csrfToken,
						geo: res,
						fp: data
					});
				});
			}
			if (error) {
				console.error(error);
			}
		}
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dispatch,
		isAdmin,
		isLoading,
		data,
		loadingAuthState,
		userEmail,
		userUid,
		csrfToken,
		startSession,
		error
	]);

	React.useEffect(() => {
		window.addEventListener('beforeunload', endSession);
		return () => {
			window.removeEventListener('beforeunload', endSession);
		};
	}, [endSession]);

	React.useEffect(() => {
		feFetch<{ result: string }>({
			url: AUTH_APIS.CSRF
		}).then((res) => {
			if (!res.error && res.json) {
				dispatch(updateCsrfToken(res.json.result));
			}
		});
	}, [dispatch]);
	React.useEffect(() => {
		onVisibilityChange();
		document.addEventListener('visibilitychange', onVisibilityChange);
		return () =>
			document.removeEventListener('visibilitychange', onVisibilityChange);
	}, [onVisibilityChange]);
	const { idToken } = useAppSelector((state) => state.navigation);
	const updateStoreIfSignedIn = React.useCallback(
		(user: User) => {
			const { email, uid } = user;
			dispatch(updateUserSignIn(true));
			if (email) dispatch(updateUserEmail(email));
			dispatch(updateUserUid(uid));
			user
				.getIdToken()
				.then((token) => dispatch(updateIDToken(token)))
				.catch();
		},
		[dispatch]
	);
	React.useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				updateStoreIfSignedIn(user);
				dispatch(updateAuthState(false));
				return;
			} else {
				const isLoggedIn = isSignInWithEmailLink(auth, window.location.href);
				dispatch(updateAuthState(false));
				if (!isLoggedIn) return;
				let email = window.localStorage.getItem('emailForSignIn');
				if (!email) {
					email = window.prompt('Please provide your email for confirmation');
				}

				if (!email) return;
				signInWithEmailLink(auth, email, window.location.href)
					.then((user) => {
						if (user) {
							updateStoreIfSignedIn(user.user);

							return;
						}
					})
					.catch((error) => {
						console.error(error.message);
						dispatch(
							updatePopup({
								type: 'error',
								title: 'Login Failed',
								description:
									'User not logged in. Sign In Link may have expired. Kindly generate a new URL and try again!',
								timeout: 3000
							})
						);
					});
			}
		});
	}, [updateStoreIfSignedIn, dispatch]);

	React.useEffect(() => {
		const adminRefPath = formAdminIsOnlinePath();
		const adminRef = ref(db, adminRefPath);
		onValue(adminRef, async (snapshot) => {
			if (snapshot.exists()) {
				dispatch(updateIsAdminOnline(snapshot.val() ?? false));
			}
		});
		return () => {
			off(adminRef);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	React.useEffect(() => {
		if (idToken)
			feFetch<boolean>({
				url: `${ADMIN_APIS.ADMIN}`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + idToken
				}
			}).then((res) => {
				if (res.json) {
					dispatch(updateIsAdmin(res.json));
					updateAdminOnlineStatus();
				}
			});
		feFetch({
			url: USER_APIS.SUBSCRIBE_NEWSLETTER,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + idToken
			}
		});
	}, [idToken, dispatch]);
	return (
		<React.Fragment>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Shivam Sahil</title>
				<meta
					name="description"
					content="Shivam Sahil is a tech enthusiast who loves to build open source applications that involves edge cutting technologies like robotics, IoT, Computer Vision and API automation. He has been working as a web developer from last 1.8 years. In the free time, he loves to interact with techies around the globe and brainstorm amazing ideas."
				/>
				<meta
					property="og:image"
					itemProp="image primaryImageOfPage"
					content="https://github.com/sedhha/gitpractice/blob/master/webpf/web/images/meta-image.jpg?raw=true"
				/>
				<meta
					name="description"
					content="Stack Overflow is the largest, most trusted online community for developers to learn, share&#x200B; &#x200B;their programming &#x200B;knowledge, and build their careers."
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={
						process.env.NEXT_PUBLIC_WEBSITE ?? 'https://shivam-sahil.vercel.app/'
					}
				/>
				<meta property="og:site_name" content="Shivam Sahil | Developer" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:domain" content="shivam-sahil.vercel.app" />
				<meta
					name="twitter:title"
					property="og:title"
					itemProp="name"
					content="Shivam Sahil | Full Stack Developer and Passionate Techie"
				/>
				<meta
					name="twitter:description"
					property="og:description"
					itemProp="description"
					content="Shivam Sahil | Full Stack Developer and Passionate Techie"
				/>
				<title>Shivam Sahil | Developer</title>
				<link rel="icon" href="/chat-icon.png" />
				<link rel="apple-touch-icon" href="/chat-icon.png" />
			</Head>

			<Component.type {...Component.props} />
			<Popup />
		</React.Fragment>
	);
}
