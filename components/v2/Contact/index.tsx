import React, { useEffect } from 'react';
import classes from './Contact.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
	updateInChatMode,
	updatePopup,
	updateUser,
	updateUserEmail,
	updateUserUid
} from '@/slices/navigation.slice';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import Input from '@/v2/common/Input';
import TextArea from '@/v2/common/Input/textarea';
import { IContactForm } from '@/interfaces/firebase/contact-form';
import { feFetch } from '@/utils/fe/fetch-utils';
import { IResponse } from '@/interfaces/api';
import { DB_APIS } from '@/utils/fe/apis/public';
import { regexExpressions } from '@/utils/regex-validators';
import Spinner from '@/v2/common/Spinner';
import app from '@/fe-client/firebase';
import { getAuth, sendSignInLinkToEmail, User } from 'firebase/auth';
import {
	onChangeContactForm,
	onClickEventTrigger,
	onNewSectionView
} from '@/slices/analytics.slice';
import clickAttributes from '@/constants/click-actions.json';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';
import { shallowEqual } from 'react-redux';

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
			alert(error.message);
			console.error({
				errorCode: error.code,
				errorMessage: error.message
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


	const { inChatMode, csrfToken, isAdminOnline, visitorID, clickEvents } = useAppSelector(state => ({
		inChatMode: state.navigation.inChatMode,
		csrfToken: state.navigation.csrfToken,
		isAdminOnline: state.navigation.isAdminOnline,
		visitorID: state.analytics.visitorID,
		clickEvents: state.analytics.staticContent.clickEvents
	}), shallowEqual);
	const dispatch = useAppDispatch();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const setCallback = (value: string, setterFunction: (e: string) => void) => {
		setterFunction(value);
		dispatch(
			onChangeContactForm({
				shouldSend: true,
				subject,
				email,
				message,
				name
			})
		);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (
				visitorID &&
				(email.length || name.length || subject.length || message.length)
			) {
				const key = `contactFormSubmission-${visitorID}`;
				const payload = {
					clickIdentifier: key,
					clickDescription:
						'This event denotes that user is trying to add feedback in feedback form.',
					clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1,
					clickPerformedAt: new Date().toISOString(),
					identifier1: email,
					identifier2: message,
					identifier3: name,
					identifier4: subject
				};
				if (csrfToken) logEvent(csrfToken, key, payload);
			}
		}, 3000);
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email, name, subject, message, csrfToken, visitorID]);

	const updateStoreIfSignedIn = React.useCallback(
		(user: User) => {
			const { email, uid } = user;
			if (email) dispatch(updateUserEmail(email));
			dispatch(updateUserUid(uid));
			dispatch(updateUser(user));
			if (uid && email) dispatch(updateInChatMode(true));
		},
		[dispatch]
	);

	const onCheckUserStatus = () => {
		const { currentUser } = auth;
		if (currentUser) {
			dispatch(
				onClickEventTrigger({
					attribute: clickAttributes.authenticateAndChat,
					description: `Clicking on Authenticate and Chat With user - '${currentUser.email}'`
				})
			);
			updateStoreIfSignedIn(currentUser);
			return;
		} else {
			loadAuth();
			dispatch(
				onClickEventTrigger({
					attribute: clickAttributes.unauthenticatedAndChat,
					description: `Clicking on Authenticate and Chat With Unauthenticated User - '${visitorID}'`
				})
			);
		}
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
		if (csrfToken)
			feFetch<IResponse<null>>({
				url: `${DB_APIS.CONTACT}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-csrf-token': csrfToken
				},
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
						dispatch(
							onClickEventTrigger({
								attribute: clickAttributes.failedContactFormSubmission,
								description: `${res.json?.message}-Email:${email}||Name:${name}||Subject:${subject}`
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
					dispatch(
						onClickEventTrigger({
							attribute: clickAttributes.successContactFormSubmission,
							description: `Email:${email}||Name:${name}||Subject:${subject}`
						})
					);
					setEmail('');
					setName('');
					setSubject('');
					setMessage('');
				})
				.finally(() => setLoading(false));
		else {
			const description =
				'Connection Error: Please refresh the page and try again!';
			setLoading(false);
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Unable to complete Submission',
					description,
					timeout: 3000
				})
			);
			dispatch(
				onClickEventTrigger({
					attribute: clickAttributes.failedContactFormSubmission,
					description: `${description}-Email:${email}||Name:${name}||Subject:${subject}`
				})
			);
			return;
		}
	};

	return (
		<VisibilityHandler
			onVisibleCallback={() => dispatch(onNewSectionView(attributes.Contact))}
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
									onChange={(e) => setCallback(e.target.value, setName)}
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
									onChange={(e) => setCallback(e.target.value, setEmail)}
									pattern={regexExpressions.email}
									errorMessage="Invalid Email Address"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Subject"
									value={subject}
									onChange={(e) => setCallback(e.target.value, setSubject)}
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
									onChange={(e) => setCallback(e.target.value, setMessage)}
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
										<Circle
											className={`${classes.Circle} ${isAdminOnline ? classes.Online : classes.Offline
												}`}
										/>
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
