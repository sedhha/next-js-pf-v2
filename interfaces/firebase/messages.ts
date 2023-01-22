interface IAdminRootMessage {
	emailOfSender: string;
	lastModified: number;
	latestMessage: string;
	senderTyping?: boolean;
	visitorTyping?: boolean;
	read: boolean;
	key?: string;
}

export type { IAdminRootMessage };
