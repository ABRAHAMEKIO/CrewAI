import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { gnosis } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([gnosis], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Crew AI',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function ConnectWallet() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: '#101010',
        })}
      >
        <div className="lex items-center sm:static sm:inset-auto w-fit">
          <div className="flex space-x-4">
            <ConnectButton accountStatus="avatar" />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default ConnectWallet;
