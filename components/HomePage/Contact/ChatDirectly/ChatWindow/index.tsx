import React from 'react';
import ChatElement from './ChatElement';
import Icon from '@/components/common/Icons';
import classes from './ChatWindow.module.css';
import { useAppDispatch } from '../../../../../redux/tools/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';

const chats = [
	{
		id: 0,
		uri: '/chat-icon.png',
		isFrom: true,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 1,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 2,
		uri: '/chat-icon.png',
		isFrom: true,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 3,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 4,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 5,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 6,
		uri: '/chat-icon.png',
		isFrom: true,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 7,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 8,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 9,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 10,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 11,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	},
	{
		id: 12,
		uri: '/chat-icon.png',
		isFrom: false,
		message:
			'Random conversation message coming from the host. This is just a sample text message and nothing else.'
	}
];

export default function ChatWindow() {
	const dispatch = useAppDispatch();
	return (
		<div className={classes.ChatContainer}>
			<div className={classes.TopNavigation}>
				<h2>Chat Anonymously</h2>
				<h2 onClick={() => dispatch(updateInChatMode(false))}>X</h2>
			</div>
			<div className={classes.ChatWindow}>
				<div className={classes.ChatElements}>
					{chats.map((message) => (
						<ChatElement
							key={message.id}
							uri={message.uri}
							isFrom={message.isFrom}
							message={message.message}
						/>
					))}
				</div>
				<div className={classes.MessageSendContainer}>
					<input placeholder="Start typing a message..." />
					<Icon
						iconKey="AiOutlineSend"
						className={classes.MessageSendContainer_button}
					/>
				</div>
			</div>
		</div>
	);
}
