import React, { MutableRefObject, useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface ItemInterface {
  id: number;
  imageUrl: string;
  objectName: string;
  creatorAddress: string;
  prompt: string;
}

function Item({
  item,
  refId,
  maxImageSize,
}: {
  item: {
    imageUrl: string;
    id: number;
  };
  refId?: MutableRefObject<HTMLImageElement>;
  maxImageSize: number;
}) {
  return (
    // <div
    //   className="flex items-center justify-center h-[calc(100vh-112px-226px)] sm:h-[calc(100vh-136px-40px)] sm:col-span-8">
    //   <img
    //     className="object-contain rounded-2xl max-h-[calc(100vh-112px-226px)] max-w-[calc(100vw-24px-24px)] sm:max-h-full sm:max-w-full mx-auto"
    //     src="https://cdn.discordapp.com/attachments/1102867395204370464/1105228754642534511/DavidmWilliams123_An_alien_planet_landscape_with_strange_plants_9435ba4a-162d-4d47-a2c0-e93edce46f2c.png"
    // </div>
    <div className="snap-start" key={item.id} data-id={item.id}>
      <div className="flex items-center justify-center h-[calc(100vh-112px-226px)] sm:h-[calc(100vh-136px-40px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="object-contain rounded-2xl mx-auto max-h-[calc(100vh-112px-226px)] max-w-[calc(100vw-24px-24px)] "
          // style={{
          //   maxWidth: maxImageSize,
          // }}
          src={item.imageUrl}
          alt={item.imageUrl}
          ref={refId}
        />
      </div>
    </div>
  );
}

Item.defaultProps = {
  refId: null,
};

function HorizontalSlider(props: {
  item: {
    id: number;
    imageUrl: string;
    objectName: string;
    creatorAddress: string;
    prompt: string;
    SubPrompts: ItemInterface[];
  };
  setOpenBottomSlideOver: (bool: boolean) => void;
  setOpenModalPrompt: (bool: boolean) => void;
}) {
  const { item, setOpenBottomSlideOver, setOpenModalPrompt } = props;
  const [ref1Size, setRef1Size] = useState([0, 0]);
  const [ref3ImageSize, setRef3ImageSize] = useState([0, 0]);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isLandscapeRef1, setIsLandscapeRef1] = useState(false);

  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLDivElement>(null); // ref2
  const ref3Image = React.useRef<HTMLImageElement>(null);

  const [allItem, setAllItem] = useState([]);
  const [current, setCurrent] = useState(item);

  useEffect(() => {
    setAllItem([item, ...item.SubPrompts]);
  }, [item]);

  // handle horizontal slider
  useEffect(() => {
    setRef1Size([ref1.current.clientWidth, ref1.current.clientHeight]);

    const inter = setInterval(() => {
      setRef1Size((prev) => {
        if (prev[0]) {
          clearInterval(inter);
        }
        return [ref1.current.clientWidth, ref1.current.clientHeight];
      });
    }, 1000);

    setRef3ImageSize([
      ref3Image?.current?.clientWidth || 0,
      ref3Image?.current?.clientHeight || 0,
    ]);

    const inter2 = setInterval(() => {
      setRef3ImageSize((prev) => {
        if (prev[0]) {
          clearInterval(inter2);
        }
        return [ref3Image.current.clientWidth, ref3Image.current.clientHeight];
      });
    }, 1000);

    setIsLandscapeRef1(ref1.current.clientWidth >= ref1.current.clientHeight);
  }, [ref1, ref3Image]);

  useEffect(() => {
    const getMeta = (url, cb) => {
      const img = new Image();
      img.onload = () => cb(null, img);
      img.onerror = (err) => cb(err);
      img.src = url;
    };

    getMeta(item.imageUrl, (err, img) => {
      setIsLandscape(img.naturalWidth >= img.naturalHeight);
    });
  }, [item]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');

            const x = allItem.find((i) => i.id.toString() === id);
            if (x) {
              setCurrent(x);
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    ref2.current.querySelectorAll('.snap-start').forEach((snap) => {
      observer.observe(snap);
    });
  }, [allItem]);

  return (
    <div className="h-[calc(100vh-112px)] sm:h-[calc(100vh-136px)] relative">
      <div className="flex flex-col space-y-[32px] sm:space-y-0 sm:grid sm:gap-10 sm:grid-cols-12">
        <div className="sm:col-span-8" ref={ref1}>
          {/* ini perlu di ganti pake ukuran gambar */}
          <div
            className="snap-x snap-mandatory overflow-x-scroll scrollbar-hide gap-x-6 rounded-2xl mx-auto transition-all
            h-[calc(100vh-112px-226px)] sm:h-[calc(100vh-156px)]
            flex
            "
            ref={ref2}
            style={{
              width: ref3ImageSize[0],
            }}
          >
            {allItem.map((myItem, index) => (
              <div
                className="snap-start flex items-center"
                key={myItem.id}
                data-id={myItem.id}
              >
                <div
                  className="flex items-center rounded-2xl justify-center"
                  style={{
                    width: ref3ImageSize[0],
                    height: ref3ImageSize[1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-contain rounded-2xl mx-auto max-h-[calc(100vh)] max-w-[calc(100vw)] "
                    src={myItem.imageUrl}
                    alt={myItem.imageUrl}
                    ref={ref3Image}
                    style={
                      // eslint-disable-next-line no-nested-ternary
                      isLandscape
                        ? isLandscapeRef1
                          ? {
                              height: ref1Size[1],
                            }
                          : {
                              width: ref1Size[0],
                            }
                        : {
                            height: ref1Size[1],
                          }
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-h-[calc(226px)] sm:max-h-full w-full text-white sm:col-span-4 sm:place-self-center">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-base font-bold sm:text-xl text-ellipsis overflow-hidden max-w-[16rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
              {current.objectName}
            </h1>
            <div className="flex space-x-2">
              <div className="rounded-full bg-gradient h-[14px] w-[14px] sm:h-5 sm:w-5" />
              <p className="font-normal text-xs sm:text-sm text-ellipsis overflow-hidden max-w-[12rem] sm:max-w-[4rem] md:max-w-[8rem] lg:max-w-[12rem]">
                {current.creatorAddress}
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
                {current.prompt.length > 70
                  ? `${current.prompt.slice(0, 70)}...`
                  : current.prompt}{' '}
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
                {current.prompt.length > 70
                  ? `${current.prompt.slice(0, 70)}...`
                  : current.prompt}{' '}
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
}

export default HorizontalSlider;

// <div className="sm:hidden flex flex-col space-y-[32px] sm:space-y-0 sm:grid sm:gap-10 sm:grid-cols-12">
//   <div className="sm:col-span-8 ">
//     <div className="w-80 relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14">
//       <div className="snap-start shrink-0">
//         <img
//           className="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white"
//           src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80"
//           alt="hell"
//         />
//       </div>
//       <div className="snap-start shrink-0">
//         <img
//           className="shrink-0 w-80 h-40 rounded-lg shadow-xl bg-white"
//           src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80"
//           alt="hello"
//         />
//       </div>
//     </div>
//   </div>
// </div>
