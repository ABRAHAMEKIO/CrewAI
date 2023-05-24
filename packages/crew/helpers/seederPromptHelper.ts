import Replicate from 'replicate';
import PromptSeeder, { DeploymentStatus } from '../db/models/promptseeder';
import { openjourneyPredictionsVersion } from '../config';

const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;

export class SeederPromptHelper {
  private readonly replicate: any;

  constructor(replicate: any) {
    this.replicate = replicate;
  }

  async nextSeeder() {
    const nextSeeder = await PromptSeeder.findOne({
      where: { deploymentStatus: DeploymentStatus.created },
    });

    if (nextSeeder) {
      const prediction = await this.replicate.predictions.create({
        version: openjourneyPredictionsVersion,
        input: { prompt: nextSeeder.prompt },
        webhook: WEBHOOK_OVERRIDE,
        webhook_events_filter: ['completed'],
      });

      await nextSeeder.update({
        replicatemeGenId: prediction.id,
        deploymentStatus: DeploymentStatus.generating,
      });

      await nextSeeder.save();
    }
  }
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const instance = new SeederPromptHelper(replicate);

export default instance;
