import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import PromptClient from '../../domain/prompt/promptClient';
import { PromptAttributes } from '../../db/models/prompt';
import { creditFee } from '../../config';
import { CreditIcon, CrossIcon } from '../v1/Icons';
import SignInSlideOver from './SignInSlideOver';

function BottomSlideOver({
  loading,
  setLoading,
  prompt,
  modalOpen,
  socketId,
  modalClose,
  parentId,
}: {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  parentId: number;
  prompt: PromptAttributes;
  modalOpen: boolean;
  socketId: string;
  modalClose: () => void;
}) {
  const [text, setText] = useState<string>('');
  const { status } = useSession();
  const [showSignInSlideOver, setShowSignInSlideOver] = useState(false);

  useEffect(() => {
    setText(prompt.prompt);
  }, [prompt]);

  async function handleSubmit(): Promise<void> {
    if (!(status === 'authenticated')) {
      setShowSignInSlideOver(true);
    } else {
      if (loading) return;
      setLoading(true);
      const promptClient = new PromptClient();
      const response = await promptClient.generateV2({
        promptId: parentId,
        msg: text,
        socketId,
      });

      modalClose();
      if ('success' in response && response.success) {
        return;
      }

      if ('success' in response && !response.success) {
        setLoading(false);
        // eslint-disable-next-line no-alert
        window.alert('Generate Fail');
      }
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
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
                            className="text-sm h-full w-full focus:outline-none focus:ring-0 focus:ring-offset-0"
                            style={{
                              resize: 'none',
                            }}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                          />
                        </div>
                        <button
                          disabled={loading}
                          type="button"
                          className={classNames(
                            loading
                              ? 'text-white bg-gray-150'
                              : 'text-white bg-primer',
                            'rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px]'
                          )}
                          onClick={() => handleSubmit()}
                        >
                          <div className="flex justify-center items-center space-x-[8px]">
                            {creditFee > 0 && (
                              <span className="h-[24px] min-w-[24px] bg-white rounded-2xl flex justify-center items-center space-x-[2px] px-[8px]">
                                <CreditIcon />{' '}
                                <span className="text-black text-xs">
                                  {creditFee}
                                </span>
                              </span>
                            )}
                            <span>Generate Now</span>
                          </div>
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
      <SignInSlideOver
        modalOpen={showSignInSlideOver}
        modalClose={() => setShowSignInSlideOver(false)}
      />
    </>
  );
}

export default BottomSlideOver;
