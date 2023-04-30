import { configureStore } from '@reduxjs/toolkit';
import navigation from '@/slices/navigation.slice';
import analytics from '@/slices/analytics.slice';

export const store = configureStore({
	reducer: {
		navigation,
		analytics
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
