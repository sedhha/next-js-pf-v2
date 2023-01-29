import { IEventData, IGeoAPI } from '@/interfaces/analytics';
import { IPopup } from '@/interfaces/popup';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { feFetch } from '@/utils/fe/fetch-utils';
import { ANALYTICS_APIS } from '@/utils/fe/apis/public';
import { isAnalyticsEnabled, supportedOperations } from '@/firebase/constants';
import { FEventData } from '../../interfaces/analytics';

// Define a type for the slice state
export interface INavigationSlice {
	activeSection: string;
	revisitor: number;
	showMore: boolean;
	onMoreElement: boolean;
	onMoreItemsElement: boolean;
	darkMode: boolean;
	activeBlogCategory: string;
	mostPopularSelectedBlogId: string;
	inChatMode: boolean;
	loadingAuthState: boolean;
	popup: IPopup;
	showPopup: boolean;
	isUserSignedIn: boolean;
	userEmail?: string;
	userUid?: string;
	idToken?: string;
	csrfToken?: string;
	isAdmin: boolean;
	isAdminOnline: boolean;
	geoData?: IGeoAPI;
	eventData?: IEventData[];
	fingerprint?: string;
	closeReqd: boolean;

	// Viewed Sections
	workViewed: boolean;
	blogViewed: boolean;
	contactViewed: boolean;
	projectsViewed: boolean;
	awardsViewed: boolean;
	videosViewed: boolean;
	testimonialsViewed: boolean;
	techStackViewed: boolean;
}

// Async Thunk to Post Events Data

export const closeAnalytics = createAsyncThunk(
	'closeAnalytics',
	async (abruptly: boolean = false, { getState }) => {
		const {
			eventData,
			csrfToken,
			workViewed,
			blogViewed,
			contactViewed,
			projectsViewed,
			awardsViewed,
			videosViewed,
			userEmail,
			userUid,
			fingerprint
		} = (getState() as RootState).navigation;
		if (!csrfToken || !fingerprint) return;
		const eventsData: FEventData = {
			eventData: eventData ?? [],
			key: fingerprint,
			workViewed,
			blogViewed,
			contactViewed,
			projectsViewed,
			awardsViewed,
			videosViewed,
			uid: userUid,
			email: userEmail
		};
		feFetch({
			url: `${ANALYTICS_APIS.TRACK}?opType=${
				abruptly ? supportedOperations.forceClose : supportedOperations.close
			}`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': csrfToken
			},
			body: JSON.stringify(eventsData as FEventData),
			keepAlive: true
		});
	}
);

// Define the initial state using that type
const initialState: INavigationSlice = {
	activeSection: 'about',
	revisitor: 0,
	showMore: false,
	onMoreElement: false,
	onMoreItemsElement: false,
	darkMode: false,
	activeBlogCategory: 'web-development',
	mostPopularSelectedBlogId: 'get-started-with-next-js',
	inChatMode: false,
	loadingAuthState: true,
	popup: {
		type: 'error',
		title: 'Oops, something went wrong',
		description: 'There was a problem with your submission. Please try again.',
		timeout: 3000
	},
	showPopup: false,
	isUserSignedIn: false,
	isAdmin: false,
	isAdminOnline: false,
	// viewed Sections
	workViewed: false,
	blogViewed: false,
	contactViewed: false,
	projectsViewed: false,
	awardsViewed: false,
	videosViewed: false,
	testimonialsViewed: false,
	techStackViewed: false,
	closeReqd: true
};

type ViewedKeys =
	| 'workViewed'
	| 'blogViewed'
	| 'contactViewed'
	| 'projectsViewed'
	| 'awardsViewed'
	| 'videosViewed'
	| 'testimonialsViewed'
	| 'techStackViewed';

export const navSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		updateActiveSection: (
			state: INavigationSlice,
			action: PayloadAction<string>
		) => {
			state.activeSection = action.payload;
		},
		updateRevisitor: (state: INavigationSlice, action: PayloadAction<number>) => {
			state.revisitor = action.payload;
		},
		updateShowMore: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.showMore = action.payload;
		},
		updateDarkMode: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.darkMode = action.payload;
		},
		updateActiveBlogCategory: (
			state: INavigationSlice,
			action: PayloadAction<string>
		) => {
			state.activeBlogCategory = action.payload;
		},
		updateMostPopularSelected: (
			state: INavigationSlice,
			action: PayloadAction<string>
		) => {
			state.mostPopularSelectedBlogId = action.payload;
		},
		updateInChatMode: (
			state: INavigationSlice,
			action: PayloadAction<boolean>
		) => {
			state.inChatMode = action.payload;
		},
		hidePopup: (state: INavigationSlice) => {
			state.showPopup = false;
		},
		updatePopup: (state: INavigationSlice, action: PayloadAction<IPopup>) => {
			state.showPopup = true;
			state.popup = action.payload;
		},
		updateUserSignIn: (
			state: INavigationSlice,
			action: PayloadAction<boolean>
		) => {
			state.isUserSignedIn = action.payload;
			state.inChatMode = action.payload;
		},
		updateUserEmail: (
			state: INavigationSlice,
			action: PayloadAction<string | undefined>
		) => {
			state.userEmail = action.payload;
		},
		updateUserUid: (
			state: INavigationSlice,
			action: PayloadAction<string | undefined>
		) => {
			state.userUid = action.payload;
		},
		updateCsrfToken: (
			state: INavigationSlice,
			action: PayloadAction<string | undefined>
		) => {
			state.csrfToken = action.payload;
		},
		updateGeoData: (
			state: INavigationSlice,
			action: PayloadAction<IGeoAPI | undefined>
		) => {
			state.geoData = action.payload;
		},
		updateViewed: (
			state: INavigationSlice,
			action: PayloadAction<ViewedKeys>
		) => {
			state[action.payload] = true;
		},
		updateIsAdmin: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
		updateIsAdminOnline: (
			state: INavigationSlice,
			action: PayloadAction<boolean>
		) => {
			state.isAdminOnline = action.payload;
		},
		updateIDToken: (
			state: INavigationSlice,
			action: PayloadAction<string | undefined>
		) => {
			state.idToken = action.payload;
		},
		updateAuthState: (
			state: INavigationSlice,
			action: PayloadAction<boolean>
		) => {
			state.loadingAuthState = action.payload;
		},
		updateFingerPrint: (
			state: INavigationSlice,
			action: PayloadAction<string>
		) => {
			state.fingerprint = action.payload;
		},
		updateCloseReqd: (
			state: INavigationSlice,
			action: PayloadAction<boolean>
		) => {
			state.closeReqd = action.payload;
		},
		sendAnalytics: () => {}
	}
});

export const {
	sendAnalytics,
	updateFingerPrint,
	updateCloseReqd,
	hidePopup,
	updatePopup,
	updateViewed,
	updateIsAdmin,
	updateIsAdminOnline,
	updateGeoData,
	updateCsrfToken,
	updateIDToken,
	updateUserSignIn,
	updateUserEmail,
	updateUserUid,
	updateActiveSection,
	updateRevisitor,
	updateShowMore,
	updateDarkMode,
	updateActiveBlogCategory,
	updateMostPopularSelected,
	updateInChatMode,
	updateAuthState
} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navSlice.reducer;
