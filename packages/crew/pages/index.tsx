import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Image,
  PressEvent,
  Textarea,
} from '@nextui-org/react';
import io from 'socket.io-client';
import { useMixpanel } from 'react-mixpanel-browser';
import { Header1, Header2 } from '../components/Heading';
import NavigationBar from '../components/NavigationBar';

import { server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import MidjourneyClient, {
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import Layout from '../components/Layout';
import { successBeep, errorBeep } from '../domain/sounds/beep';

let socket;

function Index() {
  const mixpanel = useMixpanel();
  const [socketId, setSocketId] = useState(null);
  const [response, setResponse] = useState(null as WebhookSuccessResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState('');
  const midjourneyClient = new MidjourneyClient(
    '',
    `${server}/api/thenextleg/imagine`
  );

  useEffect(() => {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('home_page_view');
    }
  });

  useEffect(() => {
    fetch(`${server}/api/socket`)
      .then(() => {
        socket = io(wsServer);

        socket.on(
          MidjourneyCommand.ModelResults.toString(),
          (val: WebhookSuccessResponse) => {
            if (mixpanel && mixpanel.config && mixpanel.config.token) {
              // Check that a token was provided (useful if you have environments without Mixpanel)
              // TODO: use enum for all metrics
              mixpanel.track('image_generation_success', {
                ...val,
              });
            }
            if (val.imageUrl) {
              setError(false);
              setResponse(val);
              successBeep();
            } else {
              setError(true);
              errorBeep();
            }
            setLoading(false);
          }
        );

        socket.on(MidjourneyCommand.Connected.toString(), () => {
          // eslint-disable-next-line no-console
          console.info('connected');
          setSocketId(socket.id);
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, [mixpanel]);

  async function handleSubmit(event: PressEvent): Promise<void> {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('image_generation_requested', {
        prompt,
      });
    }
    await midjourneyClient.imagine(prompt, socketId, '');
    setLoading(true);
  }

  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Header1 content="Playground" />
        <Header2 content="Write your first GenAI prompt" />
        <Textarea
          width="100%"
          cacheMeasurements={false}
          label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
          placeholder="A raccoon that can speak and wield a sword"
          onChange={(e) => setPrompt(e.target.value)}
        />
        {socketId ? <p>Status: Connected</p> : <p>Status: Disconnected</p>}
        {!error && response && (
          <Image
            width={1200}
            src={response?.imageUrl}
            alt="Your amazing generative art"
          />
        )}
        {error && <p>Error while generating image</p>}
        <Button
          color="gradient"
          onPress={(e) => handleSubmit(e)}
          disabled={loading}
        >
          {loading ? 'Loading' : 'Draw'}
        </Button>
      </Container>
    </Layout>
  );
}

export default Index;
