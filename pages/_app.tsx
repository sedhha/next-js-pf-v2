import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import React from 'react';
import BaseWrapper from '@/components/BaseWrapper';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<BaseWrapper Component={<Component {...pageProps} />} />
			<Analytics />
		</Provider>
	);
}
