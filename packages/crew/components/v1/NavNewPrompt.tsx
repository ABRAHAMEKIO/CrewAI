// eslint-disable react/jsx-no-constructed-context-values
import React, { useContext, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LoadingIcon } from './Icons';
import LoadingContext from '../../context/loading-context';
import PromptContext from '../../context/prompt-context';
import NavNewPromptContext from '../../context/nav-new-prompt-context';
import { classNames } from '../../helpers/component';
import { PromptAttributes } from '../../db/models/prompt';

// import { PromptAttributes } from '../db/models/prompt';

function NavNewPrompt() {
  const { loading } = useContext(LoadingContext);
  const newPrompt = useContext<PromptAttributes>(PromptContext);
  const {
    setPromptId,
    indicatorNewPromptDisplay,
    setIndicatorNewPromptDisplay,
  } = useContext(NavNewPromptContext);

  function handleClickImageAfterLoading(promptId) {
    setPromptId(promptId);
    setIndicatorNewPromptDisplay(false);
  }

  useEffect(() => {
    if (loading) {
      setIndicatorNewPromptDisplay(true);
    }
  }, [loading, setIndicatorNewPromptDisplay]);

  const showFeature = false;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {indicatorNewPromptDisplay && (
        <Menu as="div" className="relative mr-2">
          <div>
            <Menu.Button
              disabled={loading}
              className="flex justify-center items-center rounded-full h-10 w-10 bg-gray-130 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => handleClickImageAfterLoading(newPrompt?.id)}
            >
              <span className="sr-only">Open user menu</span>
              {loading && (
                <div className="relative h-8 w-8">
                  <LoadingIcon
                    fill="#959595"
                    size={32}
                    className="absolute animate-spin"
                  />
                  {/* count of total image loading */}
                  <span className="hidden text-xs font-bold">4</span>
                </div>
              )}
              {newPrompt && !loading && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="h-10 w-10 rounded-full"
                  src={newPrompt?.imageUrl}
                  alt=""
                />
              )}
            </Menu.Button>
          </div>
          {showFeature && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -left-4 w-[calc(100vw-48px)] z-10 mt-6 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          )}
        </Menu>
      )}
    </>
  );
}

export default NavNewPrompt;
