import HomePage from '@/components/HomePage';
import { useCallback } from 'react';
import {
	getAuth,
	onAuthStateChanged,
	isSignInWithEmailLink,
	signInWithEmailLink,
	User
} from 'firebase/auth';
import { useEffect } from 'react';
import app from '@/fe-client/firebase';
import { useAppDispatch } from '@/redux/hooks';
import {
	updatePopup,
	updateUserEmail,
	updateUserSignIn,
	updateUserUid
} from '@/slices/navigation.slice';

// If Auth code shows up, we need to login and dispatch user to Redux
// If We See URL Params, sign user in dispatch the details and exit
// If not logged in do nothing
const auth = getAuth(app);

export default function Index() {
	const dispatch = useAppDispatch();
	const updateStoreIfSignedIn = useCallback(
		(user: User) => {
			const { email, uid } = user;
			dispatch(updateUserSignIn(true));
			if (email) dispatch(updateUserEmail(email));
			dispatch(updateUserUid(uid));
		},
		[dispatch]
	);
	useEffect(() => {
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
	return <HomePage />;
}
