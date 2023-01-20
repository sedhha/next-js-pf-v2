import React from 'react';
import classes from './Contact.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
	sendAnalytics,
	updateInChatMode,
	updatePopup,
	updateUserEmail,
	updateUserSignIn,
	updateUserUid,
	updateViewed
} from '@/slices/navigation.slice';
import VisibilityHandler from '@/v2/common/VisibilityController/lite';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';
import Input from '@/v2/common/Input';
import TextArea from '@/v2/common/Input/textarea';
import { IContactForm } from '@/interfaces/firebase/contact-form';
import { feFetch } from '@/utils/fe/fetch-utils';
import { IResponse } from '@/interfaces/api';
import { DB_APIS } from '@/utils/fe/apis/public';
import { regexExpressions } from '@/utils/regex-validators';
import Spinner from '@/v2/common/Spinner';
import app from '@/fe-client/firebase';
import {
	getAuth,
	sendSignInLinkToEmail,
	isSignInWithEmailLink
} from 'firebase/auth';

const ChatWindow = dynamic(() => import('./ChatWindow'));
const auth = getAuth(app);
const emailStorageKey = 'emailForSignIn';

const loadAuth = () => {
	const actionCodeSettings = {
		url: window.location.origin,
		handleCodeInApp: true
	};
	const email = getEmail(null);
	if (!email) {
		return;
	}
	sendSignInLinkToEmail(auth, email, actionCodeSettings)
		.then(() => {
			window.localStorage.setItem(emailStorageKey, email);
			alert(
				'In order to begin live chat, please use passwordless sign-in link sent to your email address.'
			);
		})
		.catch((error) => {
			console.error({
				errorCode: error.code,
				errorMessage: error.message,
				h: 'EE'
			});
			alert('The email address you provided was not valid. Please try again!');
		});
};

const getEmail = (email: string | null, maxRepetation = 3): string | null => {
	if (email || maxRepetation <= 0) return email;
	const inputEmail = window.prompt(
		`Please provide your email address. (${maxRepetation} times remanining)`
	);
	return getEmail(inputEmail, maxRepetation - 1);
};

const Contact = () => {
	const { inChatMode } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const { contactViewed } = useAppSelector((state) => state.navigation);

	React.useEffect(() => {
		if (contactViewed) dispatch(sendAnalytics());
	}, [contactViewed, dispatch]);

	const onCheckUserStatus = () => {
		const signedIn = isSignInWithEmailLink(auth, window.location.href);
		if (signedIn) {
			if (!auth.currentUser) {
				loadAuth();
				return;
			}
			const email = auth.currentUser.email;
			const uid = auth.currentUser.uid;
			dispatch(updateUserEmail(email ?? 'unknown-email'));
			dispatch(updateUserUid(uid));
			dispatch(updateUserSignIn(true));
		} else loadAuth();
	};

	const onSubmitContactForm = () => {
		if (loading) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Processing, please wait',
					description: 'Form Submission already in progress',
					timeout: 3000
				})
			);
			return;
		}
		setLoading(true);
		dispatch(
			updatePopup({
				type: 'pending',
				title: 'Processing, please wait',
				description: 'Form Submission in progress',
				timeout: 5000
			})
		);
		const payload: IContactForm = { name, email, subject, message };
		feFetch<IResponse<null>>({
			url: `${DB_APIS.CONTACT}`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((res) => {
				if (res.error) {
					dispatch(
						updatePopup({
							type: 'error',
							title: 'Unable to complete Submission',
							description:
								res.json?.message ??
								'Unexpected error occured while submitting the details. Please try again',
							timeout: 3000
						})
					);
					return;
				}
				dispatch(
					updatePopup({
						type: 'success',
						title: 'Contact Form Added Successfully',
						description: 'Thank you for your message. Will try to get back shortly.',
						timeout: 3000
					})
				);
			})
			.finally(() => setLoading(false));
	};

	return (
		<VisibilityHandler
			onVisibleCallback={() => dispatch(updateViewed('contactViewed'))}
			Component={
				<section className={classes.ContactForm} id={attributes.Contact}>
					<h1>Wave a hello or want me to build something cool for you ?</h1>
					<div className={classes.Form}>
						<section className={classes.FormSection}>
							{loading && <Spinner />}
							<h1>Get In Touch</h1>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									pattern={regexExpressions.name}
									errorMessage="Name must only contain 2 or more alphabetic characters"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									pattern={regexExpressions.email}
									errorMessage="Invalid Email Address"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Subject"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									pattern={regexExpressions.subject}
									errorMessage="Subject must be atleast 10 characters long"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<TextArea
									placeholder="Message"
									rows={4}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<div />
							</div>
							<div className={classes.ButtonContainer}>
								<button onClick={onSubmitContactForm}>Send</button>
							</div>
						</section>
						{inChatMode ? (
							<ChatWindow />
						) : (
							<section className={classes.ChatDirectlyForm}>
								<React.Fragment>
									<div className={classes.AvatarWithImage}>
										<LazyImage src={'/chat-icon.png'} />
										<Circle className={classes.Circle} />
									</div>
									<h3>Or</h3>
									<h2>Chat with me directly</h2>
									<button onClick={onCheckUserStatus}>Authenticate and Chat</button>
								</React.Fragment>
							</section>
						)}
					</div>
				</section>
			}
		/>
	);
};

export default Contact;
