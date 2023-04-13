const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:4200' : 'https://crew-ai.vercel.app';
