import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { MixpanelProvider } from 'react-mixpanel-browser';
import { mixPanelId } from '../config';

const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$blue200',
      primaryLightHover: '$blue300', // commonly used on hover state
      primaryLightActive: '$blue400', // commonly used on pressed state
      primaryLightContrast: '$blue600', // commonly used for text inside the component
      primary: '$blue600',
      primaryBorder: '$blue500',
      primaryBorderHover: '$blue600',
      primarySolidHover: '$blue700',
      primarySolidContrast: '$white', // commonly used for text inside the component
      primaryShadow: '$blue500',

      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd',

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <MixpanelProvider token={mixPanelId || ''}>
        <Head>
          <title>Welcome to crew!</title>
        </Head>
        <main className="app">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </main>
      </MixpanelProvider>
    </NextUIProvider>
  );
}

export default CustomApp;
