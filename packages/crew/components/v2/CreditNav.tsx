import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CreditIcon } from '../v1/Icons';
import UserProfileContext from '../../context/user-profile-context';
import { server } from '../../config';

function CreditNav() {
  const { status } = useSession();
  const [isSignin, setIsSignin] = useState(false);
  const UserProfile = useContext(UserProfileContext);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchDataUser = async () => {
        const userProfile = await fetch(`${server}/api/user/get-profile`, {
          method: 'POST',
        });

        const User = await userProfile.json();
        if (User && User.user) {
          UserProfile.update(User.user); // eslint-disable-line
        }
      };
      // eslint-disable-next-line no-console
      fetchDataUser().catch(console.error);
      setIsSignin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isSignin && (
        <div className="flex justify-center items-center mr-2">
          <button
            disabled
            type="button"
            className="rounded-lg text-base font-bold"
          >
            <span className="h-[40px] min-w-[74px] bg-white rounded-[20px] flex justify-center items-center px-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.3)] pr-1">
              <CreditIcon size={24} />{' '}
              <span className="text-black text-base font-bold px-2">
                {/* eslint-disable react/destructuring-assignment */}
                {UserProfile.credit || 0}
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default CreditNav;
