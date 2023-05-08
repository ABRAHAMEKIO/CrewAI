import React from 'react';
import { Disclosure } from '@headlessui/react';
import { LogoIcon } from './Icons';
import Section from './Section';

const navigation = [
  // { name: 'For You', href: '#', current: true },
];

const nivigationRight = [
  // { name: 'Create', href: '#', current: true, bgDark: false },
  { name: 'Connect Wallet', href: '#', current: true, bgDark: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white border-b">
      {({ open }) => (
        <>
          <Section>
            <div className="relative flex h-[4.5rem] sm:h-[7rem] items-center justify-between ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch">
                <div className="flex flex-shrink-0 items-center space-x-4">
                  <div className="max-w-[32px] sm:max-w-[40px]">
                    <LogoIcon fill="currentColor" size="auto" />
                  </div>
                  <h1 className="font-bold text-2xl not-italic hidden sm:block">
                    Hologram
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex items-center w-full justify-center">
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
              </div>

              <div className="absolute right-0 flex items-center sm:static sm:inset-auto w-fit">
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
            </div>
          </Section>

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
        </>
      )}
    </Disclosure>
  );
}
