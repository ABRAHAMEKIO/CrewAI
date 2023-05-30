import React, { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CrossIcon, FailIcon } from './Icons';
import ErrorModalContext from '../../context/error-modal-context';

function ErrorModal() {
  const { modalOpen, setModalOpen, title, message } =
    useContext(ErrorModalContext);

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out sm:ease-in duration-500 sm:duration-300"
          enterFrom="translate-y-full sm:opacity-0"
          enterTo="translate-y-0 sm:opacity-100"
          leave="transform transition ease-in-out sm:ease-in duration-500 sm:duration-200"
          leaveFrom="translate-y-0 sm:opacity-100"
          leaveTo="translate-y-full sm:opacity-0"
        >
          <div className="fixed inset-0 bg-[#393939] bg-opacity-70 transition-opacity backdrop-blur-[10px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-full sm:max-w-[492px] mx-auto">
                <div className="flex h-full flex-col overflow-hidden bg-white space-y-4">
                  <div className="ml-3 flex h-7 justify-end sm:hidden">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
                      onClick={() => setModalOpen(false)}
                    >
                      <CrossIcon fill="#959595" size={14} />
                    </button>
                  </div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                    <FailIcon fill="none" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                      onClick={() => setModalOpen(false)}
                    >
                      OK
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

export default ErrorModal;
