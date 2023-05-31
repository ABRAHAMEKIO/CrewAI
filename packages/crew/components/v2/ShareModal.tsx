import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CrossIcon } from '../v1/Icons';
import ShareContent from './ShareContent';

function ShareModal({
  modalOpen,
  modalClose,
  url,
  promptId,
}: {
  modalOpen: boolean;
  modalClose: () => void;
  url: string;
  promptId: number;
}) {
  const [copied, setCopied] = useState(false);

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
                    {/* Your content */}
                    <ShareContent
                      modalOpen={modalOpen}
                      modalClose={modalClose}
                      url={url}
                      promptId={promptId}
                    />
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
