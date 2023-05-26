export interface WalletProcessor {
  topUp(amount: number): Promise<number>;

  use(amount: number): Promise<boolean>;

  balance(): Promise<number>;
}
