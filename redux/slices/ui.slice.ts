import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

// Define a type for the slice state
interface UIState {
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: UIState = {
  darkMode: false,
};

export const uiState = createSlice({
  name: 'ui',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateMode: (state: UIState, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { updateMode } = uiState.actions;

// Other code such as selectors can use the imported `RootState` type

export default uiState.reducer;
