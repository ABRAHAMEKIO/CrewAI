import React, { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Magic } from 'magic-sdk';
import { signIn } from 'next-auth/react';
import { CrossIcon } from '../v1/Icons';
import { classNames } from '../../helpers/component';
import { isValidEmail } from '../../helpers/form';
import { server } from '../../config';
import UserProfileContext from '../../context/user-profile-context';

// console.log(process.env);

const magic =
  typeof window !== 'undefined' &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PK);
function SignInSlideOver({
  modalOpen,
  modalClose,
}: {
  modalOpen: boolean;
  modalClose: () => void;
}) {
  const [emailModal, setEmailModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const UserProfile = useContext(UserProfileContext);

  async function handleSubmit(): Promise<void> {
    setIsLoading(true);
    setError(null);
    if (!magic) throw new Error(`magic not defined`);
    if (isValidEmail(emailModal)) {
      const didToken = await magic.auth.loginWithMagicLink({
        email: emailModal,
      });

      if (didToken) {
        const signin = await signIn('magic', {
          didToken,
          redirect: false,
        });
        if (!signin.error) {
          const fetchUser = await fetch(`${server}/api/user/get-profile`, {
            method: 'POST',
          });

          const User = await fetchUser.json();
          if (User && User.user) {
            UserProfile.update(User.user); // eslint-disable-line
          }
          setIsLoading(false);
          modalClose();
        }
      }
      setIsLoading(false);
      modalClose();
    } else {
      setError('Email is invalid');
    }
  }

  const onChange = (event) => {
    setIsLoading(false);
    setError(false);
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
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={classNames(
                error ? 'pt-[calc(100vh-298px)]' : 'pt-[calc(100vh-274px)]',
                'pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0'
              )}
            >
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
                            <div className="h-6 w-6 flex items-center justify-center">
                              <CrossIcon fill="#959595" size={14} />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 sm:px-6">
                      <p className="px-4 text-black-190 text-base font-normal text-center">
                        Just enter your email below. Bring your ideas to life
                        with Hologram.
                      </p>
                      <form onSubmit={handleSubmit}>
                        <input
                          className="h-[48px] font-normal rounded-lg border border-solid border-[#EBEBEB] bg-white w-full text-black-150 min-w-[117px] mt-6 py-1 px-4 text-base focus:outline-none"
                          type="text"
                          placeholder="email@example.com"
                          onChange={onChange}
                        />
                        {error && (
                          <span className="text-sm text-red-500">{error}</span>
                        )}
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
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SignInSlideOver;
