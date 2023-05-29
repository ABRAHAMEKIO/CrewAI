import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import SignInSlideOver from './SignInSlideOver';
import SignInModal from './SignInModal';

function SignInButton() {
  const [openSignInSlideOver, setOpenSignInSlideOver] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const { data: session } = useSession();
  const [isSignin, setIsSignin] = useState(false);
  const [userSession, setUserSession] = useState(null);

  async function handleClickSlideOver() {
    setOpenSignInSlideOver(true);
  }

  async function handleClickModal() {
    setOpenSignInModal(true);
  }

  useEffect(() => {
    if (session) {
      setUserSession(session);
      setIsSignin(true);
    }
  }, [session]);

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
        <Image
          className="w-10 h-10 rounded-full"
          src={userSession?.session?.user?.image}
          alt="Rounded avatar"
        />
      )}

      <SignInSlideOver
        modalOpen={openSignInSlideOver}
        modalClose={() => setOpenSignInSlideOver(false)}
      />
      <SignInModal
        modalOpen={openSignInModal}
        modalClose={() => setOpenSignInModal(false)}
      />
    </>
  );
}

export default SignInButton;
