import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { MixpanelProvider } from 'react-mixpanel-browser';

const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

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
      <MixpanelProvider token={process.env.NEXT_PUBLIC_MIXPANEL_ID || ''}>
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
