<<<<<<< HEAD
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import React from 'react';
import BaseWrapper from '@/components/BaseWrapper';
||||||| parent of 3f34286 (Added Frontend Files)
import '@/styles/global.css'
import type { AppProps } from 'next/app'
=======
import '@/styles/global.scss';
import type { AppProps } from 'next/app';
>>>>>>> 3f34286 (Added Frontend Files)

export default function MyApp({ Component, pageProps }: AppProps) {
<<<<<<< HEAD
	return (
		<Provider store={store}>
			<BaseWrapper Component={<Component {...pageProps} />} />
		</Provider>
	);
||||||| parent of 3f34286 (Added Frontend Files)
  return <Component {...pageProps} />
=======
  return <Component {...pageProps} />;
>>>>>>> 3f34286 (Added Frontend Files)
}
