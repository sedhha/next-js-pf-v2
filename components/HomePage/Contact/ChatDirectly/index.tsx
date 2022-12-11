import React from 'react';
import { useAppSelector } from '../../../../redux/tools/hooks';
import ChatWindow from './ChatWindow';
import Authenticate from './Authenticate';

export default function ChatDirectly() {
	const { inChatMode } = useAppSelector((state) => state.navigation);
	return inChatMode ? <ChatWindow /> : <Authenticate />;
}
