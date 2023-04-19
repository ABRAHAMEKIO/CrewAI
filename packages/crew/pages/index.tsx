import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Image,
  PressEvent,
  Textarea,
  Grid,
  Spacer,
  Link,
  Input,
  Tooltip,
  Text,
  Modal,
} from '@nextui-org/react';
import io from 'socket.io-client';
import { useMixpanel } from 'react-mixpanel-browser';
import Handlebars from 'handlebars/dist/cjs/handlebars';
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
  const [params, setParams] = useState([]);
  const [paramsData] = useState({});
  const [isBracketComplete, setBracketComplete] = useState([]);
  const [spaceDetected, setSpaceDetected] = useState(false);
  const [resultPrompt, setResultPrompt] = useState('');
  const [errorFormatParams, setErrorFormatParams] = useState(false);
  const [messageError, setMessageError] = useState('');
  const closeModal = () => {
    setErrorFormatParams(false);
  };

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
        resultPrompt,
      });
    }
    await midjourneyClient.imagine(resultPrompt, socketId, '');
    setLoading(true);
  }

  function bracketsRecognize(promptText: string) {
    const paramsCollections = [];
    const tempIndexParams = [];

    for (let i = 0; i < promptText.length; i += 1) {
      const x = promptText[i];
      const x1 = promptText[i + 1];

      if (x === '{' && x1 === '{') {
        tempIndexParams.push(i + 2);
        setBracketComplete([1]);
      }

      if (x === '}' && x1 === '}') {
        if (tempIndexParams.length > 0) {
          setBracketComplete([1, 2]);

          tempIndexParams.push(i);
          const words = promptText.slice(
            tempIndexParams[0],
            tempIndexParams[1]
          );

          if (words.includes(' ')) {
            setSpaceDetected(true);
          } else {
            paramsCollections.push(
              // push word in brackets
              words
            );
          }

          // reset temp indexing params
          tempIndexParams.length = 0;
        }
      }
    }

    return paramsCollections;
  }

  // TODO: implement to result prompt
  // function boldInputValue(result: string) {
  //   const getParamsValue = Object.keys(paramsData).map((key) => [
  //     paramsData[key],
  //   ]);
  //   const regexFormat = new RegExp(`(${getParamsValue.join('|')})`, 'ig');

  //   return result.replace(regexFormat, '<b>$1</b>');
  // }

  function handleChangePrompt(value: string) {
    const recognizedParams = bracketsRecognize(value);

    recognizedParams.map((val) => {
      if (paramsData[val] === undefined) {
        paramsData[val] = '';
      }
      return val;
    });

    if (value === '') {
      setParams([]);
      setPrompt('');
      setResultPrompt('');
    } else {
      setParams(recognizedParams);
      setPrompt(value);
      setResultPrompt('typing....');
    }
  }

  function handleBlurPrompt(value: string) {
    const recognizedParams = bracketsRecognize(value);

    recognizedParams.map((val) => {
      if (paramsData[val] === '') {
        paramsData[val] = '...';
      }
      return val;
    });

    const promptTemplate = Handlebars.compile(prompt);
    if (isBracketComplete.length <= 1 || spaceDetected) {
      setErrorFormatParams(true);
      setSpaceDetected(false);
      setMessageError("Parameter format isn't valid");
    } else if (promptTemplate && errorFormatParams === false) {
      const result = promptTemplate(paramsData);
      setResultPrompt(result);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const property in paramsData) {
      if (!recognizedParams.includes(property)) delete paramsData[property];
    }
  }

  function handleChangeInputParams(value: Array<string>) {
    const paramsKey = value[0];
    const paramsValue = value[1];

    paramsData[paramsKey] = paramsValue;

    const promptTemplate = Handlebars.compile(prompt);
    const result = promptTemplate(paramsData);

    // const makeBoldInputValue = boldInputValue(result);
    setResultPrompt(result);
  }

  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={errorFormatParams}
          onClose={closeModal}
        >
          <Modal.Header>
            <Text id="modal-title" size={18} weight="bold">
              WARNING
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>{messageError}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="gradient"
              onPress={() => setErrorFormatParams(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Grid.Container justify="center">
          <Grid md={4} xs={12} direction="column" css={{ p: 0 }}>
            <Header1 content="Playground" />
            <Header2 content="Write your first GenAI prompt" />
            <Textarea
              width="100%"
              cacheMeasurements={false}
              label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
              placeholder="A raccoon that can speak and wield a sword"
              onChange={(e) => handleChangePrompt(e.target.value)}
              onBlur={(e) => handleBlurPrompt(e.target.value)}
            />
            {socketId ? <p>Status: Connected</p> : <p>Status: Disconnected</p>}
            {resultPrompt && (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html:
                    'When you click try sample, you will executive this prompt ' +
                    `"${resultPrompt}"`,
                }}
              />
            )}
            {params &&
              params.map((item) => (
                <Grid.Container gap={1} justify="space-between" key={item}>
                  <Grid xs={4}>
                    <Tooltip content={item} placement="top" color="secondary">
                      <Text
                        css={{
                          my: 10,
                          textGradient: '45deg, $purple600 -20%, $pink600 100%',
                          maxWidth: '6em',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {item}
                      </Text>
                    </Tooltip>
                  </Grid>
                  <Grid xs={8}>
                    <Input
                      clearable
                      aria-label={item}
                      value={paramsData[item]}
                      placeholder="..."
                      fullWidth
                      onChange={(e) =>
                        handleChangeInputParams([
                          e.target.ariaLabel,
                          e.target.value,
                        ])
                      }
                    />
                  </Grid>
                </Grid.Container>
              ))}
            {error && <p>Error while generating image</p>}
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
              {loading ? 'Loading' : 'Draw'}
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
