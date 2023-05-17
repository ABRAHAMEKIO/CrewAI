import { ethers } from 'ethers';

async function sendTransaction(sendTokenAmount: string) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: '0xd54E6A61332657eCac42146f226e44C6166C86bE',
      value: ethers.utils.parseUnits(sendTokenAmount, 'ether').toHexString(),
    });

    const rc = await tx.wait();
    if (rc.status === 1) {
      return tx;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export default sendTransaction;
