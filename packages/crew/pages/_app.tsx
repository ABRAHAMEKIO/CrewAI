import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
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

function CustomApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
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
              </Head>
              <main className="app">
                <PromptContext.Provider value={newPrompt}>
                  {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
                  <LoadingContext.Provider value={{ loading, setLoading }}>
                    <NavNewPromptContext.Provider value={NavNewPromptContextValue}>
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

export default CustomApp;
