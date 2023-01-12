import React from 'react';
import classes from './Contact.module.css';
import ChatElement from './ChatElement';
import { useAppDispatch } from '@/redux/hooks';
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
	query
} from 'firebase/database';

const db = getDatabase(app);
const auth = getAuth(app);

interface IChat {
	uri: string;
	id: string;
	isFrom: boolean;
	message: string;
}

const formMessagesPath = (isProd: boolean, uid: string) =>
	`${isProd ? 'prod' : 'dev'}-user-messages/${uid}/messages`;

const Contact = () => {
	const [userChat, setUserChat] = React.useState<IChat[]>([]);
	const [msg, setMsg] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		if (auth.currentUser) {
			const chatRef = ref(
				db,
				formMessagesPath(
					process.env.NODE_ENV === 'production',
					auth.currentUser.uid
				)
			);
			onValue(query(chatRef, limitToLast(100)), async (snapshot) => {
				if (snapshot.exists()) {
					const results = snapshot.val();
					const keys = Object.keys(results);
					setUserChat(
						keys.map((item) => {
							const { uri, isFrom, message } = results[item];
							return { uri, isFrom, message, id: item };
						})
					);
				}
			});
			return () => {
				console.log('Removing child');
				off(chatRef);
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
		if (loading) return;
		setLoading(true);
		if (auth.currentUser) {
			const chatRef = ref(
				db,
				formMessagesPath(
					process.env.NODE_ENV === 'production',
					auth.currentUser.uid
				)
			);
			push(chatRef, {
				uri: '/chat-icon.png',
				isFrom: false,
				message: msg
			})
				.then(() => {
					setLoading(false);
					setMsg('');
				})
				.catch(() => {
					setLoading(false);
					setMsg('Failed to send message');
				});
		} else setLoading(false);
	};

	return (
		<section className={classes.ChatWindow}>
			<div className={classes.TopNavigation}>
				<h2>Chat Anonymously</h2>
				<h2
					onClick={() => dispatch(updateInChatMode(false))}
					className={classes.CloseButton}
				>
					X
				</h2>
			</div>
			<div className={classes.ChatElements}>
				{userChat.length > 0 ? (
					userChat.map((message) => (
						<ChatElement
							key={message.id}
							uri={message.uri}
							isFrom={message.isFrom}
							message={message.message}
						/>
					))
				) : (
					<div className={classes.EmptyChatScreen}>
						<div className={classes.AvatarWithImage}>
							<LazyImage src={'/chat-icon.png'} />
							<Circle className={classes.Circle} />
						</div>
						<p>Send a message to get started!</p>
					</div>
				)}
			</div>
			<div className={classes.MessageSendContainer}>
				<input
					placeholder="Start typing a message..."
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === 'Enter') onSendMessage();
					}}
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
