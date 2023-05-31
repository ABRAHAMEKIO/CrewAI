import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PromptAttributes } from '../../db/models/prompt';
import { CreditIcon, ShareButtonIcon, WarningIcon } from '../v1/Icons';
import PromptClient from '../../domain/prompt/promptClient';
import NavNewPromptContext from '../../context/nav-new-prompt-context';
import { server, creditFee } from '../../config';
import ShareModal from '../v1/ShareModal';
import ShareSlideOver from '../v1/ShareSlideOver';
import { classNames } from '../../helpers/component';
import SignInModal from './SignInModal';
import SignInSlideOver from './SignInSlideOver';
import ErrorModalContext from '../../context/error-modal-context';

// eslint-disable-next-line no-shadow
enum ImageOrientation {
  portrait,
  landscape,
  square,
}

function HorizontalSlider({
  loading,
  setLoading,
  item,
  setOpenBottomSlideOver,
  setOpenModalPrompt,
  newPrompt,
  socketId,
  setBackgroundImageUrl,
}: {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  item: PromptAttributes;
  setOpenBottomSlideOver: (prompt: PromptAttributes, bool: boolean) => void;
  setOpenModalPrompt: (prompt: PromptAttributes, bool: boolean) => void;
  newPrompt?: PromptAttributes;
  socketId: string;
  setBackgroundImageUrl: (imageUrl: string) => void;
}) {
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
  const [current, setCurrent] = useState<PromptAttributes>(item);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlide, setTotalSlide] = useState(1);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openShareSlideOver, setOpenShareSlideOver] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [windowSize, setWindowSize] = useState([null, null]);
  const [showSignInSlideOver, setShowSignInSlideOver] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { setIndicatorNewPromptDisplay } = useContext(NavNewPromptContext);
  const { setModalOpen, setTitle, setMessage, setIcon } =
    useContext(ErrorModalContext);

  const { status } = useSession();

  const navNewPromptContext = useContext(NavNewPromptContext);

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

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    // eslint-disable-next-line no-console
    const promptClient = new PromptClient();
    const response = await promptClient.generateV2({
      promptId: item.id,
      msg: current.prompt,
      socketId,
    });

    if ('isNaughty' in response && response.isNaughty) {
      setLoading(false);
      setIndicatorNewPromptDisplay(false);
      setModalOpen(true);
      setIcon(<WarningIcon />);
      setTitle('Limit Reached');
      setMessage(
        <span>
          You&apos;ve reached your limit of generating images. Share the results
          in <b> Twitter</b> and keep generating image
        </span>
      );
    }
  }

  const handleShareButton = async () => {
    setShareUrl(`${server}/?v=${current.id}`);
    setOpenShareModal(true);
  };

  const handleShareButtonSlideOver = async () => {
    setShareUrl(`${server}/?v=${current.id}`);
    setOpenShareSlideOver(true);
  };

  function scrollToPrompt(promptId) {
    // console.log(ref2.current.childElementCount);
    ref2.current.querySelector(`[data-id="${promptId}"]`).scrollIntoView({
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    setBackgroundImageUrl(current.imageUrl);
  }, [current.imageUrl, setBackgroundImageUrl]);

  useEffect(() => {
    setAllItem([item, ...item.SubPrompts]);
    const getMeta = (url, cb) => {
      const img = new Image();
      img.onload = () => cb(null, img);
      img.onerror = (err) => cb(err);
      img.src = url;
    };
    getMeta(item.imageUrl, (err, img) => {
      if (img) {
        if (img.naturalWidth > img.naturalHeight) {
          setImageOrientation(ImageOrientation.landscape);
        } else if (img.naturalWidth === img.naturalHeight) {
          setImageOrientation(ImageOrientation.square);
        } else {
          setImageOrientation(ImageOrientation.portrait);
        }
      }
    });
  }, [item]);

  useEffect(() => {
    if (newPrompt) {
      if (item?.id.toString() === newPrompt?.parentId.toString()) {
        setAllItem((prevItem) => [...prevItem, newPrompt]);
      }
    }
  }, [newPrompt, item]);

  useEffect(() => {
    const findElement = () => {
      const querySearch = window.location.search;

      const params = new URLSearchParams(querySearch);
      let paramElement = null;
      if (params.has('v')) {
        paramElement = params.get('v').toString();
      }

      if (paramElement) {
        let timeOut;
        const interval = setInterval(() => {
          const element = document.getElementById(`horizontal-${paramElement}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            clearInterval(interval);
            if (timeOut !== undefined) {
              clearTimeout(timeOut);
            }
          }
        }, 200);
        timeOut = setTimeout(() => {
          clearInterval(interval);
          clearTimeout(timeOut);
        }, 4000);
      }
    };
    findElement();
  }, []);

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
    setTotalSlide(allItem.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const x = allItem.find((value, index) => {
              if (value.id.toString() === id) {
                setCurrentSlide(index + 1);
                return value;
              }
              return null;
            });
            if (x) {
              setCurrent(x);
              window.history.replaceState(
                null,
                `Hologram - ${x.prompt}`,
                `?v=${x.id}`
              );
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    ref2.current.querySelectorAll('.snap-start').forEach((snap) => {
      observer.observe(snap);
    });
  }, [allItem]);

  useEffect(
    function mount() {
      function onResize() {
        setWindowSize([window.innerWidth, window.innerHeight]);
      }

      onResize();

      window.addEventListener('resize', onResize);

      return function unMount() {
        window.removeEventListener('resize', onResize);
      };
    },
    [setWindowSize]
  );

  useEffect(() => {
    if (
      navNewPromptContext?.promptId &&
      allItem.find((i) => i.id === navNewPromptContext?.promptId)
    ) {
      scrollToPrompt(navNewPromptContext?.promptId);
    }
  }, [allItem, navNewPromptContext?.promptId]);

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
            {allItem.map((myItem) => (
              <div
                className="snap-start flex items-center"
                key={myItem.id}
                data-id={myItem.id}
                id={`horizontal-${myItem.id}`}
              >
                <div
                  className="flex items-center rounded-2xl justify-center"
                  style={getStyle()}
                >
                  {/* mencoba biin objec contain untuk mulitple gambar varian version ratio */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
          <div className="grid grid-cols-12">
            <div className="col-span-10">
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
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm font-bold text-gray-170">
                {currentSlide}/{totalSlide}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-12 block sm:hidden">
              <div className="col-span-10">
                <button
                  onClick={() => setOpenBottomSlideOver(current, true)}
                  type="button"
                >
                  <p className="[@media(min-width:280px)]:text-[10px] [@media(min-width:389px)]:text-sm sm:text-base font-normal text-left">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    {`${
                      current.prompt.length > 70
                        ? `${current.prompt.slice(0, 70)}...`
                        : current.prompt
                    }`}{' '}
                    <span className="font-bold">Edit Prompt</span>
                  </p>
                </button>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={handleShareButtonSlideOver}
                  className="float-right"
                >
                  <ShareButtonIcon fill="white" />
                </button>
              </div>
            </div>
            <div className="hidden sm:block sm:mt-4">
              <div className="grid grid-cols-12">
                <div className="col-span-10">
                  <button
                    onClick={() => setOpenModalPrompt(current, true)}
                    type="button"
                  >
                    <p className="text-base font-normal text-left">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      {`${
                        current.prompt.length > 70
                          ? `${current.prompt.slice(0, 70)}...`
                          : current.prompt
                      }`}{' '}
                      <span className="font-bold">Edit Prompt</span>
                    </p>
                  </button>
                </div>
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={handleShareButton}
                    className="float-right"
                  >
                    <ShareButtonIcon fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6">
            {[
              // desktop
              {
                name: 'desktop',
                className: 'hidden sm:block',
                handleClick: () =>
                  status !== 'authenticated'
                    ? setShowSignInModal(true)
                    : handleSubmit(),
              },
              // mobile
              {
                name: 'mobile',
                className: 'block sm:hidden',
                handleClick: () =>
                  status !== 'authenticated'
                    ? setShowSignInSlideOver(true)
                    : handleSubmit(),
              },
            ].map((c) => (
              <button
                key={c.name}
                disabled={loading}
                onClick={c.handleClick}
                type="button"
                className={classNames(
                  loading ? 'text-white bg-gray-150' : 'text-white bg-primer',
                  `${c.className} rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px] flex justify-center items-center`
                )}
              >
                <div className="flex justify-center items-center space-x-[8px]">
                  {creditFee > 0 && (
                    <span className="h-[24px] min-w-[24px] bg-white rounded-2xl flex justify-center items-center space-x-[2px] px-[8px]">
                      <CreditIcon randomKey={c.name} />{' '}
                      <span className="text-black text-xs">{creditFee}</span>
                    </span>
                  )}
                  <span>Generate Now</span>
                </div>
              </button>
            ))}
          </div>
          <div className="border-b-4 rounded w-20 mx-auto opacity-50 sm:hidden mt-4" />
        </div>
      </div>
      <ShareModal
        modalOpen={openShareModal}
        modalClose={() => setOpenShareModal(false)}
        url={shareUrl}
        promptId={current.id}
      />
      <ShareSlideOver
        modalOpen={openShareSlideOver}
        modalClose={() => setOpenShareSlideOver(false)}
        url={shareUrl}
        promptId={current.id}
      />
      <SignInModal
        modalOpen={showSignInModal}
        modalClose={() => setShowSignInModal(false)}
      />
      <SignInSlideOver
        modalOpen={showSignInSlideOver}
        modalClose={() => setShowSignInSlideOver(false)}
      />
    </div>
  );
}

HorizontalSlider.defaultProps = {
  newPrompt: undefined,
};

export default HorizontalSlider;
