import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IRoutes } from '@/interfaces/ui';
import { AvailableRoutes, routeKeys, routers } from '@/constants/routes';

// Define a type for the slice state

interface UIState {
  darkMode: boolean;
  routes: IRoutes;
  activeRoute: AvailableRoutes;
  showNavBar: boolean;
}

// Define the initial state using that type
const initialState: UIState = {
  darkMode: false,
  routes: routers,
  activeRoute: routeKeys.ABOUT_ROUTE,
  showNavBar: false,
};

export const uiState = createSlice({
  name: 'ui',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleMode: (state: UIState) => {
      state.darkMode = !state.darkMode;
    },
    updateActiveRoute: (
      state: UIState,
      action: PayloadAction<AvailableRoutes>
    ) => {
      state.activeRoute = action.payload;
    },
    toggleNavBar: (state: UIState) => {
      state.showNavBar = !state.showNavBar;
    },
  },
});

export const { toggleMode, updateActiveRoute, toggleNavBar } = uiState.actions;

// Other code such as selectors can use the imported `RootState` type

export default uiState.reducer;
