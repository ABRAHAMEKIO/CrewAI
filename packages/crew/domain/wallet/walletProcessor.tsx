export interface WalletProcessor {
  release(amount: number): Promise<number>;

  use(amount: number): Promise<boolean>;

  balance(): Promise<number>;

  topUp(len: number): Promise<number>;
}
