import { ethers } from 'ethers';
import { web3AddressGnosis, web3AddressPolygon } from '../config';

async function sendTransaction(sendTokenAmount: string) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();

    const tx = await signer.sendTransaction({
      to: network.chainId === 100 ? web3AddressGnosis : web3AddressPolygon,
      value: ethers.utils.parseUnits(sendTokenAmount, 'ether').toHexString(),
    });

    const rc = await tx.wait();
    if (rc.status === 1) {
      tx.chainId = network.chainId;
      return tx;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export default sendTransaction;
