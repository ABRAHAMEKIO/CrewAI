import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'tailwindcss/tailwind.css';
import { MixpanelProvider } from 'react-mixpanel-browser';
import io from 'socket.io-client';
import { mixPanelId, server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import Homepage from './home/index';
import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';
import PromptContext from '../context/prompt-context';
import { PromptAttributes } from '../db/models/prompt';

let socket;

function CustomApp({ Component, pageProps }: AppProps) {
  const [socketId, setSocketId] = useState<string>(null);
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
            setNewPrompt(val.prompt);
          }
        );
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, []);
  return (
    <MixpanelProvider token={mixPanelId || ''}>
      <Head>
        <title>Hologram</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
      </Head>
      <main className="app">
        <PromptContext.Provider value={newPrompt}>
          <Homepage socketId={socketId} />
        </PromptContext.Provider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {/* <Component {...pageProps} /> */}
      </main>
    </MixpanelProvider>
  );
}

export default CustomApp;
