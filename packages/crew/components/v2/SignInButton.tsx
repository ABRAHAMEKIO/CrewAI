import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SignInSlideOver from './SignInSlideOver';
import SignInModal from './SignInModal';
import LogoutSlideOver from './LogoutSlideOver';
import LogoutModal from './LogoutModal';

function SignInButton() {
  const [openSignInSlideOver, setOpenSignInSlideOver] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openLogoutSlideOver, setOpenLogoutSlideOver] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { data: session, status } = useSession();
  const [isSignin, setIsSignin] = useState(false);

  async function handleClickSlideOver() {
    setOpenSignInSlideOver(true);
  }

  async function handleClickModal() {
    setOpenSignInModal(true);
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setIsSignin(true);
    }
  }, [status]);

  async function handleLogoutSlideOver() {
    setOpenLogoutSlideOver(true);
  }

  async function handleLogoutModal() {
    setOpenLogoutModal(true);
  }

  return (
    <>
      {!isSignin ? (
        <>
          <div className="block sm:hidden">
            <button
              onClick={handleClickSlideOver}
              type="button"
              className="bg-gray-900 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
            >
              Sign in
            </button>
          </div>
          <div className="hidden sm:block">
            <button
              onClick={handleClickModal}
              type="button"
              className="bg-gray-900 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
            >
              Sign in
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="block sm:hidden">
            <button
              type="button"
              onClick={handleLogoutSlideOver}
              className="relative w-10 h-10 rounded-full bg-gray-130 text-center"
            >
              <div className="align-middle text-base text-gray-170 font-bold">
                {session?.user?.email.charAt(0).toUpperCase()}
              </div>
            </button>
          </div>
          <div className="hidden sm:block">
            <button
              type="button"
              onClick={handleLogoutModal}
              className="relative w-10 h-10 rounded-full bg-gray-130 text-center"
            >
              <div className="align-middle text-base text-gray-170 font-bold">
                {session?.user?.email.charAt(0).toUpperCase()}
              </div>
            </button>
          </div>
        </>
      )}

      <SignInSlideOver
        modalOpen={openSignInSlideOver}
        modalClose={() => setOpenSignInSlideOver(false)}
      />
      <SignInModal
        modalOpen={openSignInModal}
        modalClose={() => setOpenSignInModal(false)}
      />
      <LogoutSlideOver
        modalOpen={openLogoutSlideOver}
        modalClose={() => setOpenLogoutSlideOver(false)}
      />
      <LogoutModal
        modalOpen={openLogoutModal}
        modalClose={() => setOpenLogoutModal(false)}
      />
    </>
  );
}

export default SignInButton;
