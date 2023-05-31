import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CrossIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  FacebookIcon,
  TickIcon,
  CreditFlatIcon,
} from './Icons';
import { displayUrl } from '../../helpers/component';

function BottomSlideOver({
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
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 pt-[calc(100vh-304px)]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen">
                  <div className="flex h-full flex-col overflow-hidden bg-white py-6 shadow-xl rounded-t-3xl space-y-4">
                    <div className="px-7 sm:px-9">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-bold leading-7 text-black">
                          Share
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-0 focus:ring-offset-0"
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
                    <div className="relative flex-1 px-4 sm:px-6 space-y-2">
                      <p className="pl-3 text-black-190 text-base font-normal">
                        Share this link via
                      </p>
                      <div className="col-span-6 flex items-center">
                        <div className="inline mx-auto w-full">
                          <button
                            type="button"
                            onClick={() => {
                              window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                                '_blank'
                              );
                            }}
                            className="inline-block m-2"
                          >
                            <FacebookIcon fill="white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              window.open(
                                `https://twitter.com/intent/tweet?text=Hey%20I%20found%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`,
                                '_blank'
                              );
                            }}
                            className="inline-block m-2 relative"
                          >
                            <div className="h-4 w-full bg-primer flex absolute px-[6px] py-[1px] rounded-lg -mt-2">
                              <span className="font-bold text-[10px] leading-[14px] text-white">
                                Free
                              </span>
                              <CreditFlatIcon size="12" />
                            </div>
                            <TwitterIcon fill="white" />
                          </button>
                          {/* <button type="button" className="inline-block m-2"> */}
                          {/*  <InstagramIcon fill="white" /> */}
                          {/* </button> */}
                          <button
                            type="button"
                            onClick={() => {
                              window.open(
                                `https://t.me/share/url?url=${url}&text=Hey%20I%20found%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20`,
                                '_blank'
                              );
                            }}
                            className="inline-block m-2"
                          >
                            <TelegramIcon fill="white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              window.open(
                                `https://wa.me/?text=Hey%20I%20found%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`,
                                '_blank'
                              );
                            }}
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
                          defaultValue={displayUrl(url, 24)}
                        />
                        <button
                          type="button"
                          className="right-0 mr-8 absolute text-white bg-black-190 rounded-lg w-full text-base font-bold min-h-[40px] max-w-[72px]"
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
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default BottomSlideOver;
