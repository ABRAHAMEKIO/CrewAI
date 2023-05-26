import Redis from 'ioredis';
import User from '../../db/models/user';
import CreditWalletProcessor from './creditWalletProcessor';
import { WalletProcessor } from './walletProcessor';
import { redisUrl } from '../../config';

export default class WalletFactory {
  static resolver(user: User): WalletProcessor {
    const redis = new Redis(redisUrl);
    return new CreditWalletProcessor(user, redis);
  }
}
