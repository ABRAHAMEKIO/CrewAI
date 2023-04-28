import * as process from 'process';

const dev = process.env.NODE_ENV !== 'production';

// TODO: make it environment variable
export const server = dev ? 'http://localhost:4200' : 'https://crew-ai.fly.dev';
export const wsServer = dev ? 'ws://localhost:4200' : 'wss://crew-ai.fly.dev';
export const databaseUrl = process.env.DATABASE_URL;
