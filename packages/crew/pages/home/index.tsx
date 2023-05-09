import React, { useEffect, useMemo, useState } from 'react';
import Wrap from '../../components/Wrap';
import Nav from '../../components/Nav';
import Section from '../../components/Section';
import { PromptAttributes } from '../../db/models/prompt';

import PromptClient, {
  PaginationSuccessResponse,
  ErrorResponse,
} from '../../domain/prompt/promptClient';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Index() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [dataset, setDataset] = useState<PromptAttributes[]>([]);
  const [current, setCurrent] = useState<PromptAttributes>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const promptClient = useMemo(() => new PromptClient(), []);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const promptPaginationResponse:
        | PaginationSuccessResponse
        | ErrorResponse = await promptClient.pagination({ page: 0 });

      if (
        'error' in promptPaginationResponse &&
        promptPaginationResponse.error
      ) {
        setError(true);
        setErrorMessage(promptPaginationResponse.error);
        setLoading(false);
      } else {
        setLoading(true);
      }
      if (
        'prompt' in promptPaginationResponse &&
        promptPaginationResponse.prompt
      ) {
        setDataset(promptPaginationResponse.prompt.rows);
        setCurrent(promptPaginationResponse.prompt.rows[0]);
      }
    };

    dataFetch().then((r) => r);
  }, [promptClient]);

  useEffect(() => {
    const dataFetch = async (index: string) => {
      const limit = 20;
      if (dataset.length - parseInt(index, 10) === 5) {
        const promptPaginationResponse:
          | PaginationSuccessResponse
          | ErrorResponse = await promptClient.pagination({
          page: dataset.length / limit,
        });

        if (
          'error' in promptPaginationResponse &&
          promptPaginationResponse.error
        ) {
          setError(true);
          setErrorMessage(promptPaginationResponse.error);
          setLoading(false);
        } else {
          setLoading(true);
        }
        if (
          'prompt' in promptPaginationResponse &&
          promptPaginationResponse.prompt
        ) {
          setDataset((prevDataset) => [
            ...prevDataset,
            ...promptPaginationResponse.prompt.rows,
          ]);
        }
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const dataIndex = entry.target.getAttribute('data-index');

            dataFetch(dataIndex).then(() => true);

            const item = dataset.find((i) => i.id.toString() === id);
            if (item) {
              setCurrent(item);
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
  }, [dataset, promptClient]);

  return (
    <Wrap className="mx-auto relative">
      <div
        className="absolute inset-0 bg-center bg-cover blur-[35px] -z-10 transition-all"
        style={{
          backgroundImage: `url(${current.imageUrl})`,
        }}
      />
      <Nav className="z-10 absolute mt-4 sm:mt-0 inset-x-0 sm:relative bg-none" />
      <Section className="container mx-auto sm:max-w-[64rem] sm:px-[2rem] lg:px-0">
        <div className="sm:grid sm:grid-cols-12 gap-10 sm:pt-10 relative h-[calc(100vh)] sm:h-[calc(100vh)]">
          <div
            className="mx-auto grid sm:col-span-8 space-y-10 px-6 sm:px-0 overflow-y-scroll scrollbar-hide h-[calc(100vh)] sm:h-[calc(100vh-112px-40px)]
            snap-mandatory snap-y scroll-smooth
            gap-y-[112px]
            "
            ref={scrollRef}
          >
            {dataset.map((item, index) => {
              return (
                <div
                  className="snap-start h-[calc(100vh)] sm:h-auto
                  pt-[112px]
                  "
                  key={item.id}
                  data-id={item.id}
                  data-index={index}
                >
                  <div className="h-[calc(100vh-112px)] flex flex-col space-y-[32px]">
                    <div className="flex items-center justify-center sm:block h-[calc(100vh-112px-226px)] ">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="object-contain rounded-2xl
                        max-h-[calc(100vh-112px-226px)] max-w-[calc(100vw-24px-24px)]
                        sm:max-h-full sm:max-w-full
                        sm:h-auto sm:w-auto"
                        src={item.imageUrl}
                        alt={item.imageUrl}
                      />
                    </div>
                    <div className="max-h-[calc(226px)] w-full sm:relative sm:grid sm:col-span-4 place-content-start sm:rounded-2xl text-white place-self-end sm:place-self-start">
                      <div className="space-y-4">
                        <div className="space-y-[4px]">
                          <h1 className="text-base font-bold sm:text-xl text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                            {item.objectName}
                          </h1>
                          <div className="flex space-x-2 ">
                            <div className="rounded-full bg-gradient h-[14px] w-[14px]" />
                            <p className="font-normal text-xs sm:text-sm text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                              {item.creatorAddress}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-normal relative">
                          <p>
                            {item.prompt.length > 80
                              ? `${item.prompt.slice(0, 80)}...`
                              : item.prompt}
                            <span className="font-bold"> Edit Prompt</span>
                          </p>
                        </div>
                        {[
                          {
                            name: `Generate ($${item.showPromptFee} xDai)`,
                            bgDark: false,
                          },
                        ].map((it) => {
                          return (
                            <button
                              type="button"
                              key={it.name}
                              className={classNames(
                                it.bgDark
                                  ? '!bg-black'
                                  : 'bg-[linear-gradient(224.03deg,#211093_-1.74%,#A323A3_47.01%,#FFA01B_100%)]',
                                'rounded-lg w-full text-base font-bold min-h-[48px] sm:h-12 min-w-[117px] text-white'
                              )}
                            >
                              {it.name}
                            </button>
                          );
                        })}
                        <div className="border-b-4 rounded w-20 mx-auto opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
      <div />
    </Wrap>
  );
}

export default Index;
