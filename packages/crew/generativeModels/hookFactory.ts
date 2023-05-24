import Replicate from 'replicate';
import { HookProcessor } from './hookProcessor';
import MidjourneyHookProcessor from './midjourneyHookProcessor';
import OpenjourneyHookProcessor from './openjourneyHookProcessor';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

type MidjourneyHook = { buttonMessageId: string; ref: string };

type OpenjourneyHook = {
  id: string;
  output: string[];
  input: { prompt: string };
};

class HookFactory {
  static resolveHookProcessor(
    webhookReq: MidjourneyHook | OpenjourneyHook,
    io?: any
  ): HookProcessor {
    if ('buttonMessageId' in webhookReq) {
      return new MidjourneyHookProcessor();
    }
    return new OpenjourneyHookProcessor(io, replicate);
  }
}

export default HookFactory;
