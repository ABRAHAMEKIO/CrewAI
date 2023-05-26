import Redis from 'ioredis';
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

  async release(credit: number): Promise<number> {
    return this.redis.incrby(this.key, credit);
  }

  async use(credit: number): Promise<boolean> {
    if ((await this.redis.decrby(this.key, credit)) <= -1) {
      await this.release(credit);
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

  async topUp(len: number): Promise<number> {
    return this.redis.incrby(this.key, len);
  }

  private async updateUserCredit() {
    const balance = await this.balance();
    await this.user.update({ credit: balance });
    await this.user.save();
  }
}

export default CreditWalletProcessor;
