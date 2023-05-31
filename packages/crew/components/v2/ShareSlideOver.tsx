import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CrossIcon } from '../v1/Icons';
import ShareContent from './ShareContent';

function BottomSlideOver({
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
  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          modalClose();
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
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default BottomSlideOver;
