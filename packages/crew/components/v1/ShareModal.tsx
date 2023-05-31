import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CrossIcon,
  FacebookIcon,
  TelegramIcon,
  TickIcon,
  TwitterIcon,
  WhatsappIcon,
} from './Icons';
import { displayUrl } from '../../helpers/component';

function ShareModal({
  modalOpen,
  modalClose,
  url,
}: {
  modalOpen: boolean;
  modalClose: () => void;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleSubmit(): Promise<void> {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 4000);
  }

  function handleIconShare(openUrl: string) {
    modalClose();
    window.open(openUrl, '_blank');
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          modalClose();
          setCopied(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#393939] bg-opacity-70 transition-opacity backdrop-blur-[10px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-full sm:max-w-[492px] mx-auto">
                <div className="flex h-full flex-col overflow-hidden bg-white space-y-4">
                  <div className="">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-xl font-bold leading-7 text-black pl-3">
                        Share
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
                          onClick={() => modalClose()}
                        >
                          <span className="sr-only">Close panel</span>
                          <div className="h-6 w-6 flex items-center justify-center">
                            <CrossIcon fill="#959595" size={14} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-1 space-y-3">
                    <p className="pl-3 text-black-190 text-base font-normal">
                      Share this link via
                    </p>
                    <div className="col-span-6 flex items-center">
                      <div className="inline mx-auto w-full">
                        <button
                          type="button"
                          onClick={() =>
                            handleIconShare(
                              `https://www.facebook.com/sharer/sharer.php?u=${url}`
                            )
                          }
                          className="inline-block m-2"
                        >
                          <FacebookIcon fill="white" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleIconShare(
                              `https://twitter.com/intent/tweet?text=Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`
                            )
                          }
                          className="inline-block m-2"
                        >
                          <TwitterIcon fill="white" />
                        </button>
                        {/* <button type="button" className="inline-block m-2"> */}
                        {/*  <InstagramIcon fill="white" /> */}
                        {/* </button> */}
                        <button
                          type="button"
                          onClick={() =>
                            handleIconShare(
                              `https://t.me/share/url?url=${url}&text=Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20`
                            )
                          }
                          className="inline-block m-2"
                        >
                          <TelegramIcon fill="white" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleIconShare(
                              `https://wa.me/?text=Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`
                            )
                          }
                          className="inline-block m-2"
                        >
                          <WhatsappIcon fill="white" />
                        </button>
                      </div>
                    </div>
                    <p className="pl-3 text-black-190 text-base font-normal">
                      Or copy link
                    </p>
                    <div className="flex items-center py-2">
                      <input
                        className="relative h-[48px] rounded-lg border border-solid border-[#EBEBEB] bg-white w-full text-black-150 mx-3 py-1 px-4 leading-tight focus:outline-none"
                        type="text"
                        readOnly
                        defaultValue={displayUrl(url, 32)}
                      />
                      <button
                        type="button"
                        className="right-0 mr-4 absolute text-white bg-black-190 rounded-lg w-full text-base font-bold min-h-[40px] max-w-[72px]"
                        onClick={() => handleSubmit()}
                      >
                        {copied ? (
                          <TickIcon fill="none" className="mx-auto" />
                        ) : (
                          'Copy'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ShareModal;
