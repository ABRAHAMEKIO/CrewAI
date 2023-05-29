import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Magic } from 'magic-sdk';
import { signIn, useSession } from 'next-auth/react';
import { CrossIcon } from '../v1/Icons';

const magic =
  typeof window !== 'undefined' &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PK);
function SignInModal({
  modalOpen,
  modalClose,
}: {
  modalOpen: boolean;
  modalClose: () => void;
}) {
  const [emailModal, setEmailModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(): Promise<void> {
    setIsLoading(true);
    if (!magic) throw new Error(`magic not defined`);

    try {
      const didToken = await magic.auth.loginWithMagicLink({
        email: emailModal,
      });

      if (didToken) {
        const signin = await signIn('magic', {
          didToken,
          redirect: false,
        });
        if (!signin.error) {
          setIsLoading(false);
          modalClose();
        }
      }
    } catch (e) {
      setIsLoading(false);
    }
  }

  const onChange = (event) => {
    const { value } = event.target;
    setEmailModal(value);
  };

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          modalClose();
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
                      <Dialog.Title className="text-xl font-bold leading-7 text-black mx-auto">
                        Sign in to Start Creating
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
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
                  <div className="relative flex-1 space-y-3">
                    <p className="px-4 text-black-190 text-base font-normal text-center">
                      Just enter your email below. Bring your ideas to life with
                      Hologram.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <input
                        className="h-[48px] font-normal rounded-lg border border-solid border-[#EBEBEB] bg-white w-full text-black-150 min-w-[117px] mt-6 py-1 px-4 text-base focus:outline-none"
                        type="text"
                        placeholder="email@example.com"
                        onChange={onChange}
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="text-white bg-black-190 mt-4 text-white rounded-lg w-full text-base font-bold min-h-[48px] sm:h-[60px] min-w-[117px]"
                        onClick={() => handleSubmit()}
                      >
                        {!isLoading ? 'Sign In' : 'Loading...'}
                      </button>
                    </form>
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

export default SignInModal;
