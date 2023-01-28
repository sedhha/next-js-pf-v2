import {
	emailRefPath,
	formMessagesPath,
	lastModifiedPath,
	latestMessagePath,
	readRecipientPath,
	readRecipientPathUser,
	typingUserPath
} from '@/firebase/constants';
import { useAppSelector } from '@/redux/hooks';
import app from '@/utils/fe/apis/services/firebase';
import classes from './PersonalChat.module.css';
import {
	getDatabase,
	limitToLast,
	query,
	ref,
	set,
	push,
	onValue,
	off
} from 'firebase/database';
import { useState, useEffect } from 'react';
import ChatElement from '@/v2/Contact/ChatElement';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import Typing from '../v2/common/Typing';
import Icon, { icons } from '@/v2/common/Icons';
import { IChat } from '@/interfaces/firebase/contact-form';
import { areNotificationsSupported } from '@/utils/dev-utils';
type Props = {
	uid: string;
	email?: string;
	onExitChat: () => void;
};

const isProd = process.env.NODE_ENV === 'production';
const db = getDatabase(app);
const ChatWindow = ({ uid, email, onExitChat }: Props) => {
	const { isAdmin } = useAppSelector((state) => state.navigation);
	const [loading, setLoading] = useState(false);
	const [userChat, setUserChat] = useState<IChat[]>([]);
	const [msg, setMsg] = useState('');
	const [typing, setTyping] = useState(false);
	const [readByUser, setReadByUser] = useState(false);
	const [readByMe, setReadByMe] = useState(false);

	useEffect(() => {
		if (isAdmin) {
			setLoading(true);
			const chatRef = ref(db, formMessagesPath(isProd, uid));
			const readRecipientRef = ref(db, readRecipientPath(isProd, uid));
			const readRecipientUserRef = ref(db, readRecipientPathUser(isProd, uid));
			onValue(readRecipientUserRef, async (snapshot) => {
				if (snapshot.exists()) {
					setReadByUser(snapshot.val());
				}
			});
			onValue(readRecipientRef, async (snapshot) => {
				if (snapshot.exists()) {
					setReadByMe(snapshot.val());
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
									!readByMe &&
									areNotificationsSupported()
								)
									new Notification('User sent a message', {
										body: message,
										icon: '/user.png'
									});
							}
						});
				} else setUserChat([]);
				setLoading(false);
			});
			const typingRef = ref(db, typingUserPath(isProd, uid, true));
			onValue(typingRef, async (snapshot) => {
				if (snapshot.exists()) {
					const isTyping = snapshot.val();
					setTyping(isTyping);
				}
			});
			return () => {
				off(chatRef);
				off(typingRef);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, uid]);

	useEffect(() => {}, [isAdmin]);

	const onSendMessage = () => {
		if (loading || msg === '') return;
		setLoading(true);
		const chatRef = ref(db, formMessagesPath(isProd, uid));
		const lastModified = ref(db, lastModifiedPath(isProd, uid));
		const emailRef = ref(db, emailRefPath(isProd, uid));
		const readRecipientRef = ref(db, readRecipientPath(isProd, uid));
		const readRecipientUserRef = ref(db, readRecipientPathUser(isProd, uid));
		const latestMessageRef = ref(db, latestMessagePath(isProd, uid));
		push(chatRef, {
			uri: '/chat-icon.png',
			isFromAdmin: true,
			message: msg
		} as IChat)
			.then(() => {
				set(lastModified, new Date().getTime());
				set(emailRef, email ?? uid);
				set(readRecipientRef, true);
				set(readRecipientUserRef, false);
				set(latestMessageRef, msg);
				setLoading(false);
				setMsg('');
			})
			.catch(() => {
				setLoading(false);
				setMsg('Failed to send message');
			});
	};

	const setAdminTyping = (typing: boolean) => {
		const typingRef = ref(db, typingUserPath(isProd, uid, false));
		const readRecipientRef = ref(db, readRecipientPath(isProd, uid));
		const readRecipientUserRef = ref(db, readRecipientPathUser(isProd, uid));
		set(readRecipientRef, true);
		set(readRecipientUserRef, false);
		set(typingRef, typing)
			.then(() => {
				setMsg('');
			})
			.catch(() => {
				setMsg('Failed to send message');
			});
	};
	const lastMessageNotFromUser = userChat?.[userChat.length - 1]?.isFromAdmin;

	return isAdmin ? (
		<div className={classes.ChatWindow}>
			<div className={classes.EntireChat}>
				<div className={classes.ChatElements}>
					{userChat.length > 0 ? (
						userChat.map((message) => (
							<ChatElement
								key={message.id}
								uri={message.uri}
								isFromAdmin={!message.isFromAdmin}
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
				{typing && <Typing />}
				{readByUser && !typing && lastMessageNotFromUser && (
					<p className={classes.ReadRecipient}>Read</p>
				)}
				<div className={classes.MessageSendContainer}>
					<input
						placeholder="Start typing a message..."
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
						onKeyUp={(e) => {
							if (e.key === 'Enter') onSendMessage();
						}}
						onFocus={() => setAdminTyping(true)}
						onBlur={() => setAdminTyping(false)}
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
			</div>
		</div>
	) : (
		<p>Unable to Fetch Results</p>
	);
};
export default ChatWindow;
