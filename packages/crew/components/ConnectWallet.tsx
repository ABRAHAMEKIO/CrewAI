import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
  useBalance,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useEffect } from 'react';

function ConnectWallet() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  // eslint-disable-next-line object-shorthand
  const balance = useBalance({ address: address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    try {
      const callbackUrl = '/';
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
      console.log({
        // eslint-disable-next-line object-shorthand
        address: address,
        balanceDecimals: balance.data.decimals,
        balanceFormatted: balance.data.formatted,
        balanceSymbol: balance.data.symbol,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!isConnected) {
          connect();
        } else {
          handleLogin();
        }
      }}
      type="button"
      className="bg-gray-900 text-white border rounded-lg px-[1.5rem] text-sm font-medium h-[2.5rem] sm:h-12 min-w-[117px]"
    >
      Connect Wallet
    </button>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default ConnectWallet;
