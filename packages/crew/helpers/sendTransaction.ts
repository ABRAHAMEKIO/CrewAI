import { ethers } from 'ethers';

function sendTransaction(receiveAddress: string, sendTokenAmount: string) {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.gnosischain.com/'
  );
  const wallet = new ethers.Wallet('privateKey', provider);
  window.ethersProvider = new ethers.providers.JsonRpcProvider(
    'https://rpc.gnosischain.com/'
  );

  const tx = {
    to: receiveAddress,
    value: ethers.utils.parseEther(sendTokenAmount),
  };

  try {
    wallet.sendTransaction(tx).then((txObj) => {
      return txObj.hash;
    });
  } catch (error) {
    console.log('failed to send!!');
  }

  return null;
}

export default sendTransaction;
