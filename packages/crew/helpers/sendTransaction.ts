import { ethers } from 'ethers';
import { web3AddressGnosis, web3AddressPolygon } from '../config';

async function sendTransaction(sendTokenAmount: string) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const network = (await provider.getNetwork()).name;

    const tx = await signer.sendTransaction({
      to: network === 'matic' ? web3AddressPolygon : web3AddressGnosis,
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
