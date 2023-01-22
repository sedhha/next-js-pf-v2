import { useAppSelector } from '@/redux/hooks';
import classes from './PersonalChat.module.css';
import React from 'react';
import InfiniteCardComponent from '@/v2/common/InfiniteCard';
import {
	getDatabase,
	ref,
	onValue,
	query,
	limitToLast,
	orderByChild,
	off
} from 'firebase/database';
import { formRootMessagesPath } from '@/firebase/constants';
import app from '@/utils/fe/apis/services/firebase';
import { IAdminRootMessage } from '@/interfaces/firebase/messages';
import Typing from '@/v2/common/Typing';

const db = getDatabase(app);

const ChatWindow = () => {
	const { isAdmin } = useAppSelector((state) => state.navigation);
	const [limit, setLimit] = React.useState(100);
	const [messages, setMessages] = React.useState<IAdminRootMessage[]>([]);

	React.useEffect(() => {
		if (limit > messages.length && messages.length !== 0) return;
		const path = formRootMessagesPath(process.env.NODE_ENV === 'production');
		const messagesRef = ref(db, path);
		onValue(
			query(messagesRef, orderByChild('lastModified'), limitToLast(limit)),
			async (snapshot) => {
				if (snapshot.exists()) {
					const messages = snapshot.val() as { [key: string]: IAdminRootMessage };
					const values = Object.keys(messages)
						.reduce((acc, curr) => {
							const value = messages[curr] as IAdminRootMessage;
							acc.push({ ...value, key: curr });
							return acc;
						}, [] as IAdminRootMessage[])
						.sort((a, b) => b.lastModified - a.lastModified);
					setMessages([...values]);
				}
			}
		);

		return () => {
			off(messagesRef);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit]);
	return isAdmin ? (
		<InfiniteCardComponent
			onReachedBottomCallback={() => setLimit((limit) => limit + 100)}
			Component={
				<div className={classes.ChatWindow}>
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
					{messages.map((message) => (
						<div key={message.key} className={classes.MessageSection}>
							<h1>Email: {message.emailOfSender}</h1>
							<h2>Latest Message: {message.latestMessage}</h2>
							{!message.read && <h3>Unread</h3>}
							{message.visitorTyping && <Typing />}
						</div>
					))}
				</div>
			}
		/>
	) : (
		<div>404: Not Found!</div>
	);
};
export default ChatWindow;
