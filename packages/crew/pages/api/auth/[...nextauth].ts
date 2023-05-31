import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { Magic } from '@magic-sdk/admin';
import User from '../../../db/models/user';
import WalletFactory from '../../../domain/wallet/walletFactory';

const creditFee = 3;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'magic',
      name: 'Magic Link',
      credentials: {
        didToken: { label: 'DID Token', type: 'text' },
      },
      async authorize(credentials) {
        const magic = new Magic(process.env.MAGIC_LINK_SECRET_KEY);

        try {
          // validate magic DID token
          magic.token.validate(credentials.didToken);

          // fetch user metadata
          const metadata = await magic.users.getMetadataByToken(
            credentials.didToken
          );

          if (metadata) {
            const user = await User.findOne({
              where: { issuer: metadata.issuer },
            });

            if (user) {
              return {
                id: user.id.toString(),
                email: user.email,
              };
            }

            const newUser = await User.create({
              issuer: metadata.issuer,
              email: metadata.email,
            });

            if (newUser) {
              const wallet = WalletFactory.resolver(newUser);
              await wallet.topUp(creditFee);
              return {
                id: newUser.id.toString(),
                email: newUser.email,
              };
            }
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || '{}')
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result) {
            return {
              id: siwe.address,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    ...authOptions.providers,
  ];

  const isDefaultSigninPage =
    req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  // eslint-disable-next-line no-return-await
  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        // eslint-disable-next-line no-param-reassign
        session.address = token.sub;
        // eslint-disable-next-line no-param-reassign
        session.user.name = token.sub;
        // eslint-disable-next-line no-param-reassign
        session.user.image = 'https://www.fillmurray.com/128/128';
        return session;
      },
    },
  });
}
