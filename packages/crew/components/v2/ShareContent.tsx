import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  FacebookIcon,
  TickIcon,
  CreditFlatIcon,
  CreditIcon,
} from '../v1/Icons';
import { displayUrl } from '../../helpers/component';
import PromptClient from '../../domain/prompt/promptClient';
import ErrorModalContext from '../../context/error-modal-context';

function ShareContent({
  modalOpen,
  modalClose,
  url,
  promptId,
}: {
  modalOpen: boolean;
  modalClose: () => void;
  url: string;
  promptId: number;
}) {
  const [copied, setCopied] = useState(false);
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    setModalOpen: setErrorModalOpen,
    setTitle: setErrorTitle,
    setMessage: setErrorMessage,
    setIcon: setErrorIcon,
  } = useContext(ErrorModalContext);
  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [modalOpen]);

  async function handleSubmit(): Promise<void> {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 4000);
  }

  async function twitterShare() {
    if (loading) return;
    setLoading(true);
    if (status === 'authenticated') {
      const promptClient = new PromptClient();
      const response = await promptClient.share({ promptId });
      if ('share' in response) {
        const text = `Hey%20I%20found%20an%20interesting%20AI-generated%20@tryhologram%2C%20check%20this%20out%20${url}%20(Share%20Code:%20${response.share.code})`;
        modalClose();
        setLoading(false);
        setErrorTitle('Congrats');
        setErrorMessage('Your free credit is being processed, please wait.');
        setErrorIcon(<CreditIcon size={66.67} />);
        setErrorModalOpen(true);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        return;
      }
    }
    const text = `Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`;
    modalClose();
    setLoading(false);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }

  function handleIconShare(openUrl: string) {
    modalClose();
    window.open(openUrl, '_blank');
  }

  return (
    <>
      <p className="pl-3 text-black-190 text-base font-normal">
        Share this link via
      </p>
      <div className="col-span-6 flex items-center">
        <div className="inline mx-auto w-full">
          <button
            type="button"
            onClick={() =>
              handleIconShare(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`
              )
            }
            className="inline-block m-2"
          >
            <FacebookIcon fill="white" />
          </button>
          <button
            type="button"
            onClick={() => twitterShare()}
            className="inline-block m-2 relative"
          >
            {status === 'authenticated' && (
              <div className="h-4 w-full bg-primer flex absolute px-[6px] py-[1px] rounded-lg -mt-2">
                <span className="font-bold text-[10px] leading-[14px] text-white">
                  Free
                </span>
                <CreditFlatIcon size="12" />
              </div>
            )}
            <TwitterIcon fill="white" />
          </button>
          {/* <button type="button" className="inline-block m-2"> */}
          {/*  <InstagramIcon fill="white" /> */}
          {/* </button> */}
          <button
            type="button"
            onClick={() => {
              handleIconShare(
                `https://t.me/share/url?url=${url}&text=Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20`
              );
            }}
            className="inline-block m-2"
          >
            <TelegramIcon fill="white" />
          </button>
          <button
            type="button"
            onClick={() => {
              handleIconShare(
                `https://wa.me/?text=Hey%20I%20found%20an%20interesting%20AI-generated%20hologram%2C%20check%20this%20out%20${url}`
              );
            }}
            className="inline-block m-2"
          >
            <WhatsappIcon fill="white" />
          </button>
        </div>
      </div>
      <p className="pl-3 text-black-190 text-base font-normal">Or copy link</p>
      <div className="flex items-center py-2">
        <input
          className="relative h-[48px] rounded-lg border border-solid border-[#EBEBEB] bg-white w-full text-black-150 mx-3 py-1 px-4 leading-tight focus:outline-none"
          type="text"
          readOnly
          defaultValue={displayUrl(url, 24)}
        />
        <button
          type="button"
          className="right-0 mr-8 sm:mr-4 absolute text-white bg-black-190 rounded-lg w-full text-base font-bold min-h-[40px] max-w-[72px]"
          onClick={() => handleSubmit()}
        >
          {copied ? <TickIcon fill="none" className="mx-auto" /> : 'Copy'}
        </button>
      </div>
    </>
  );
}

export default ShareContent;
