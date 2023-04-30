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
	showMore: boolean; // If header is visible in mobile devices or not
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
}

// Define the initial state using that type
const initialState: INavigationSlice = {
	showMore: false,
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
	isAdminOnline: false
};

export const navSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		updateShowMore: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.showMore = action.payload;
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
		}
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
	hidePopup,
	updatePopup,
	updateIsAdmin,
	updateIsAdminOnline,
	updateCsrfToken,
	updateIDToken,
	updateUserEmail,
	updateUserUid,
	updateShowMore,
	updateMostPopularSelected,
	updateInChatMode
} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navSlice.reducer;
