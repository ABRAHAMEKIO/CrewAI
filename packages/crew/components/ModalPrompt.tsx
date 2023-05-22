import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CrossIcon } from './Icons';
import { PromptAttributes } from '../db/models/prompt';
import PromptClient from '../domain/prompt/promptClient';
import sendTransaction from '../helpers/sendTransaction';
import NavNewPromptContext from '../context/nav-new-prompt-context';

function ModalPrompt({
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

  const navNewPromptContext = useContext(NavNewPromptContext);

  useEffect(() => {
    setText(prompt.prompt);
  }, [prompt]);

  async function handleSubmit(): Promise<void> {
    if (loading) return;
    setLoading(true);
    const transaction = await sendTransaction('0.01');
    // eslint-disable-next-line no-console
    console.log({ transaction });
    if (transaction) {
      setLoading(true);
      const promptClient = new PromptClient();
      const response = await promptClient.generate({
        promptId: parentId,
        msg: text,
        socketId,
        transactionHash: transaction.hash.toString(),
      });

      modalClose();
      if ('success' in response && response.success) {
        return;
      }

      if ('success' in response && !response.success) {
        setLoading(false);
        // eslint-disable-next-line no-alert
        window.alert('Generate Fail');
        return;
      }
    }

    modalClose();
    setLoading(false);
    navNewPromptContext?.setIndicatorNewPromptDisplay(false);
    // eslint-disable-next-line no-alert
    window.alert('Transaction Fail');
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalClose}>
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
                <div className="flex h-full flex-col overflow-x-scroll bg-white space-y-4">
                  <div className="">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-xl font-bold leading-6 text-black">
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
                  <div className="relative flex-1 space-y-6">
                    {/* Your content */}
                    <div className="border border-[#EBEBEB] ring-[#EBEBEB] rounded-lg h-[136px] p-4 ">
                      <textarea
                        className="text-base h-full w-full focus:outline-none focus:ring-0 focus:ring-0 focus:ring-offset-0"
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
                      Generate ($0.01 xDai)
                    </button>
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

export default ModalPrompt;
