import { useAppDispatch } from '@/redux/hooks';
import {
	sendAnalytics,
	updateCsrfToken,
	updateGeoData,
	updateIDToken,
	updateIsAdmin,
	updatePopup,
	updateRevisitor,
	updateUserEmail,
	updateUserSignIn,
	updateUserUid
} from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { ADMIN_APIS, AUTH_APIS } from '@/utils/fe/apis/public';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
import { closeAnalytics } from '@/slices/navigation.slice';
import { useAppSelector } from '../../redux/tools/hooks';
import {
	User,
	isSignInWithEmailLink,
	onAuthStateChanged,
	getAuth,
	signInWithEmailLink
} from 'firebase/auth';
import app from '@/utils/fe/apis/services/firebase';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component
const auth = getAuth(app);
export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const { geoData } = useAppSelector((state) => state.navigation);
	const onVisibilityChange = React.useCallback(() => {
		const isVisible = document.visibilityState === 'visible';
		const analyticsEnabled = JSON.parse(
			process.env.NEXT_PUBLIC_ANALYTICS_ENABLED ?? 'false'
		);
		if (analyticsEnabled) {
			if (isVisible) {
				feFetch<{ json: { result: string } }>({
					url: AUTH_APIS.CSRF
				}).then((res) => {
					if (!res.error) {
						dispatch(updateCsrfToken(res.json?.json.result));
					}
				});
				if (!geoData?.ip) {
					getGeoData().then((res) => {
						dispatch(updateGeoData(res));
						dispatch(sendAnalytics());
					});
				}
			} else dispatch(closeAnalytics());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	React.useEffect(() => {
		const revisitor = +(localStorage.getItem('revisitor') ?? 0);
		if (revisitor === 0) localStorage.setItem('revisitor', '1');
		else localStorage.setItem('revisitor', `${revisitor + 1}`);
		dispatch(updateRevisitor(revisitor + 1));
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
				return;
			} else {
				const isLoggedIn = isSignInWithEmailLink(auth, window.location.href);
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
		if (idToken)
			feFetch<{ json: boolean }>({
				url: `${ADMIN_APIS.ADMIN}`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + idToken
				}
			}).then((res) => {
				if (res.json) dispatch(updateIsAdmin(res.json.json));
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
					content="https://github.com/sedhha/gitpractice/blob/master/webpf/web/images/meta-image.jpg?raw=true"
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
