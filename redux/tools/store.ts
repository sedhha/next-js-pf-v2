import { configureStore } from '@reduxjs/toolkit';
import navigation from '@/slices/navigation.slice';

export const store = configureStore({
	reducer: {
		navigation
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
