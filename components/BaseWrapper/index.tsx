import { useAppDispatch } from '@/redux/hooks';
import {
	updateCsrfToken,
	updatePopup,
	updateUser
} from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { useAppSelector } from '@/redux/hooks';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '@/utils/fe/apis/services/firebase';
import { USER_APIS } from '@/utils/fe/apis/public';
import { supportedOperations } from '@/firebase/constants';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { IWSResult, FEventData } from '@/interfaces/analytics';
import { HELPER_APIS } from '../../utils/fe/apis/public';
import { convertToFEData, handleURLLoginFlow, setOnlineStatus } from './utils';
import { info } from '@/utils/dev-utils';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component
const auth = getAuth(app);

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const {
		userUid,
		userEmail,
		csrfToken,
		isAdmin,
		subscriptionPending,
		idToken,
		eventData,
		workViewed,
		blogViewed,
		contactViewed,
		projectsViewed,
		awardsViewed,
		videosViewed
	} = useAppSelector((state) => state.navigation);
	const { isLoading, error, data } = useVisitorData({
		extendedResult: true
	});
	const [socket, setSocket] = React.useState<WebSocket | null>(null);
	const [firstPacketSent, setFirstPacketSent] = React.useState(false);

	const initiateSocket = React.useCallback(() => {
		if (socket) return;
		info('Initiating Analytics');
		const newSocket = new WebSocket(
			`${HELPER_APIS.WEB_SOCKET}?csrf=${csrfToken}`
		);
		newSocket.onopen = (e) => {
			info(`ASW Connected`, e);
		};
		newSocket.onclose = (e) => {
			info(`ASW Disconnected`, e);
		};
		newSocket.onmessage = (message) => {
			const result = JSON.parse(message.data) as IWSResult<unknown>;
			console.log({ result });
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
		setSocket(newSocket);
	}, [socket, csrfToken]);

	// Create Web Socket
	React.useEffect(() => {
		if (!socket && csrfToken && document.visibilityState !== 'hidden')
			initiateSocket();
	}, [initiateSocket, socket, csrfToken, dispatch]);

	// Send the Socket Data When Connection is established
	React.useEffect(() => {
		if (!firstPacketSent && !isLoading && !error && data && csrfToken && socket) {
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
					console.log('ASW First Packet Sent');
					socket.send(ecString);
				})
				.catch((error) => {
					info('Unexpected Error Occured:- ' + error.message);
					setFirstPacketSent(false);
				});
			setFirstPacketSent(true);
		}
	}, [
		firstPacketSent,
		error,
		data,
		isLoading,
		csrfToken,
		socket,
		userEmail,
		userUid
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
	}, [dispatch]);

	// Set / Unset Admin Status
	React.useEffect(() => {
		const adminStatusCallback = () => {
			setOnlineStatus(isAdmin);
			const isHidden = document.visibilityState === 'hidden';
			if (isHidden) {
				const fingerprint = localStorage.getItem('fpp');
				if (!csrfToken || !fingerprint || !socket) return;
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
				setFirstPacketSent(false);
				setSocket(null);
			} else {
				if (!isHidden && !socket) {
					initiateSocket();
				}
			}
		};
		document.addEventListener('visibilitychange', adminStatusCallback);
		return () =>
			document.removeEventListener('visibilitychange', adminStatusCallback);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

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

	// Send Initial Analytics
	React.useEffect(() => {}, []);

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
