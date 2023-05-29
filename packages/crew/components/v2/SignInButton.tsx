import React, { useState } from 'react';
import SignInSlideOver from './SignInSlideOver';
import SignInModal from './SignInModal';

function SignInButton() {
  const [openSignInSlideOver, setOpenSignInSlideOver] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);

  async function handleClickSlideOver() {
    setOpenSignInSlideOver(true);
  }

  async function handleClickModal() {
    setOpenSignInModal(true);
  }

  return (
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
