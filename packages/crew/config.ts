const dev = process.env.NODE_ENV !== 'production';

// TODO: make it environment variable (2  :))
export const server = dev
  ? 'http://localhost:4200'
  : 'https://hologram-ai.fly.dev';
export const wsServer = dev
  ? 'ws://localhost:4200'
  : 'wss://hologram-ai.fly.dev';
export const awsId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
export const awsBucket = process.env.AWS_BUCKET;
export const awsRegion = process.env.AWS_REGION;
export const mixPanelId = process.env.NEXT_PUBLIC_MIXPANEL_ID;
export const magicLinkPk = process.env.NEXT_PUBLIC_MAGIC_LINK_PK;
export const rpcGatewayFmKey = process.env.RPC_GATEWAY_FM_URL;

// disabled for now because lots of bugs
export const isAutocompleteEnabled = false;
