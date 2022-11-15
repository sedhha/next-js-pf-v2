import HomePage from '@/components/HomePage';
import Head from 'next/head';
import React from 'react';
// localhost:3000/
export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </React.Fragment>
  );
}
