import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';



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
}

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
	inChatMode: false
};

export const navSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		updateActiveSlice: (
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
		updateActiveBlogCategory: (state: INavigationSlice, action: PayloadAction<string>) => {
			state.activeBlogCategory = action.payload;
		},
		updateMostPopularSelected: (state: INavigationSlice, action: PayloadAction<string>) => {
			state.mostPopularSelectedBlogId = action.payload;
		},
		updateInChatMode: (state: INavigationSlice, action: PayloadAction<boolean>) => {
			state.inChatMode = action.payload;
		}
	}
	
});

export const { 
	updateActiveSlice, 
	updateRevisitor, 
	updateShowMore,
	updateDarkMode,
	updateActiveBlogCategory,
	updateMostPopularSelected,
	updateInChatMode
	} = navSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navSlice.reducer;
