import React, { useEffect, useState } from 'react';
import { PromptAttributes } from '../db/models/prompt';

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

export interface NewChildrenPrompt {
  prompt: PromptAttributes;
}

// eslint-disable-next-line no-shadow
enum ImageOrientation {
  portrait,
  landscape,
  square,
}

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
  newChildrenPrompt?: NewChildrenPrompt;
}) {
  const {
    item,
    setOpenBottomSlideOver,
    setOpenModalPrompt,
    newChildrenPrompt,
  } = props;
  const [ref1Size, setRef1Size] = useState([0, 0]);
  const [ref2Size, setRef2Size] = useState([0, 0]);
  const [ref3ImageSize, setRef3ImageSize] = useState([0, 0]);
  const [imageOrientation, setImageOrientation] = useState(
    ImageOrientation.portrait
  );

  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLDivElement>(null); // ref2
  const ref3Image = React.useRef<HTMLImageElement>(null);

  const [allItem, setAllItem] = useState([]);
  const [current, setCurrent] = useState(item);

  useEffect(() => {
    setAllItem([item, ...item.SubPrompts]);
  }, [item]);

  useEffect(() => {
    if (item?.id === newChildrenPrompt?.prompt?.parentId) {
      setAllItem((prevItem) => [...prevItem, newChildrenPrompt.prompt]);
    }
  }, [newChildrenPrompt, item]);

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

    setRef2Size([ref1.current.clientWidth, ref1.current.clientHeight]);

    const inter2 = setInterval(() => {
      setRef2Size((prev) => {
        if (prev[0]) {
          clearInterval(inter2);
        }
        return [ref2.current.clientWidth, ref2.current.clientHeight];
      });
    }, 1000);

    setRef3ImageSize([
      ref3Image?.current?.clientWidth || 0,
      ref3Image?.current?.clientHeight || 0,
    ]);

    const inter3 = setInterval(() => {
      setRef3ImageSize((prev) => {
        if (prev[0]) {
          clearInterval(inter3);
        }
        return [ref3Image.current.clientWidth, ref3Image.current.clientHeight];
      });
    }, 1000);
  }, [ref1, ref2, ref3Image]);

  useEffect(() => {
    const getMeta = (url, cb) => {
      const img = new Image();
      img.onload = () => cb(null, img);
      img.onerror = (err) => cb(err);
      img.src = url;
    };

    getMeta(item.imageUrl, (err, img) => {
      if (img.naturalWidth > img.naturalHeight) {
        setImageOrientation(ImageOrientation.landscape);
      } else if (img.naturalWidth === img.naturalHeight) {
        setImageOrientation(ImageOrientation.square);
      } else {
        setImageOrientation(ImageOrientation.portrait);
      }
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

  const [windowSize, setWindowSize] = useState([null, null]);
  const [isWindowLandscape, setIsWindowLandscape] = useState(false);

  const getStyle = () => {
    const arr = [
      ref1Size[0],
      ref1Size[1],
      ref2Size[0],
      ref2Size[1],
      ref3ImageSize[0],
      ref3ImageSize[1],
      windowSize[0],
      windowSize[1],
    ].filter(Boolean);
    const minSize = Math.min(...arr);
    const heightSize = {
      height: ref1Size[1],
    };
    const widthSize = {
      width: ref1Size[0],
    };

    const whichSize = (input) => (input ? heightSize : widthSize);

    if (imageOrientation === ImageOrientation.square) {
      return {
        width: minSize,
      };
    }

    if (imageOrientation === ImageOrientation.portrait) {
      return whichSize(ref3ImageSize[0] < ref1Size[0]);
    }

    if (imageOrientation === ImageOrientation.landscape) {
      return whichSize(ref3ImageSize[0] > ref1Size[0]);
    }

    return heightSize;
  };

  useEffect(
    function mount() {
      function onResize() {
        setWindowSize([window.innerWidth, window.innerHeight]);
        setIsWindowLandscape(window.innerWidth > window.innerHeight);
      }

      onResize();

      window.addEventListener('resize', onResize);

      return function unMount() {
        window.removeEventListener('resize', onResize);
      };
    },
    [setWindowSize]
  );

  return (
    <div className="h-[calc(100vh-112px)] sm:h-[calc(100vh-136px)] relative">
      <div className="flex flex-col space-y-[32px] sm:space-y-0 sm:grid sm:gap-10 sm:grid-cols-12">
        <div className="sm:col-span-8" ref={ref1}>
          {/* ini perlu di ganti pake ukuran gambar */}
          {newChildrenPrompt?.prompt?.id}
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
            {allItem.map((myItem) => (
              <div
                className="snap-start flex items-center"
                key={myItem.id}
                data-id={myItem.id}
              >
                <div
                  className="flex items-center rounded-2xl justify-center"
                  style={getStyle()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {/* mencoba biin objec contain untuk mulitple gambar varian version ratio */}
                  <img
                    className="object-contain rounded-2xl mx-auto max-h-[calc(100vh)] max-w-[calc(100vw)] "
                    src={myItem.imageUrl}
                    alt={myItem.imageUrl}
                    ref={ref3Image}
                    style={getStyle()}
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

HorizontalSlider.defaultProps = {
  newChildrenPrompt: undefined,
};

export default HorizontalSlider;
