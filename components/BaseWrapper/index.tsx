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
import {
	IFEStartSession,
	IFEGeo,
	IWSResult,
	FEventData
} from '@/interfaces/analytics';
import { HELPER_APIS } from '../../utils/fe/apis/public';
import { convertToFEData } from './utils';
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
	const {
		isAdmin,
		userUid,
		userEmail,
		csrfToken,
		eventData,
		workViewed,
		blogViewed,
		contactViewed,
		projectsViewed,
		awardsViewed,
		videosViewed,
		fingerprint
	} = useAppSelector((state) => state.navigation);
	const { isLoading, error, data } = useVisitorData({
		extendedResult: true
	});
	const [socket, setSocket] = React.useState<WebSocket | null>(null);

	const startSession = React.useCallback(() => {
		if (!isLoading && data && socket && csrfToken && !error) {
			getGeoData().then((geo) => {
				const body = convertToFEData({
					uid: userUid,
					email: userEmail,
					geo,
					fp: data,
					csrfToken
				});
				const ecString = Buffer.from(
					JSON.stringify({
						headers: { csrf: csrfToken, actionType: supportedOperations.start },
						body
					})
				).toString('base64');
				socket.send(ecString);
			});
		}
	}, [csrfToken, data, socket, error, isLoading, userEmail, userUid]);

	const endSession = React.useCallback(() => {
		if (fingerprint && socket && csrfToken) {
			const body: FEventData = {
				eventData: eventData ?? [],
				key: fingerprint,
				workViewed,
				blogViewed,
				contactViewed,
				projectsViewed,
				awardsViewed,
				videosViewed,
				uid: userUid,
				email: userEmail
			};
			const ecString = Buffer.from(
				JSON.stringify({
					headers: { csrf: csrfToken, actionType: supportedOperations.close },
					body
				})
			).toString('base64');
			socket.send(ecString);
		}
	}, [
		socket,
		csrfToken,
		eventData,
		fingerprint,
		awardsViewed,
		blogViewed,
		projectsViewed,
		workViewed,
		contactViewed,
		videosViewed,
		userUid,
		userEmail
	]);

	React.useEffect(() => {
		const socket = new WebSocket(HELPER_APIS.WEB_SOCKET);
		setSocket(socket);
		socket.onmessage = (message) => {
			const result = JSON.parse(message.data) as IWSResult<unknown>;
			switch (result.identifier) {
				case supportedOperations.start: {
					const fingerPrint = result.payload as string;
					dispatch(updateFingerPrint(fingerPrint));
				}
				default: {
				}
			}
		};
	}, [dispatch]);
	const onVisibilityChange = React.useCallback(() => {
		const isHidden = document.visibilityState === 'hidden';
		setOnlineStatus(isAdmin, !isHidden);
		if (!isHidden) startSession();
		else if (isHidden) endSession();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		feFetch<string>({
			url: HELPER_APIS.CSRF_REST
		}).then((res) => {
			if (!res.error && res.json) {
				dispatch(updateCsrfToken(res.json));
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

			<Component.type {...Component.props} />
			<Popup />
		</React.Fragment>
	);
}
