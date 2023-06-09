import React, { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import logo from '../../public/images/hologram-logo.png';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: 'Hologram',
      icon: window.location.origin + logo,
    },
    redirectTo: '/stacks',
    onFinish: () => {
      userSession.loadUserData();
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut('/stacks');
}

function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div>
        <button className="" type="button" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
      </div>
    );
  }

  return (
    <button className="" type="button" onClick={authenticate}>
      Connect Wallet
    </button>
  );
}

export default ConnectWallet;
