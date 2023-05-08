import { serialize } from 'cookie';

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export const setTokenCookie = (res, token) => {
  const cookie = serialize('token', token, {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
};
