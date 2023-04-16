import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Image,
  Link,
  Navbar,
  PressEvent,
  Text,
  Textarea,
} from '@nextui-org/react';
import io from 'socket.io-client';
import { useMixpanel } from 'react-mixpanel-browser';
import { Header1, Header2 } from '../components/Heading';

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
    if (mixpanel.config.token) {
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
            if (mixpanel.config.token) {
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
    if (mixpanel.config.token) {
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
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            CrewAI
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Container>
        <Header1 content="CrewAI - A prompt-to-mint AI" />
        <Header2 content="No need for sophisticated tool, use your word to create NFT" />
        <Textarea
          width="100%"
          cacheMeasurements={false}
          label="Write your awesome AI prose here"
          placeholder="A raccoon that can speak and wield a sword"
          onChange={(e) => setPrompt(e.target.value)}
        />
        {socketId && <p>Socket ID: {socketId}</p>}
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
