const dev = process.env.NODE_ENV !== 'production';

// TODO: make it environment variable
export const server = dev ? 'http://localhost:4200' : 'https://crew-ai.fly.dev';
export const wsServer = dev ? 'ws://localhost:4200' : 'wss://crew-ai.fly.dev';
export const awsId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
export const awsBucket = process.env.AWS_BUCKET;
export const awsRegion = process.env.AWS_REGION;
