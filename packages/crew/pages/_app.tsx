import React, { useEffect, useState } from 'react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { gnosis, polygon } from 'wagmi/chains';
import './styles.css';
import 'tailwindcss/tailwind.css';
import { MixpanelProvider } from 'react-mixpanel-browser';
import io from 'socket.io-client';
import { mixPanelId, server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';
import PromptContext from '../context/prompt-context';
import LoadingContext from '../context/loading-context';
import NavNewPromptContext from '../context/nav-new-prompt-context';
import { PromptAttributes } from '../db/models/prompt';

import '@rainbow-me/rainbowkit/styles.css';

let socket;

const gnosisChain = {
  ...gnosis,
  iconUrl:
    'https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png',
};

const { chains, publicClient } = configureChains(
  [gnosisChain, polygon],
  [publicProvider()]
);
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'You are going to connect your wallet and signed in to Hologram.',
});

type AppOwnProps = {
  metaTags: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
};

function CustomApp({
  Component,
  pageProps,
  metaTags,
}: AppProps<{
  session: Session;
}> &
  AppOwnProps) {
  const [socketId, setSocketId] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [newPrompt, setNewPrompt] = useState<PromptAttributes>(null);
  useEffect(() => {
    fetch(`${server}/api/socket`)
      .then(() => {
        socket = io(wsServer);

        socket.on(MidjourneyCommand.Connected.toString(), () => {
          // eslint-disable-next-line no-console
          console.info('connected');
          // eslint-disable-next-line no-console
          console.info(`${socket.id}`);
          setSocketId(socket.id);
        });

        socket.on(
          MidjourneyCommand.ModelResults.toString(),
          (val: WebhookSuccessResponse) => {
            // eslint-disable-next-line no-console
            console.info(val);
            setLoading(false);
            setNewPrompt(val.prompt);
          }
        );
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, []);

  const [promptId, setPromptId] = useState<number>(null);
  const [indicatorNewPromptDisplay, setIndicatorNewPromptDisplay] =
    useState<boolean>(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const NavNewPromptContextValue = {
    promptId,
    setPromptId,
    indicatorNewPromptDisplay,
    setIndicatorNewPromptDisplay,
  };

  return (
    <MixpanelProvider token={mixPanelId || ''}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider chains={chains}>
              <Head>
                <title>Hologram</title>
                <meta
                  httpEquiv="ScreenOrientation"
                  content="autoRotate:disabled"
                />
                {/* Primary Meta Tags */}
                <meta name="title" content={metaTags.title} />
                <meta name="description" content={metaTags.description} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={`${server}/?v=${metaTags.id}`}
                />
                <meta property="og:title" content={metaTags.title} />
                <meta
                  property="og:description"
                  content={metaTags.description}
                />
                <meta property="og:image" content={metaTags.imageUrl} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  name="twitter:url"
                  content={`${server}/?v=${metaTags.id}`}
                />
                <meta name="twitter:title" content={metaTags.title} />
                <meta
                  name="twitter:description"
                  content={metaTags.description}
                />
                <meta name="twitter:image" content={metaTags.imageUrl} />
              </Head>
              <main className="app">
                <PromptContext.Provider value={newPrompt}>
                  {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
                  <LoadingContext.Provider value={{ loading, setLoading }}>
                    <NavNewPromptContext.Provider
                      value={NavNewPromptContextValue}
                    >
                      {/* eslint-disable react/jsx-props-no-spreading */}
                      <Component
                        {...pageProps}
                        socketId={socketId}
                        newPrompt={newPrompt}
                      />
                      {/* set global socket id to component */}
                    </NavNewPromptContext.Provider>
                  </LoadingContext.Provider>
                </PromptContext.Provider>
              </main>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </MixpanelProvider>
  );
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  return {
    ...ctx,
    metaTags: {
      id: -15,
      title: 'painting',
      description:
        'mdjrny-v4 style a highly detailed matte painting of a man on a hill watching a rocket launch in the distance by studio ghibli, makoto shinkai, by artgerm, by wlop, by greg rutkowski, volumetric lighting, octane render, 4 k resolution, trending on artstation, masterpiece',
      imageUrl:
        'https://cdn.discordapp.com/attachments/1102867395204370464/1105227916163424306/DavidmWilliams123_A_tranquil_Zen_garden_with_raked_sand_careful_60f1e132-e652-4c2e-ba08-1c3dbebbe143.png',
    },
  };
};

export default CustomApp;
