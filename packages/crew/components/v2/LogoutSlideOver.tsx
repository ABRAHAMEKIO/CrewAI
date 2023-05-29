import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { CrossIcon } from '../v1/Icons';

function LogoutSlideOver({
  modalOpen,
  modalClose,
}: {
  modalOpen: boolean;
  modalClose: () => void;
}) {
  const { data: session } = useSession();

  async function handleLogout(): Promise<void> {
    console.log('adas');
  }

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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 pt-[calc(100vh-274px)]">
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
                        <Dialog.Title className="text-xl font-bold leading-7 text-black text-center mx-auto">
                          Sign in to Start Creating
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
                    <div className="px-4 sm:px-6">
                      <button
                        type="button"
                        className="text-white bg-black-190 mt-4 text-white rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px]"
                        onClick={() => handleLogout()}
                      >
                        Sign In
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

export default LogoutSlideOver;
