import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IRoutes } from '@/interfaces/ui';
import { AvailableRoutes, routeKeys, routers } from '@/constants/routes';

// Define a type for the slice state

interface UIState {
  darkMode: boolean;
  routes: IRoutes;
  activeRoute: AvailableRoutes;
}

// Define the initial state using that type
const initialState: UIState = {
  darkMode: false,
  routes: routers,
  activeRoute: routeKeys.ABOUT_ROUTE,
};

export const uiState = createSlice({
  name: 'ui',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateMode: (state: UIState, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    updateActiveRoute: (
      state: UIState,
      action: PayloadAction<AvailableRoutes>
    ) => {
      state.activeRoute = action.payload;
    },
  },
});

export const { updateMode, updateActiveRoute } = uiState.actions;

// Other code such as selectors can use the imported `RootState` type

export default uiState.reducer;
