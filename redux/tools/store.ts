import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ui from '@/redux-slices/ui.slice';
const rootReducer = combineReducers({
  ui,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
