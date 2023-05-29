import React, { useCallback, useEffect, useState } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';
import LoadingContext from '../../context/loading-context';
import Wrap from '../../components/v1/Wrap';
import Nav from '../../components/v1/Nav';
import Section from '../../components/v1/Section';
import { PromptAttributes } from '../../db/models/prompt';
import PromptContext from '../../context/prompt-context';

import PromptClient, {
  PaginationSuccessResponse,
  ErrorResponse,
} from '../../domain/prompt/promptClient';
import BottomSlideOver from '../../components/v1/BottomSlideOver';
import ModalPrompt from '../../components/v1/ModalPrompt';
import HorizontalSlider from '../../components/v1/HorizontalSlider';

const promptClient = new PromptClient();

function Index({ socketId }: { socketId: string }) {
  const mixpanel = useMixpanel();
  const [randomNumber] = useState(Math.floor(Math.random() * 25));
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [dataPrompt, setDataPrompt] = useState({
    rows: [],
    page: randomNumber,
  });
  const [current, setCurrent] = useState<PromptAttributes>({});
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [modalData, setModalData] = useState<PromptAttributes>({});
  const [openBottomSlideOver, setOpenBottomSlideOver] = useState(false);
  const [openModalPrompt, setOpenModalPrompt] = useState(false);

  useEffect(() => {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('home_page_view');
    }
  });

  const limit = 20;
  const dataFetch = useCallback(
    async (page: number) => {
      const params = new URLSearchParams(window.location.search);
      let v = null;
      if (params.has('v')) {
        v = params.get('v');
      }
      const promptPaginationResponse:
        | PaginationSuccessResponse
        | ErrorResponse = await promptClient.pagination({
        page,
        v,
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
          // @TODO butuh solusi lain mungkin tanpa useEffect atau pake solusi yang lebih tepat sehingga tanpa perlu unique function
          // unique function:
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
    },
    [setDataPrompt]
  );

  useEffect(() => {
    dataFetch(randomNumber).then(() => true);
  }, [dataFetch, randomNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const dataIndex = entry.target.getAttribute('data-index');

            const item = dataPrompt.rows.find((i) => i.id.toString() === id);
            if (item) {
              setCurrent(item);
              setBackgroundImageUrl(item.imageUrl);
            }
            const len = dataPrompt.rows.length;
            if (len - parseInt(dataIndex, 10) === 5) {
              const rows = Math.ceil(len / limit);
              const page = randomNumber + rows;
              if (page > dataPrompt.page) {
                dataFetch(page).then(() => true);
              }
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    scrollRef.current.querySelectorAll('.snap-start').forEach((snap) => {
      observer.observe(snap);
    });
  }, [dataFetch, dataPrompt.page, dataPrompt.rows, randomNumber]);

  return (
    <LoadingContext.Consumer>
      {({ loading, setLoading }) => (
        <Wrap className="mx-auto relative">
          <>
            <div
              className="absolute inset-0 bg-center bg-cover -z-20 transition-all transition-opacity"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
              }}
            />
            <div className="absolute inset-0 -z-10 backdrop-blur-[35px]" />
          </>
          <Nav className="z-10 absolute mt-4 sm:mt-0 inset-x-0 bg-none" />
          <Section className="container mx-auto sm:max-w-[64rem] sm:px-[2rem] xl:px-0">
            <PromptContext.Consumer>
              {(newPrompt) => (
                <div className="h-[calc(100vh)] sm:h-[calc(100vh)] relative">
                  <div
                    className="mx-auto space-y-10 px-6 sm:px-0 overflow-y-scroll scrollbar-hide h-[calc(100vh)] snap-mandatory snap-y scroll-smooth gap-y-[112px] overflow-x-hidden"
                    ref={scrollRef}
                  >
                    {dataPrompt.rows.map((item, index) => {
                      return (
                        <div
                          id={item.id}
                          className="snap-start pt-[112px] sm:pt-[136px]"
                          key={item.id}
                          data-id={item.id}
                          data-index={index}
                        >
                          <HorizontalSlider
                            loading={loading}
                            setLoading={setLoading}
                            socketId={socketId}
                            newPrompt={newPrompt}
                            item={item}
                            setOpenBottomSlideOver={(prompt, bool) => {
                              setModalData(prompt);
                              setOpenBottomSlideOver(bool);
                            }}
                            setOpenModalPrompt={(prompt, bool) => {
                              setModalData(prompt);
                              setOpenModalPrompt(bool);
                            }}
                            setBackgroundImageUrl={setBackgroundImageUrl}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PromptContext.Consumer>
          </Section>

          <BottomSlideOver
            loading={loading}
            setLoading={setLoading}
            parentId={current.id}
            socketId={socketId}
            prompt={modalData}
            modalOpen={openBottomSlideOver}
            modalClose={() => setOpenBottomSlideOver(false)}
          />

          <ModalPrompt
            loading={loading}
            setLoading={setLoading}
            parentId={current.id}
            socketId={socketId}
            prompt={modalData}
            modalOpen={openModalPrompt}
            modalClose={() => setOpenModalPrompt(false)}
          />
        </Wrap>
      )}
    </LoadingContext.Consumer>
  );
}

export default Index;
