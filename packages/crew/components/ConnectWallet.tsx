/* eslint-disable object-shorthand */
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
  useBalance,
  useDisconnect,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import React, { useEffect, Fragment } from 'react';
import { Link } from '@nextui-org/react';
import { Menu, Transition } from '@headlessui/react';
import { ArrowDownIcon } from './Icons';

function ConnectWallet() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data: session } = useSession();
  const balance = useBalance({
    address: session?.user?.name as `0x${string}`,
    watch: true,
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleLogin = async () => {
    try {
      const callbackUrl = '/';
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      await signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <>
      {!session && (
        <div className="flex items-center sm:static sm:inset-auto w-fit">
          <div className="flex space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!isConnected) {
                  connect();
                } else {
                  handleLogin();
                }
              }}
              type="button"
              className="bg-gray-900 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}

      {/* Profile dropdown */}
      {session?.user && (
        <Menu as="div" className="relative">
          <div className="h-10">
            <Menu.Button
              type="button"
              className="h-full inline-flex items-center gap-x-1.5 border-slate-200 rounded-md bg-white p-2 text-sm font-semibold text-white shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="sr-only">Open user menu</span>
              {/* disable until feature user profile delivered */}
              {/* {session.user.image && ( */}
              {/*  <img */}
              {/*    className="h-8 w-8 rounded-full" */}
              {/*    src={getProfileImage(session.user.image)} */}
              {/*    alt={session.user.email ?? session.user.name} */}
              {/*  /> */}
              {/* )} */}
              {balance && balance?.data && balance?.data?.formatted && (
                <p className="w-[98px] text-black-190 text-ellipsis overflow-hidden">
                  {balance.data.formatted.slice(0, 6)} {balance.data.symbol}
                </p>
              )}
              <p className="w-[98px] text-black-190 text-ellipsis overflow-hidden hidden sm:block">
                {session.user.email ?? session.user.name}
              </p>
              <ArrowDownIcon fill="#111827" size="16" />
            </Menu.Button>
            {/* <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"> */}

            {/* </Menu.Button> */}
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-22 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/api/auth/signout"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-black-190'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      disconnect();
                      signOut();
                    }}
                  >
                    Sign out
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default ConnectWallet;
