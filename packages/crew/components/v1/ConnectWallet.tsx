import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useNetwork } from 'wagmi';
import { useSession } from 'next-auth/react';

function ConnectWallet() {
  const { status } = useSession();
  const { chain: selectedChain } = useNetwork();
  useEffect(() => {
    if (
      status === 'authenticated' &&
      !(selectedChain?.id === 100 || selectedChain?.id === 137)
    ) {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: ethers.utils.hexValue(100),
            rpcUrls: ['https://rpc.gnosischain.com'],
            chainName: 'Gnosis',
            nativeCurrency: {
              name: 'xDai',
              symbol: 'xDai',
              decimals: 18,
            },
            blockExplorerUrls: ['https://gnosisscan.io'],
          },
        ],
      });
    }
  });

  return (
    <ConnectButton.Custom>
      {({
        account,
        // eslint-disable-next-line no-shadow
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gray-900 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="h-full inline-flex items-center gap-x-1.5 border-slate-200 rounded-md bg-white p-2 text-sm font-semibold text-black-190 shadow-md hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whit"
                  >
                    {chain.hasIcon && (
                      <div className="overflow-hidden border-rounded-full">
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-5"
                          />
                        )}
                      </div>
                    )}
                    <div className="hidden sm:block">{chain.name}</div>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="h-full inline-flex items-center border-slate-200 rounded-md bg-white p-2 text-sm font-semibold text-black-190 shadow-md hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 text-center divide-x divide-gray-400">
                      <div className="">
                        {account.displayBalance ? account.displayBalance : ''}
                      </div>
                      <div className="px-[10px] hidden sm:block">
                        {account.displayName}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectWallet;
