import {
	IAnalyticsData,
	IEventData,
	IFEData,
	IGeoAPI
} from '@/interfaces/analytics';
import { IPopup } from '@/interfaces/popup';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../tools/store';
import { feFetch } from '../../utils/fe/fetch-utils';
import { ANALYTICS_APIS } from '../../utils/fe/apis/public';

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
	popup: IPopup;
	showPopup: boolean;
	isUserSignedIn: boolean;
	userEmail?: string;
	userUid?: string;
	csrfToken?: string;
	geoData?: IGeoAPI;
	eventData?: IEventData[];
}

// Async Thunk to Post Events Data

export const sendAnalytics = createAsyncThunk(
	'sendAnalytics',
	async (_, { getState }) => {
		const { geoData, eventData, csrfToken } = (getState() as RootState)
			.navigation;
		if (!csrfToken || !geoData) return;
		return feFetch({
			url: ANALYTICS_APIS.RECORD,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': csrfToken
			},
			body: JSON.stringify({
				...geoData,
				events: eventData ?? []
			} as IFEData),
			keepAlive: true
		}).then((res) => {
			console.log('Response = ', res);
		});
	}
);

// Async Thunk to Post Events Data

export const closeAnalytics = createAsyncThunk(
	'closeAnalytics',
	async (_, { getState }) => {
		console.log('Closing analytics');
		const { geoData, eventData, csrfToken } = (getState() as RootState)
			.navigation;
		if (!csrfToken || !geoData) return;
		return feFetch({
			url: ANALYTICS_APIS.CLOSE,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': csrfToken
			},
			body: JSON.stringify({
				...geoData,
				events: eventData ?? []
			} as IFEData),
			keepAlive: true
		}).then((res) => {
			console.log('Closing Response = ', res);
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
	popup: {
		type: 'error',
		title: 'Oops, something went wrong',
		description: 'There was a problem with your submission. Please try again.',
		timeout: 3000
	},
	showPopup: false,
	isUserSignedIn: false
};

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
		}
	}
});

export const {
	hidePopup,
	updatePopup,
	updateGeoData,
	updateCsrfToken,
	updateUserSignIn,
	updateUserEmail,
	updateUserUid,
	updateActiveSection,
	updateRevisitor,
	updateShowMore,
	updateDarkMode,
	updateActiveBlogCategory,
	updateMostPopularSelected,
	updateInChatMode
} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navSlice.reducer;
