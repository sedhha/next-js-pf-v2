import { useAppDispatch } from '@/redux/hooks';
import {
	setFirstPacketSent,
	updateCsrfToken,
	updateIsAdminOnline,
	updatePopup,
	updateUser
} from '@/slices/navigation.slice';
import { useEffect, useCallback, Fragment } from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { useAppSelector } from '@/redux/hooks';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '@/utils/fe/apis/services/firebase';
import { USER_APIS } from '@/utils/fe/apis/public';
// import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { HELPER_APIS } from '@/utils/fe/apis/public';
import {
	convertToFEData,
	handleURLLoginFlow,
	setOnlineStatus,
	adminRef
} from './utils';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
import { off, onValue } from 'firebase/database';
import { onNewSectionView, setVisitorID } from '@/slices/analytics.slice';
import { useRouter } from 'next/router';
import { useVisitorData } from '@/hooks/useVisitorData';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component
const auth = getAuth(app);

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { asPath } = router;
	const {
		analytics: {
			staticContent: {
				themes: { darkMode }
			}
		},
		navigation: {
			csrfToken,
			userEmail,
			userUid,
			firstPacketSent,
			subscriptionPending,
			idToken,
			isAdmin
		}
	} = useAppSelector((state) => state);

	// Data From FingerPrint
	const { isLoading, error, data } = useVisitorData();

	// Page View Analytics
	useEffect(() => {
		if (asPath === '/') dispatch(onNewSectionView('root'));
		else dispatch(onNewSectionView(asPath.split('/').join('--')));
	}, [asPath, dispatch]);

	// Set Visitor ID
	useEffect(() => {
		if (data?.visitorId) dispatch(setVisitorID(data.visitorId));
	}, [data, dispatch]);

	// Request CSRF Token
	useEffect(() => {
		if (!csrfToken && data && data.visitorId)
			feFetch<string>({
				url: HELPER_APIS.CSRF_REST,
				sendToProxy: true,
				headers: {
					'x-visitor-id': data.visitorId
				}
			}).then((res) => {
				if (!res.error && res.json) dispatch(updateCsrfToken(res.json));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, data]);

	// Check User Status
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(updateUser(user));
				return;
			} else {
				handleURLLoginFlow()
					.then((user) => {
						if (user) {
							dispatch(updateUser(user));
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
		// Update Admin Online Actiivity
		onValue(adminRef, (snapshot) => {
			if (snapshot.exists()) {
				dispatch(updateIsAdminOnline(snapshot.val()));
			}
		});
		return () => {
			off(adminRef);
		};
	}, [dispatch]);

	const adminStatusCallback = useCallback(() => {
		setOnlineStatus(isAdmin);
	}, [isAdmin]);

	// Set / Unset Admin Status
	useEffect(() => {
		adminStatusCallback();
		document.addEventListener('visibilitychange', adminStatusCallback);
		return () =>
			document.removeEventListener('visibilitychange', adminStatusCallback);
	}, [adminStatusCallback]);

	// Update Geo Details
	useEffect(() => {
		if (csrfToken && !isLoading && !error && data && !firstPacketSent) {
			getGeoData().then((geo) => {
				const body = convertToFEData({
					uid: userUid,
					email: userEmail,
					geo,
					fp: data,
					csrfToken
				});
				feFetch<null>({
					url: HELPER_APIS.CSRF_REST_START,
					sendToProxy: true,
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'x-csrf-token': csrfToken,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}).then((res) => {
					if (!res.error) dispatch(setFirstPacketSent(true));
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [csrfToken, isLoading, error, data, firstPacketSent, dispatch]);

	// See if User has requested for newsletter subscription
	useEffect(() => {
		if (subscriptionPending && idToken) {
			feFetch({
				url: USER_APIS.SUBSCRIBE_NEWSLETTER,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + idToken
				}
			});
		}
	}, [subscriptionPending, idToken]);

	// Disconnect Analytics on Closing window
	useEffect(() => {
		if (csrfToken) {
			const handleBeforeUnload = async () => {
				// Make your API call here
				await feFetch<null>({
					url: HELPER_APIS.CSRF_REST_KILL,
					sendToProxy: true,
					headers: {
						'x-csrf-token': csrfToken
					},
					keepAlive: true
				});
			};
			window.addEventListener('beforeunload', handleBeforeUnload);
			return () => {
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		}
	}, [csrfToken]);

	return (
		<Fragment>
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
					content="https://images.ctfassets.net/eowwrv5buqcq/6YgXIvigHQmv2TyPxBDuWQ/3cd989a9bb4cf419fc1a5382e7ec365e/meta-image.jpg"
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
				<meta name="category" content="professional" />
				<meta name="category" content="design portfolio" />
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
			<div className={darkMode ? 'darkMode' : 'lightMode'}>
				<Component.type {...Component.props} />
			</div>
			<Popup />
		</Fragment>
	);
}
