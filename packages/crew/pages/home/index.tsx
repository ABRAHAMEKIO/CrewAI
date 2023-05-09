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
    <Wrap>
      <div
        className="absolute inset-0 bg-center bg-cover blur-[35px] -z-10 transition-all"
        style={{
          backgroundImage: `url(${current.imageUrl})`,
        }}
      />
      <Nav className="z-10" />
      <Section className="container mx-auto sm:max-w-[64rem]  sm:px-[2rem] lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 pt-[1.5rem] sm:pt-10 relative h-[calc(100vh-72px)] sm:h-[calc(100vh-112px-40px)]">
          <div
            className="mx-auto grid sm:col-span-8 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(100vh-72px-228px)] sm:h-[calc(100vh-112px-40px)] snap-mandatory snap-y scroll-smooth"
            ref={scrollRef}
          >
            {dataset.map((item, index) => {
              return (
                <div
                  className="snap-start h-[calc(100vh-72px-228px)] sm:h-auto
                  flex items-center justify-center
                  sm:block
                  "
                  key={item.id}
                  data-id={item.id}
                  data-index={index}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-contain rounded-2xl
                    max-h-[calc(100vw-32px-32px)] max-w-[calc(100vw-32px-32px)]
                    sm:max-h-full sm:max-w-full
                    sm:h-auto sm:w-auto"
                    src={item.imageUrl}
                    alt={item.imageUrl}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 sm:relative grid sm:col-span-4 place-content-start rounded-t-2xl sm:rounded-2xl bg-white place-self-end sm:place-self-start">
            <div className="space-y-2 p-6">
              <h1 className="font-bold text-xl text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                {current.objectName}
              </h1>
              <div className="flex space-x-2 ">
                <div className="rounded-full bg-gradient h-5 w-5" />
                <p className="font-normal text-sm text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                  {current.creatorAddress}
                </p>
              </div>
            </div>
            <span className="border-b mx-6" />
            <div className="space-y-6 p-6 pt-0">
              <div>
                <h1 className="font-bold text-base pt-4 pb-3">Prompt</h1>
                <div className="bg-[#F7F7FA] px-6 py-4 rounded-lg">
                  <p className="text-base font-normal">{current.prompt}</p>
                </div>
              </div>
              {[
                {
                  name: `Generate (${current.showPromptFee})`,
                  bgDark: true,
                },
                {
                  name: `Mint (${current.mintFee})`,
                  bgDark: false,
                },
              ].map((item) => {
                return (
                  <button
                    type="button"
                    key={item.name}
                    className={classNames(
                      item.bgDark
                        ? '!bg-black'
                        : 'bg-[linear-gradient(224.03deg,#211093_-1.74%,#A323A3_47.01%,#FFA01B_100%)]',
                      'border rounded-lg w-full text-base font-bold min-h-[3rem] sm:h-12 min-w-[117px] text-white'
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
      <div />
    </Wrap>
  );
}

export default Index;
