import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'tailwindcss/tailwind.css';
import { MixpanelProvider } from 'react-mixpanel-browser';
import { mixPanelId } from '../config';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <MixpanelProvider token={mixPanelId || ''}>
      <Head>
        <title>Hologram</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
      </Head>
      <main className="app">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </main>
    </MixpanelProvider>
  );
}

export default CustomApp;
