import React, { useContext } from 'react';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import LoadingContext from '../../context/loading-context';
import Section from './Section';
import ConnectWallet from './ConnectWallet';
import NavNewPrompt from './NavNewPrompt';
import { server } from '../../config';
import NavNewPromptContext from '../../context/nav-new-prompt-context';

const navigation = [{ name: 'For You', href: '#', current: true }];

const nivigationRight = [
  // { name: 'Create', href: '#', current: true, bgDark: false },
  { name: 'Connect Wallet', href: '#', current: true, bgDark: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const showFeature = false;

function Nav({ className }: { className?: string }) {
  const { loading } = useContext(LoadingContext);
  const { indicatorNewPromptDisplay } = useContext(NavNewPromptContext);

  return (
    <Disclosure as="nav" className={className || 'bg-white border-b'}>
      {({ open }) => (
        <>
          <Section className="container max-w-[64rem] mx-auto px-[1.5rem] sm:pt-8 xl:px-0">
            {/* <div className="relative flex h-[4rem] sm:h-[4rem] items-center justify-between rounded-2xl py-3 px-4 border"> */}
            <div className="relative flex h-[4rem] items-center justify-between bg-white rounded-2xl py-3 px-4">
              <NavNewPrompt />

              {showFeature && (
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                  </Disclosure.Button>
                </div>
              )}
              <div className="flex flex-1 items-center justify-between sm:items-stretch">
                <div
                  className={classNames(
                    loading || indicatorNewPromptDisplay
                      ? 'hidden'
                      : 'flex-shrink-0 items-center space-x-4'
                  )}
                >
                  <a
                    className="font-bold text-base sm:text-xl not-italic"
                    href={`${server}/web3`}
                  >
                    <Image
                      src="/images/hologram-logo.png"
                      alt="hologram-logo"
                      width="113"
                      height="22"
                    />
                  </a>
                </div>
                {showFeature && (
                  <div className="sm:ml-6 flex items-center w-full justify-center">
                    <div className="flex space-x-[2.5rem] justify-center">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="font-normal text-base"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center sm:static sm:inset-auto w-fit">
                <div className="flex space-x-4">
                  <ConnectWallet />
                </div>
              </div>

              {showFeature && (
                <div className="lex items-center sm:static sm:inset-auto w-fit">
                  <div className="flex space-x-4">
                    {nivigationRight.map((item) => {
                      return (
                        <Disclosure.Button
                          key="connect-wallet"
                          className={classNames(
                            item.bgDark
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-black ',
                            'border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]'
                          )}
                        >
                          {item.name}
                        </Disclosure.Button>
                      );
                    })}
                  </div>

                  {/* Profile dropdown */}
                </div>
              )}
            </div>
          </Section>

          {showFeature && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}

Nav.defaultProps = {
  className: null,
};

export default Nav;
