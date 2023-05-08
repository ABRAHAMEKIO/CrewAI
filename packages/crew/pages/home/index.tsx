import React from 'react';
import { Disclosure } from '@headlessui/react';
import Wrap from '../../components/Wrap';
import Nav from '../../components/Nav';
import Section from '../../components/Section';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Index() {
  const images = [
    'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260974037_FvER45aacAAN7qL.jpeg',
    'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260974037_FvER45aacAAN7qL.jpeg',
    'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260974037_FvER45aacAAN7qL.jpeg',
  ];
  return (
    <Wrap>
      <Nav />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 mt-[1.5rem] sm:mt-10 relative h-[calc(100vh-72px-24px)] sm:h-[calc(100vh-112px-40px)]">
          <div className="grid sm:col-span-8 space-y-10 overflow-y-scroll h-[calc(50vh-72px-24px)] sm:h-[calc(100vh-112px-40px)]">
            {images.map((image) => {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="object-cover rounded-2xl h-[calc(100vw-32px-32px)] w-[calc(100vw-32px-32px)] sm:h-auto sm:w-auto"
                  src={image}
                  alt={image}
                />
              );
            })}
          </div>
          <div className="absolute bottom-0 sm:relative grid sm:col-span-4 place-content-start rounded-t-2xl sm:rounded-2xl bg-white p-6 place-self-end sm:place-self-start">
            <div className="space-y-2">
              <h1 className="font-bold text-xl">Fire Ligh John</h1>
              <div className="flex space-x-2 pb-6">
                <div className="rounded-full bg-gradient h-5 w-5" />
                <p className="font-normal text-sm">vello</p>
              </div>
            </div>
            <span className="border-b" />
            <h1 className="font-bold text-base pt-4 pb-3">Prompt</h1>
            <div className="space-y-6">
              <div className="bg-[#F7F7FA] px-6 py-4 rounded-lg">
                <p className="text-base font-normal">
                  inside a girl room, cyberpunk vibe, neon glowing lights, sharp
                  focus, photorealistic, unreal engine 5, girl in the
                </p>
              </div>
              {[
                {
                  name: 'Generate ($0.01 xDai)',
                  bgDark: true,
                },
                {
                  name: 'Mint ($0.10 xDai)',
                  bgDark: false,
                },
              ].map((item) => {
                return (
                  <button
                    type="button"
                    key="connect-wallet"
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
