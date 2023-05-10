import React, { useEffect, useState } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';
import io from 'socket.io-client';
import Wrap from '../../components/Wrap';
import Nav from '../../components/Nav';
import Section from '../../components/Section';
import { PromptAttributes } from '../../db/models/prompt';

import PromptClient, {
  PaginationSuccessResponse,
  ErrorResponse,
} from '../../domain/prompt/promptClient';
import BottomSlideOver from '../../components/BottomSlideOver';
import ModalPrompt from '../../components/ModalPrompt';

import { server, wsServer } from '../../config';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../../domain/midjourney/midjourneyClient';
import { successBeep, errorBeep } from '../../domain/sounds/beep';
import MidjourneyCommand from '../../domain/midjourney/wsCommands';
import { storagePromptHistory, PromptHistory } from '../../helpers/storage';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

let socket;

function Index() {
  const mixpanel = useMixpanel();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [dataPrompt, setDataPrompt] = useState({
    rows: [],
    page: 0,
  });
  const [current, setCurrent] = useState<PromptAttributes>({});
  const [openBottomSlideOver, setOpenBottomSlideOver] = useState(false);
  const [openModalPrompt, setOpenModalPrompt] = useState(false);

  const midjourneyClient = new MidjourneyClient('', `${server}/api/thenextleg`);
  const [socketId, setSocketId] = useState(null);
  const [historyResponse, setHistoryResponse] = useState<PromptHistory[]>([]);
  const [response, setResponse] = useState(null as WebhookSuccessResponse);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event, valueButton): Promise<void> {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      const { command } = valueButton;
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('image_generation_requested', {
        command,
      });
    }

    const imagineResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.imagine(
        valueButton.command,
        `${socketId};${valueButton.parentId}`,
        ''
      );
    if ('isNaughty' in imagineResponse && imagineResponse.isNaughty) {
      console.log(`there (are) prohibited phrase(s) ${imagineResponse.phrase}`);
      await errorBeep();
    }
  }

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
              setResponse(val);
              historyResponse.push({
                webhookSuccessResponse: val,
                prompt: val.content,
              });
              setHistoryResponse(historyResponse);
              storagePromptHistory.save(historyResponse);
              successBeep();
            } else {
              console.log(val.content);
              errorBeep();
            }
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

  useEffect(() => {
    const histories = storagePromptHistory.all();
    if (histories) {
      setHistoryResponse(histories);
    }
  }, []);

  useEffect(() => {
    const promptClient1 = new PromptClient();
    // fetch data
    const dataFetch = async () => {
      const promptPaginationResponse:
        | PaginationSuccessResponse
        | ErrorResponse = await promptClient1.pagination({ page: 0 });

      if (
        'error' in promptPaginationResponse &&
        promptPaginationResponse.error
      ) {
        // setError(true);
        // setErrorMessage(promptPaginationResponse.error);
        // setLoading(false);
      } else {
        // setLoading(true);
      }
      if (
        'prompt' in promptPaginationResponse &&
        promptPaginationResponse.prompt
      ) {
        setDataPrompt(() => ({
          rows: promptPaginationResponse.prompt.rows,
          page: 0,
        }));
        setCurrent(promptPaginationResponse.prompt.rows[0]);
      }
    };

    dataFetch().then((r) => r);
  }, []);

  useEffect(() => {
    const promptClient2 = new PromptClient();
    const limit = 20;
    const dataFetch = async (page: number) => {
      const promptPaginationResponse:
        | PaginationSuccessResponse
        | ErrorResponse = await promptClient2.pagination({
        page,
      });

      if (
        'error' in promptPaginationResponse &&
        promptPaginationResponse.error
      ) {
        // setError(true);
        // setErrorMessage(promptPaginationResponse.error);
        // setLoading(false);
      } else {
        // setLoading(true);
      }
      if (
        'prompt' in promptPaginationResponse &&
        promptPaginationResponse.prompt
      ) {
        setDataPrompt((prev) => ({
          rows: [
            ...new Map(
              [...prev.rows, ...promptPaginationResponse.prompt.rows].map(
                (item) => [item.id, item]
              )
            ).values(),
          ],
          page: promptPaginationResponse.page,
        }));
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const dataIndex = entry.target.getAttribute('data-index');

            const item = dataPrompt.rows.find((i) => i.id.toString() === id);
            if (item) {
              setCurrent(item);
            }
            const len = dataPrompt.rows.length;
            if (len - parseInt(dataIndex, 10) === 5) {
              const page = Math.ceil(len / limit);
              if (page > dataPrompt.page) {
                dataFetch(page).then(() => true);
              }
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    scrollRef.current.querySelectorAll('.snap-start').forEach((snap) => {
      observer.observe(snap);
    });
  }, [dataPrompt.page, dataPrompt.rows]);

  return (
    <Wrap className="mx-auto relative">
      <div
        className="absolute inset-0 bg-center bg-cover blur-[35px] scale-100 -z-10 transition-all"
        style={{
          backgroundImage: `url(${current.imageUrl})`,
        }}
      />
      <Nav className="z-10 absolute mt-4 sm:mt-0 inset-x-0 bg-none" />
      <Section className="container mx-auto sm:max-w-[64rem] sm:px-[2rem] xl:px-0">
        <div className="h-[calc(100vh)] sm:h-[calc(100vh)] relative">
          <div
            className="mx-auto space-y-10 px-6 sm:px-0 overflow-y-scroll scrollbar-hide h-[calc(100vh)] snap-mandatory snap-y scroll-smooth gap-y-[112px]"
            ref={scrollRef}
          >
            {dataPrompt.rows.map((item, index) => {
              return (
                <div
                  className="snap-start pt-[112px] sm:pt-[136px]"
                  key={item.id}
                  data-id={item.id}
                  data-index={index}
                >
                  <div className="h-[calc(100vh-112px)] sm:h-[calc(100vh-136px)] flex flex-col space-y-[32px] sm:space-y-0 sm:grid sm:gap-10 sm:grid-cols-12">
                    <div className="flex items-center justify-center h-[calc(100vh-112px-226px)] sm:h-[calc(100vh-136px-40px)] sm:col-span-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="object-contain rounded-2xl max-h-[calc(100vh-112px-226px)] max-w-[calc(100vw-24px-24px)] sm:max-h-full sm:max-w-full mx-auto"
                        src={item.imageUrl}
                        alt={item.imageUrl}
                      />
                    </div>
                    <div className="max-h-[calc(226px)] sm:max-h-full w-full text-white sm:col-span-4 sm:place-self-center">
                      <div className="space-y-1 sm:space-y-2">
                        <h1 className="text-base font-bold sm:text-xl text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                          {item.objectName}
                        </h1>
                        <div className="flex space-x-2">
                          <div className="rounded-full bg-gradient h-[14px] w-[14px] sm:h-5 sm:w-5" />
                          <p className="font-normal text-xs sm:text-sm text-ellipsis overflow-hidden max-w-[12rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                            {item.creatorAddress}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => setOpenBottomSlideOver(true)}
                          type="button"
                          className="block sm:hidden"
                        >
                          <p className="[@media(min-width:280px)]:text-[10px] [@media(min-width:389px)]:text-sm sm:text-base font-normal text-left">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            {item.prompt.length > 70
                              ? `${item.prompt.slice(0, 70)}...`
                              : item.prompt}{' '}
                            <span className="font-bold">Edit Prompt</span>
                          </p>
                        </button>
                        <button
                          onClick={() => setOpenModalPrompt(true)}
                          type="button"
                          className="hidden sm:block sm:mt-4"
                        >
                          <p className="text-base font-normal text-left">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            {item.prompt.length > 70
                              ? `${item.prompt.slice(0, 70)}...`
                              : item.prompt}{' '}
                            <span className="font-bold">Edit Prompt</span>
                          </p>
                        </button>
                      </div>
                      <div className="mt-4 sm:mt-6">
                        {[
                          {
                            name: 'Generate Now',
                            bgDark: false,
                          },
                        ].map((it) => {
                          return (
                            <button
                              type="button"
                              key={it.name}
                              onClick={(e) =>
                                handleSubmit(e, {
                                  command: item.prompt,
                                  parentId: item.id,
                                })
                              }
                              className={classNames(
                                it.bgDark
                                  ? '!bg-black'
                                  : 'bg-[linear-gradient(224.03deg,#211093_-1.74%,#A323A3_47.01%,#FFA01B_100%)]',
                                'rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px] text-white'
                              )}
                            >
                              {it.name}
                            </button>
                          );
                        })}
                      </div>
                      <div className="border-b-4 rounded w-20 mx-auto opacity-50 sm:hidden mt-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <BottomSlideOver
        prompt={current.prompt}
        modalOpen={openBottomSlideOver}
        modalClose={() => setOpenBottomSlideOver(false)}
      />
      <div />

      <ModalPrompt
        prompt={current.prompt}
        modalOpen={openModalPrompt}
        modalClose={() => setOpenModalPrompt(false)}
      />
      <div />
    </Wrap>
  );
}

export default Index;
