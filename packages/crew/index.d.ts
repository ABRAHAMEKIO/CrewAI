/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}
export { Header2 } from './components/v1/Heading';
export { Header1 } from './components/v1/Heading';

declare global {
  interface Window {
    ethereum: any;
    ethersProvider: any;
  }
}
