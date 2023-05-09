import React, { useEffect, useState } from 'react';
import Wrap from '../../components/Wrap';
import Nav from '../../components/Nav';
import Section from '../../components/Section';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Index() {
  const items = [
    {
      id: 1,
      title: 'Fire Light John Crew Ai 1',
      owner: 'Crew Ai 1',
      generatePrice: '$0.01 xDai',
      mintPrice: '$0.10 xDai',
      prompt:
        'Crew Ai 1 inside a girl room, cyberpunk vibe, neon glowing lights, sharp focus, photorealistic, unreal engine 5, girl in the',
      imageUrl:
        'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683599960407_tdraw-girl.webp',
    },
    {
      id: 2,
      title: 'Fire Light John Crew Ai 2',
      owner: 'Crew Ai 2',
      generatePrice: '$0.02 xDai',
      mintPrice: '$0.20 xDai',
      prompt:
        'Crew Ai 2 inside a girl room, cyberpunk vibe, neon glowing lights, sharp focus, photorealistic, unreal engine 5, girl in the',
      imageUrl:
        'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683600162587_DavidmWilliasdms123_john_mayer_fire_light_1cfb2f37-edb5-427b-8338-bd881e3c9a16.png',
    },
    {
      id: 3,
      title: 'Fire Light John Crew Ai 3',
      owner: 'Crew Ai 3',
      generatePrice: '$0.03 xDai',
      mintPrice: '$0.30 xDai',
      prompt:
        'Crew Ai 3 inside a girl room, cyberpunk vibe, neon glowing lights, sharp focus, photorealistic, unreal engine 5, girl in the',
      imageUrl:
        'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260974037_FvER45aacAAN7qL.jpeg',
    },
  ];

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [dataset] = useState(items);
  const [current, setCurrent] = useState(items[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const item = dataset.find((i) => i.id === parseInt(id, 10));
            setCurrent(item);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    scrollRef.current.querySelectorAll('.snap-start').forEach((snap) => {
      observer.observe(snap);
    });
  }, [dataset]);

  return (
    <Wrap>
      <div
        className="absolute inset-0 bg-center bg-cover blur-[35px] -z-10 transition-all"
        style={{
          backgroundImage: `url(${current.imageUrl})`,
        }}
      />
      <Nav className="bg-white border-b z-10" />
      <Section className="container mx-auto sm:max-w-[64rem]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 pt-[1.5rem] sm:pt-10 relative h-[calc(100vh-72px)] sm:h-[calc(100vh-112px)]">
          <div
            className="mx-auto grid sm:col-span-8 space-y-10 overflow-y-scroll scrollbar-hide h-[calc(50vh-72px)] sm:h-[calc(100vh-112px)] snap-mandatory snap-y scroll-smooth"
            ref={scrollRef}
          >
            {dataset.map((item) => {
              return (
                <div className="snap-start" key={item.id} data-id={item.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-cover rounded-2xl h-[calc(100vw-32px-32px)] w-[calc(100vw-32px-32px)] sm:h-auto sm:w-auto"
                    src={item.imageUrl}
                    alt={item.imageUrl}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 sm:relative grid sm:col-span-4 place-content-start rounded-t-2xl sm:rounded-2xl bg-white place-self-end sm:place-self-start">
            <div className="space-y-2 p-6">
              <h1 className="font-bold text-xl">{current.title}</h1>
              <div className="flex space-x-2">
                <div className="rounded-full bg-gradient h-5 w-5" />
                <p className="font-normal text-sm">{current.owner}</p>
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
                  name: `Generate (${current.generatePrice})`,
                  bgDark: true,
                },
                {
                  name: `Mint (${current.mintPrice})`,
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
