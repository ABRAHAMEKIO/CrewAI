import React, { useEffect, useState } from 'react';
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
import HorizontalSlider from '../../components/HorizontalSlider';

function Index() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [dataPrompt, setDataPrompt] = useState({
    rows: [],
    page: 0,
  });
  const [current, setCurrent] = useState<PromptAttributes>({});
  const [openBottomSlideOver, setOpenBottomSlideOver] = useState(false);
  const [openModalPrompt, setOpenModalPrompt] = useState(false);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

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
      <>
        <div
          className="absolute inset-0 bg-center bg-cover -z-20 transition-all transition-opacity -bottom-1"
          style={{
            backgroundImage: `url(${current.imageUrl})`,
          }}
        />
        <div className="absolute inset-0 -z-10 backdrop-blur-[35px]" />
      </>
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
                  <HorizontalSlider
                    item={item}
                    setOpenBottomSlideOver={setOpenBottomSlideOver}
                    setOpenModalPrompt={setOpenModalPrompt}
                  />
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
