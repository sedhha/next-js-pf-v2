import React from 'react';
import classes from './Contact.module.css';
import ChatElement from './ChatElement';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	updateInChatMode,
	updatePopup,
	updateUserEmail,
	updateUserSignIn,
	updateUserUid
} from '@/slices/navigation.slice';
import Icon from '@/v2/common/Icons';
import app from '@/fe-client/firebase';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import { icons } from '../common/Icons/index';
import { getAuth, signOut } from 'firebase/auth';

import {
	getDatabase,
	ref,
	push,
	onValue,
	off,
	limitToLast,
	query,
	set
} from 'firebase/database';
import {
	emailRefPath,
	formMessagesPath,
	lastModifiedPath,
	latestMessagePath,
	readRecipientPath,
	readRecipientPathUser,
	typingUserPath
} from '@/firebase/constants';
import Typing from '@/v2/common/Typing';
import { IChat } from '@/interfaces/firebase/contact-form';
import { areNotificationsSupported } from '@/utils/dev-utils';

const db = getDatabase(app);
const auth = getAuth(app);

const Contact = () => {
	const [userChat, setUserChat] = React.useState<IChat[]>([]);
	const [msg, setMsg] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [typing, setTyping] = React.useState(false);
	const [read, setRead] = React.useState(false);
	const [readByAdmin, setReadByAdmin] = React.useState(false);
	const { isAdminOnline } = useAppSelector((state) => state.navigation);
	React.useEffect(() => {
		if (auth.currentUser) {
			const chatRef = ref(db, formMessagesPath(auth.currentUser.uid));
			const typingRef = ref(db, typingUserPath(auth.currentUser.uid, false));
			const readByUserRef = ref(db, readRecipientPathUser(auth.currentUser.uid));
			const readRecipientRef = ref(db, readRecipientPath(auth.currentUser.uid));
			onValue(readByUserRef, async (snapshot) => {
				if (snapshot.exists()) {
					setRead(snapshot.val());
				}
			});
			onValue(readRecipientRef, async (snapshot) => {
				if (snapshot.exists()) {
					setReadByAdmin(snapshot.val());
				}
			});
			onValue(typingRef, async (snapshot) => {
				if (snapshot.exists()) {
					const isTyping = snapshot.val();
					setTyping(isTyping);
				}
			});
			onValue(query(chatRef, limitToLast(100)), async (snapshot) => {
				if (snapshot.exists()) {
					const results = snapshot.val();
					const keys = Object.keys(results);
					setUserChat(
						keys.map((item) => {
							const { uri, isFromAdmin, message } = results[item];
							return { uri, isFromAdmin, message, id: item };
						})
					);
					if (areNotificationsSupported())
						Notification.requestPermission().then((permission) => {
							if (permission === 'granted') {
								const { message } = results[keys[keys.length - 1]];
								if (
									document.visibilityState !== 'visible' &&
									!read &&
									areNotificationsSupported()
								)
									new Notification('Shivam sent a message', {
										body: message,
										icon: '/chat-icon.png'
									});
							}
						});
				} else setUserChat([]);
			});
			if (areNotificationsSupported()) Notification.requestPermission();
			return () => {
				off(chatRef);
				off(typingRef);
				off(readByUserRef);
				off(readRecipientRef);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.currentUser]);
	const dispatch = useAppDispatch();

	const onExitChat = () => {
		if (loading) {
			dispatch(
				updatePopup({
					type: 'pending',
					title: 'Exiting Session!',
					description: 'Please wait while we sign you out.',
					timeout: 6000
				})
			);
			return;
		}
		const exitApproved = confirm(
			"You're going to exit this chat now. Your chat session will be lost. Are you sure, you want to exit this?"
		);
		if (exitApproved) {
			setLoading(true);
			dispatch(
				updatePopup({
					type: 'pending',
					title: 'Exiting Session!',
					description: 'Please wait while we sign you out.',
					timeout: 6000
				})
			);
			signOut(auth)
				.then(() => {
					updatePopup({
						type: 'success',
						title: 'Successfully Signed you out!',
						description: 'Sign out successful.',
						timeout: 6000
					});
					dispatch(updateUserEmail());
					dispatch(updateUserUid());
					dispatch(updateUserSignIn(false));
				})
				.catch((error) => {
					updatePopup({
						type: 'error',
						title: 'Failed to close the session. Please try again',
						description: 'Sign out failed.',
						timeout: 6000
					});
					console.error({ errorCode: error.code, message: error.message });
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	const onSendMessage = () => {
		if (loading || msg === '') {
			return;
		}
		setLoading(true);
		if (auth.currentUser) {
			const chatRef = ref(db, formMessagesPath(auth.currentUser.uid));
			const lastModified = ref(db, lastModifiedPath(auth.currentUser.uid));
			const emailRef = ref(db, emailRefPath(auth.currentUser.uid));
			const readRecipientRef = ref(db, readRecipientPath(auth.currentUser.uid));
			const readByUserRef = ref(db, readRecipientPathUser(auth.currentUser.uid));
			const latestMessageRef = ref(db, latestMessagePath(auth.currentUser.uid));
			push(chatRef, {
				uri: '/chat-icon.png',
				isFromAdmin: false,
				message: msg
			})
				.then(() => {
					set(lastModified, new Date().getTime());
					set(emailRef, auth.currentUser?.email ?? auth.currentUser?.uid);
					set(readRecipientRef, false);
					set(readByUserRef, true);
					set(latestMessageRef, msg);
					setMsg('');
				})
				.catch(() => {
					setMsg('Failed to send message');
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	};
	const setUserTyping = (typing: boolean) => {
		if (auth.currentUser) {
			const typingRef = ref(db, typingUserPath(auth.currentUser.uid, true));
			const readByUserRef = ref(db, readRecipientPathUser(auth.currentUser.uid));
			set(typingRef, typing)
				.then(() => {
					setMsg('');
				})
				.catch(() => {
					setMsg('Failed to send message');
				});
			set(readByUserRef, true);
		}
	};

	const lastMessageFromAdmin =
		userChat?.[userChat.length - 1]?.isFromAdmin ?? true;

	return (
		<section className={classes.ChatWindow}>
			<div
				className={classes.TopNavigation}
				onClick={() => dispatch(updateInChatMode(false))}
			>
				<h2>Chat Anonymously</h2>
				<h2 className={classes.CloseButton}>X</h2>
			</div>
			<div className={classes.ChatElements}>
				{userChat.length > 0 ? (
					userChat.map((message) => (
						<ChatElement
							key={message.id}
							uri={message.uri}
							isFromAdmin={message.isFromAdmin}
							message={message.message}
						/>
					))
				) : (
					<div className={classes.EmptyChatScreen}>
						<div className={classes.AvatarWithImage}>
							<LazyImage src={'/chat-icon.png'} />
							<Circle
								className={`${classes.Circle} ${
									isAdminOnline ? classes.Online : classes.Offline
								}`}
							/>
						</div>
						<p>Send a message to get started!</p>
					</div>
				)}
			</div>
			{typing && <Typing />}
			{readByAdmin && !typing && !lastMessageFromAdmin && (
				<p className={classes.ReadRecipient}>Your message was seen by Shivam</p>
			)}
			<div className={classes.MessageSendContainer}>
				<input
					placeholder="Start typing a message..."
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === 'Enter') onSendMessage();
					}}
					onFocus={() => setUserTyping(true)}
					onBlur={() => setUserTyping(false)}
				/>
				<Icon
					iconKey={icons.AiOutlineSend}
					className={classes.MessageSendContainer_button}
					onClick={onSendMessage}
				/>
				<Icon
					iconKey={icons.GoSignOut}
					className={classes.MessageSendContainer_button}
					onClick={onExitChat}
				/>
			</div>
		</section>
	);
};

export default Contact;
