import Redis from 'ioredis';
import User from '../../db/models/user';
import CreditWalletProcessor from './creditWalletProcessor';
import { WalletProcessor } from './walletProcessor';
import { redisUrl, dev } from '../../config';

export default class WalletFactory {
  static resolver(user: User): WalletProcessor {
    const options = dev ? {} : { family: 6 };
    const redis = new Redis(redisUrl, options);
    return new CreditWalletProcessor(user, redis);
  }
}
