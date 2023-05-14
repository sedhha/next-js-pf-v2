import { useAppDispatch } from '@/redux/hooks';
import {
	setFirstPacketSent,
	updateCsrfToken,
	updateIsAdminOnline,
	updatePopup,
	updateUser
} from '@/slices/navigation.slice';
import React, { useState } from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { useAppSelector } from '@/redux/hooks';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '@/utils/fe/apis/services/firebase';
import { USER_APIS } from '@/utils/fe/apis/public';
import { supportedOperations } from '@/firebase/constants';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { IWSResult } from '@/interfaces/analytics';
import { HELPER_APIS } from '../../utils/fe/apis/public';
import {
	convertToFEData,
	handleURLLoginFlow,
	setOnlineStatus,
	adminRef,
	maxRetriedConnections
} from './utils';
import { info } from '@/utils/dev-utils';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
import { off, onValue } from 'firebase/database';
import { setVisitorID } from '@/slices/analytics.slice';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component
const auth = getAuth(app);

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const [wsClient, setWSClient] = useState<WebSocket | null>(null);
	const {
		navigation: {
			userUid,
			userEmail,
			csrfToken,
			isAdmin,
			subscriptionPending,
			idToken,
			firstPacketSent
		},
		analytics: {
			staticContent: {
				themes: { darkMode }
			}
		}
	} = useAppSelector((state) => state);
	const { isLoading, error, data } = useVisitorData({
		extendedResult: true
	});

	const initiateSocket = React.useCallback(() => {
		if (wsClient) return;
		info('Initiating Analytics');
		maxRetriedConnections(`${HELPER_APIS.WEB_SOCKET}?csrf=${csrfToken}`, 3).then(
			(newSocket) => {
				newSocket.onclose = (e) => {
					info(`ASW Disconnected`, e.isTrusted);
				};
				newSocket.onmessage = (message) => {
					const result = JSON.parse(message.data) as IWSResult<unknown>;
					switch (result.identifier) {
						case supportedOperations.start: {
							const fingerPrint = result.payload as string;
							localStorage.setItem('fpp', fingerPrint);
							break;
						}
						case supportedOperations.closedByServer: {
							info('ASW Session Ended', result.message);
							break;
						}
					}
				};
				setWSClient(newSocket);
			}
		);
	}, [wsClient, csrfToken]);

	// Create Web Socket
	React.useEffect(() => {
		if (!wsClient && csrfToken) initiateSocket();
	}, [initiateSocket, wsClient, csrfToken, dispatch]);

	// Send the Socket Data When Connection is established
	React.useEffect(() => {
		if (
			!firstPacketSent &&
			!isLoading &&
			!error &&
			data &&
			csrfToken &&
			wsClient
		) {
			dispatch(setVisitorID(data.visitorId ?? 'unknown'));
			getGeoData()
				.then((geo) => {
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
					wsClient.send(ecString);
				})
				.catch((error) => {
					info('Unexpected Error Occured:- ' + error.message);
					dispatch(setFirstPacketSent(false));
				});
			dispatch(setFirstPacketSent(true));
		}
	}, [
		firstPacketSent,
		error,
		data,
		isLoading,
		csrfToken,
		wsClient,
		userEmail,
		userUid,
		dispatch
	]);

	// See if User is Signed In and Request CSRF Token
	React.useEffect(() => {
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
		// Request CSRF Token
		feFetch<string>({
			url: HELPER_APIS.CSRF_REST
		}).then((res) => {
			if (!res.error && res.json) {
				dispatch(updateCsrfToken(res.json));
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
	const adminStatusCallback = React.useCallback(() => {
		setOnlineStatus(isAdmin);
	}, [isAdmin]);

	// Set / Unset Admin Status
	React.useEffect(() => {
		adminStatusCallback();
		document.addEventListener('visibilitychange', adminStatusCallback);
		return () =>
			document.removeEventListener('visibilitychange', adminStatusCallback);
	}, [adminStatusCallback]);

	// See if User has requested for newsletter subscription
	React.useEffect(() => {
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
		</React.Fragment>
	);
}