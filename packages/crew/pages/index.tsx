import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Image,
  PressEvent,
  Textarea,
  Text,
  Grid,
  Spacer,
  Link,
} from '@nextui-org/react';
import io from 'socket.io-client';
import { useMixpanel } from 'react-mixpanel-browser';
import Handlebars from 'handlebars/dist/cjs/handlebars';
import { Header1, Header2 } from '../components/Heading';
import NavigationBar from '../components/NavigationBar';

import { server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import Layout from '../components/Layout';
import { successBeep, errorBeep } from '../domain/sounds/beep';
import FileUpload from '../components/FileUpload';
import bracketsRecognize from '../helpers/bracketsRecognize';
import ErrorValidationModal from '../components/ErrorValidationModal';
import ParametersFromPrompt from '../components/ParametersFromPrompt';
import Information from '../components/Information';

let socket;

function Index() {
  const mixpanel = useMixpanel();
  const [socketId, setSocketId] = useState(null);
  const [response, setResponse] = useState(null as WebhookSuccessResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [prompt, setPrompt] = useState('');
  const midjourneyClient = new MidjourneyClient('', `${server}/api/thenextleg`);
  const [params, setParams] = useState([]);
  const [paramsData] = useState({});
  const [finalPrompt, setFinalPrompt] = useState('');
  const [errorValidationModal, setErrorValidationModal] = useState(false);
  const [seedFileName, setSeedFileName] = useState('');
  const ToggleModal = () => setErrorValidationModal(!errorValidationModal);
  const ParametersValue = (value: string) => {
    setFinalPrompt(value);
  };

  useEffect(() => {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      /* eslint-disable no-console */
      console.log('mixpanel is being called');
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
              setErrorMessage('');
              setResponse(val);
              successBeep();
            } else {
              setError(true);
              setErrorMessage(val.content);
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
        finalPrompt,
      });
    }
    const imagineResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.imagine(
        `${seedFileName} ${finalPrompt}`,
        socketId,
        ''
      );
    if ('isNaughty' in imagineResponse && imagineResponse.isNaughty) {
      setError(true);
      setErrorMessage(
        `there (are) prohibited phrase(s) ${imagineResponse.phrase}`
      );
      errorBeep();
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  function handleChangePrompt(value: string) {
    const res = bracketsRecognize(value);

    if (res.data !== null) {
      res.data.map((val) => {
        if (paramsData[val] === undefined) {
          paramsData[val] = '...';
        }
        return val;
      });

      setPrompt(value);
      setParams(res.data);
    } else {
      setErrorValidationModal(true);
    }
  }

  function handleBlurPrompt(value: string) {
    const res = bracketsRecognize(value);

    if (res.data !== null) {
      const promptTemplate = Handlebars.compile(prompt);
      const result = promptTemplate(paramsData);
      setFinalPrompt(result);

      // eslint-disable-next-line no-restricted-syntax
      for (const property in paramsData) {
        if (!res.data.includes(property)) delete paramsData[property];
      }
    }
  }

  return (
    <Layout>
      <NavigationBar />
      <Container>
        {errorValidationModal && (
          <ErrorValidationModal
            modalOpen={errorValidationModal}
            modalClose={ToggleModal}
            message="parameters format cannot contain spaces."
          />
        )}
        <Grid.Container justify="center">
          <Grid md={8} direction="column" css={{ p: 0 }}>
            <Header1 content="Playground" />
            <Header2 content="Write your first GenAI prompt" />
            <Textarea
              width="100%"
              cacheMeasurements={false}
              label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
              placeholder="A raccoon that can speak and wield a sword"
              onChange={(e) => handleChangePrompt(e.target.value)}
              onBlur={(e) => handleBlurPrompt(e.target.value)}
              onFocus={() => setFinalPrompt('typing...')}
            />
            <FileUpload
              onUploadFinished={(fileName: string) => setSeedFileName(fileName)}
            />
            {socketId ? <p>Status: Connected</p> : <p>Status: Disconnected</p>}
            {finalPrompt && (
              <p>
                <em>
                  When you click <strong>try sample</strong>, you will execute
                  this prompt &quot;
                  {finalPrompt}&quot;
                </em>
              </p>
            )}
            {params && (
              <ParametersFromPrompt
                prompt={prompt}
                params={params}
                paramsData={paramsData}
                finalPrompt={ParametersValue}
              />
            )}
            {!loading && error && (
              <Text color="error">
                Error while generating image: {errorMessage}
              </Text>
            )}
            <Link href="#promptPresets" css={{ float: 'right' }}>
              Open Prompt Presets
            </Link>
            <Spacer y={1.5} />
            <Button
              color="gradient"
              onPress={(e) => handleSubmit(e)}
              disabled={loading}
              css={{ float: 'right', maxWidth: '2rem' }}
            >
              {loading ? 'Loading' : 'Try sample'}
            </Button>
          </Grid>
          {!error && response && (
            <>
              <Spacer x={4} />
              <Grid direction="column" md={4} alignItems="center">
                <div style={{ marginTop: '4vh' }}>
                  <Image
                    css={{ maxWidth: 550 }}
                    src={response?.imageUrl}
                    alt="Your amazing generative art"
                  />
                </div>
                <Spacer y={1} />
                <Button.Group color="gradient" ghost>
                  <Button>V 1</Button>
                  <Button>V 2</Button>
                  <Button>V 3</Button>
                  <Button>V 4</Button>
                </Button.Group>
              </Grid>
            </>
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export default Index;
