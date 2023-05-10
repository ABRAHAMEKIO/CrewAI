import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CrossIcon } from './Icons';

function BottomSlideOver(props: {
  prompt: string;
  modalOpen: boolean;
  modalClose: () => void;
}) {
  const { prompt, modalOpen, modalClose } = props;
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(prompt);
  }, [prompt]);

  async function handleSubmit(event): Promise<void> {
    // logic here, or create function usable
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalClose}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 pt-[calc(100vh-264px)]">
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
                  <div className="flex h-full flex-col overflow-x-scroll bg-white py-6 shadow-xl rounded-t-3xl space-y-4">
                    <div className="px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Edit Prompt
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-0 focus:ring-offset-0"
                            onClick={() => modalClose()}
                          >
                            <span className="sr-only">Close panel</span>
                            <button
                              type="button"
                              className="h-6 w-6 flex items-center justify-center"
                            >
                              <CrossIcon fill="#959595" size={14} />
                            </button>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6 space-y-4">
                      {/* Your content */}
                      <div className="border border-[#EBEBEB] ring-[#EBEBEB] rounded-lg h-[104px] p-4">
                        <textarea
                          className="text-sm h-full w-full focus:outline-none focus:ring-0 focus:ring-0 focus:ring-offset-0"
                          style={{
                            resize: 'none',
                          }}
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-[linear-gradient(224.03deg,#211093_-1.74%,#A323A3_47.01%,#FFA01B_100%)] rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px] text-white"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Generate Now
                      </button>
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