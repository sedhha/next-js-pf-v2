import { create } from 'zustand';

export interface NextAction {
	title: string;
	prompt: string;
}

export interface ChatImage {
	url: string;
	text: string;
}

export interface ChatMessage {
	id: string;
	text: string;
	next_actions: NextAction[];
	img: ChatImage[];
	timestamp?: number;
}

export interface ConfigCard {
	id: string;
	title: string;
	description: string;
	icon: string;
	gradient: string;
	borderColor: string;
	glowColor: string;
	componentTarget: 'component1' | 'component2';
}

interface BirthdayStore {
	currentView: 'intro' | 'token' | 'cards' | 'component1' | 'component2';
	birthdayToken: string | null;
	selectedConfig: ConfigCard | null;
	configCards: ConfigCard[];
	messages: ChatMessage[];
	currentMessagePage: number;
	totalMessages: number;
	messagesPerPage: number;

	// Actions
	// eslint-disable-next-line no-unused-vars
	setCurrentView: (view: BirthdayStore['currentView']) => void;
	// eslint-disable-next-line no-unused-vars
	setBirthdayToken: (token: string) => void;
	// eslint-disable-next-line no-unused-vars
	setSelectedConfig: (config: ConfigCard | null) => void;
	// eslint-disable-next-line no-unused-vars
	setConfigCards: (cards: ConfigCard[]) => void;
	// eslint-disable-next-line no-unused-vars
	setMessages: (messages: ChatMessage[]) => void;
	// eslint-disable-next-line no-unused-vars
	setCurrentMessagePage: (page: number) => void;
	// eslint-disable-next-line no-unused-vars
	setTotalMessages: (total: number) => void;
	resetState: () => void;
}

export const useBirthdayStore = create<BirthdayStore>((set) => ({
	currentView: 'intro',
	birthdayToken: null,
	selectedConfig: null,
	configCards: [],
	messages: [],
	currentMessagePage: 0,
	totalMessages: 0,
	messagesPerPage: 100,

	setCurrentView: (view) => set({ currentView: view }),
	setBirthdayToken: (token) => set({ birthdayToken: token }),
	setSelectedConfig: (config) => set({ selectedConfig: config }),
	setConfigCards: (cards) => set({ configCards: cards }),
	setMessages: (messages) => set({ messages }),
	setCurrentMessagePage: (page) => set({ currentMessagePage: page }),
	setTotalMessages: (total) => set({ totalMessages: total }),
	resetState: () =>
		set({
			currentView: 'intro',
			birthdayToken: null,
			selectedConfig: null,
			configCards: [],
			messages: [],
			currentMessagePage: 0,
			totalMessages: 0
		})
}));

const getCurrentView = () => useBirthdayStore.getState().currentView;
export { getCurrentView };
