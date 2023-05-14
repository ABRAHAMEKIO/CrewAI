import { HookProcessor } from './hookProcessor';
import MidjourneyHookProcessor from './midjourneyHookProcessor';
import OpenjourneyHookProcessor from './openjourneyHookProcessor';

type MidjourneyHook = { buttonMessageId: string; ref: string };

type OpenjourneyHook = { id: string; output: string[] };

class HookFactory {
  static resolveHookProcessor(
    webhookReq: MidjourneyHook | OpenjourneyHook,
    io?: any
  ): HookProcessor {
    if ('buttonMessageId' in webhookReq) {
      return new MidjourneyHookProcessor();
    }
    return new OpenjourneyHookProcessor(io);
  }
}

export default HookFactory;
