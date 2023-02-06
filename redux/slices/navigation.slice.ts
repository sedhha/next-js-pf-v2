import { IEventData } from '@/interfaces/analytics';
import { IFirebaseUser } from '@/interfaces/fe/user';
import { IPopup } from '@/interfaces/popup';
import { info } from '@/utils/dev-utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

// Thunks

export const updateUser = createAsyncThunk('updateUser', async (user: User) => {
	const results = await user.getIdTokenResult().then((result) => {
		return {
			idToken: result.token,
			subscriptionPending: result.claims.subscriptionPending ?? true,
			isAdmin: result.claims.admin ?? false
		};
	});
	return {
		email: user.email,
		uid: user.uid,
		idToken: results.idToken,
		subscriptionPending: results.subscriptionPending,
		isAdmin: results.isAdmin
	} as IFirebaseUser;
});

// Define a type for the slice state
export interface INavigationSlice {
	// Global Frontend
	activeSection: string; // Which Active Section is user surfing on?
	showMore: boolean; // If header is visible in mobile devices or not
	darkMode: boolean; // If the UI is in dark mode
	mostPopularSelectedBlogId: string; // We may move it to Blog Specific
	inChatMode: boolean;
	popup: IPopup;
	showPopup: boolean;
	userEmail?: string;
	userUid?: string;
	subscriptionPending?: boolean;
	idToken?: string;
	csrfToken?: string;
	isAdmin: boolean;
	isAdminOnline: boolean;
	eventData?: IEventData[];

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

// Define the initial state using that type
const initialState: INavigationSlice = {
	activeSection: 'about',
	showMore: false,
	darkMode: true,
	mostPopularSelectedBlogId: 'get-started-with-next-js',
	inChatMode: false,
	popup: {
		type: 'error',
		title: 'Init Connection',
		description: 'Init Connection',
		timeout: 3000
	},
	showPopup: false,
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
	techStackViewed: false
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
		updateShowMore: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.showMore = action.payload;
		},
		updateDarkMode: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.darkMode = action.payload;
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
		sendAnalytics: () => {}
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<IFirebaseUser>) => {
					const { email, uid, idToken, subscriptionPending, isAdmin } =
						action.payload;
					state.userEmail = email;
					state.userUid = uid;
					state.idToken = idToken;
					state.subscriptionPending = subscriptionPending;
					state.isAdmin = isAdmin;
				}
			)
			.addCase(updateUser.rejected, (_, action) => {
				info(`Failed to Update User Details`, action);
			});
	}
});

export const {
	sendAnalytics,
	hidePopup,
	updatePopup,
	updateViewed,
	updateIsAdmin,
	updateIsAdminOnline,
	updateCsrfToken,
	updateIDToken,
	updateUserEmail,
	updateUserUid,
	updateActiveSection,
	updateShowMore,
	updateDarkMode,
	updateMostPopularSelected,
	updateInChatMode
} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navSlice.reducer;
