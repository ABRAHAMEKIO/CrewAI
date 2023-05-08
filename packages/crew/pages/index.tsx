import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  Container,
  PressEvent,
  Textarea,
  Text,
  Grid,
  Spacer,
  Collapse,
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
import CreateGroupModal from '../components/CreateGroupModal';
import ParametersFromPrompt from '../components/ParametersFromPrompt';
import ImagineResponse, {
  decodeReference,
  Reference,
  ImageResponseContext,
} from '../components/ImagineResponse';
import FormSuggestion from '../components/FormSuggestion';
import { promptInit, promptAll } from '../helpers/prompt';
import GetStarted from '../components/GetStarted';

let socket;

interface PromptHistory {
  webhookSuccessResponse: WebhookSuccessResponse;
  prompt: string;
}

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
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [seedFileName, setSeedFileName] = useState('');
  const [cretorImageUrl, setCreatorImageurl] = useState(null);
  // TODO: need to make the history of prompt more reliable, this is only temporary hacks
  const [historyResponse, setHistoryResponse] = useState<PromptHistory[]>([]);

  const ErrorValidationToggleModal = () =>
    setErrorValidationModal(!errorValidationModal);
  const CreateGroupToggleModal = () => setCreateGroupModal(!createGroupModal);

  const [advancedPrompt, setAdvancedPrompt] = useState([]);
  const [suggestions, setSuggestions] = useState([...promptInit]);
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
              historyResponse.push({
                webhookSuccessResponse: val,
                prompt: val.content,
              });
              setHistoryResponse(historyResponse);
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
          // eslint-disable-next-line no-console
          console.info(`${socket.id}`);
          setSocketId(socket.id);
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, [historyResponse, mixpanel]);

  async function handleSubmit(event: PressEvent): Promise<void> {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('image_generation_requested', {
        finalPrompt,
      });
    }
    const completePrompt = `${seedFileName} ${advancedPrompt.join(
      ' '
    )} ${finalPrompt}`;
    const imagineResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.imagine(completePrompt, socketId, '');
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

  function isUpscale(reference: Reference): boolean {
    const btn = reference.button;
    const first = btn.charAt(0);
    const second = btn.charAt(1);
    return first === 'U' && ['1', '2', '3', '4'].includes(second);
  }

  const imageResponseContextValue = useMemo(
    () => [loading, setLoading],
    [loading, setLoading]
  );

  function handleValue(tags: string[]) {
    setAdvancedPrompt(tags);
  }

  function handleAdd(tag: string) {
    setSuggestions(() => {
      const find = promptAll.find(
        (d: { name: string; next: [] }) => d.name === tag
      );
      if ('next' in find) {
        return find.next;
      }
      return [];
    });
  }

  function handleRemove(tag: string) {
    setSuggestions(() => {
      const find = promptAll.find(
        (d: { name: string; prev: [] }) => d.name === tag
      );
      if ('prev' in find) {
        return find.prev;
      }
      return [];
    });
  }

  const fieldRef = React.useRef<HTMLInputElement>(null);

  function onClick() {
    fieldRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <Layout>
      <NavigationBar />
      <GetStarted onClick={() => onClick()} />
      <div
        className="field"
        ref={fieldRef}
        style={{
          paddingTop: '6rem',
        }}
      >
        <Container
          md
          style={{
            minHeight: '100vh',
          }}
        >
          {errorValidationModal && (
            <ErrorValidationModal
              modalOpen={errorValidationModal}
              modalClose={ErrorValidationToggleModal}
              message="parameters format cannot contain spaces."
            />
          )}
          {createGroupModal && (
            <CreateGroupModal
              modalOpen={createGroupModal}
              modalClose={CreateGroupToggleModal}
              creatorPrompt={prompt}
              creatorParams={paramsData}
              creatorImageUrl={cretorImageUrl}
            />
          )}
          <Grid.Container justify="center" gap={6}>
            <Grid xs={12} sm={6} direction="column" css={{ p: 0 }}>
              <Header1 content="Playground" />
              <Header2 content="Write your first GenAI prompt" />
              <Spacer x={1} />
              <Textarea
                style={{ padding: '2rem' }}
                width="100%"
                cacheMeasurements={false}
                label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
                placeholder="A raccoon that can speak and wield a sword"
                onChange={(e) => handleChangePrompt(e.target.value)}
                onBlur={(e) => handleBlurPrompt(e.target.value)}
                onFocus={() => setFinalPrompt('typing...')}
              />
              <Spacer x={1} />
              <FormSuggestion
                suggestions={suggestions}
                onValue={(data: string[]) => handleValue(data)}
                onRemove={(data: string) => handleRemove(data)}
                onAdd={(data: string) => handleAdd(data)}
              />
              <Spacer x={1} />
              <FileUpload
                seedImage={seedFileName}
                onUploadFinished={(fileName: string) =>
                  setSeedFileName(fileName)
                }
              />
              {socketId ? (
                <p>Status: Connected</p>
              ) : (
                <p>Status: Disconnected</p>
              )}
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
                css={{ zIndex: '0', float: 'right', maxWidth: '2rem' }}
              >
                {loading ? 'Loading' : 'Try sample'}
              </Button>
            </Grid>
            {!error && response && historyResponse && (
              <Grid xs={12} sm={6}>
                <Grid.Container justify="center" gap={2}>
                  <Collapse.Group borderWeight="bold">
                    <ImageResponseContext.Provider
                      value={imageResponseContextValue}
                    >
                      {historyResponse.map((val, index) => (
                        <Collapse
                          index={index}
                          /* TODO: please make the title collapse logic better, this is only solve issue with prompt history */
                          title={
                            !decodeReference(val.webhookSuccessResponse).button
                              ? `${val.prompt.slice(0, 50)}..`
                              : decodeReference(val.webhookSuccessResponse)
                                  .button
                          }
                          expanded={index + 1 === historyResponse.length}
                        >
                          <ImagineResponse
                            response={val.webhookSuccessResponse}
                          />
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'Center',
                              marginTop: '1rem',
                            }}
                          >
                            {isUpscale(
                              decodeReference(val.webhookSuccessResponse)
                            ) && (
                              <Button
                                type="button"
                                bordered
                                color="gradient"
                                auto
                                onPress={() =>
                                  setSeedFileName(
                                    val.webhookSuccessResponse.imageUrl
                                  )
                                }
                                css={{
                                  width: 'fit-content',
                                  margin: '0 .5rem',
                                }}
                              >
                                Use Image As Prompt
                              </Button>
                            )}
                            <Button
                              color="gradient"
                              onPress={() => {
                                setCreateGroupModal(true);
                                setCreatorImageurl(
                                  val.webhookSuccessResponse.imageUrl
                                );
                              }}
                              css={{
                                width: 'fit-content',
                                margin: '0 .5rem',
                              }}
                              disabled={loading}
                            >
                              Create Group
                            </Button>
                          </div>
                        </Collapse>
                      ))}
                    </ImageResponseContext.Provider>
                  </Collapse.Group>
                </Grid.Container>
              </Grid>
            )}
          </Grid.Container>
        </Container>
      </div>
    </Layout>
  );
}

export default Index;
