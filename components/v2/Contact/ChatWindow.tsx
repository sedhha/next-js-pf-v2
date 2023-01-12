import React from 'react';
import classes from './Contact.module.css';
import ChatElement from './ChatElement';
import { useAppDispatch } from '@/redux/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';
import Icon from '@/v2/common/Icons';
import app from '@/fe-client/firebase';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
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
const chatRef = ref(
	db,
	`${
		process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
	}-user-messages/user-01`
);

interface IChat {
	uri: string;
	id: string;
	isFrom: boolean;
	message: string;
}

const Contact = () => {
	const [userChat, setUserChat] = React.useState<IChat[]>([]);
	const [msg, setMsg] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
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
	}, []);
	const dispatch = useAppDispatch();
	const onSendMessage = () => {
		if (loading) return;
		setLoading(true);
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
					iconKey="AiOutlineSend"
					className={classes.MessageSendContainer_button}
					onClick={onSendMessage}
				/>
			</div>
		</section>
	);
};

export default Contact;
