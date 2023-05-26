import RedisCommander from 'ioredis/built/utils/RedisCommander';
import User from '../../db/models/user';
import { WalletProcessor } from './walletProcessor';

// Race Condition handle using redis
class CreditWalletProcessor implements WalletProcessor {
  private readonly redis: RedisCommander;

  private readonly user: User;

  private readonly key: string;

  constructor(user: User, redis: RedisCommander) {
    this.redis = redis;
    this.key = `limit_${user.id}`;
    this.user = user;
  }

  async topUp(amount: number): Promise<number> {
    const result = await this.redis.incrby(this.key, amount);
    await this.updateUserCredit();
    return result;
  }

  async use(credit: number): Promise<boolean> {
    if ((await this.redis.decrby(this.key, credit)) <= -1) {
      await this.topUp(credit);
      await this.updateUserCredit();
      return false;
    }
    await this.updateUserCredit();
    return true;
  }

  async balance(): Promise<number> {
    const balance = await this.redis.get(this.key);
    return parseInt(balance, 10);
  }

  private async updateUserCredit(): Promise<void> {
    const balance = await this.balance();
    await this.user.update({ credit: balance });
    await this.user.save();
  }
}

export default CreditWalletProcessor;
