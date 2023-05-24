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
export const web3PromptPrice = process.env.WEB3_PROMPT_PRICE || '0.01';
export const web3AddressGnosis =
  process.env.WEB3_ADDRESS_GNOSIS ||
  '0xd54E6A61332657eCac42146f226e44C6166C86bE';
export const web3AddressPolygon =
  process.env.WEB3_ADDRESS_POLYGON ||
  '0x2ab35CA8EFEbD8663B709160ACAcb160692dBfB1';
export const openjourneyPredictionsVersion =
  '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb';

// disabled for now because lots of bugs
export const isAutocompleteEnabled = false;
