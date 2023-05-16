import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

import Prompt from './prompt';

export interface WebhookAttributes {
  id?: number;
  socketId?: string | null;
  step?: string | null;
  promptId?: number | null;
  prompt?: string | null;
  extendedPrompt?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  modelType?: string | null;
  replicatemeGenId?: string | null;
  transactionHash?: string;
  creatorAddress?: string;
}

// eslint-disable-next-line no-shadow
export enum WebhookStep {
  create = 'CREATE',
  hook = 'HOOK',
  hookButton = 'HOOK_BUTTON',
}

export type WebhookInput = Optional<WebhookAttributes, 'id'>;

class Webhook
  extends Model<WebhookAttributes, WebhookInput>
  implements WebhookAttributes
{
  public id!: number;

  public socketId: string;

  public step: string;

  public promptId: number;

  public prompt: string;

  public extendedPrompt: string;

  public modelType: string;

  public replicatemeGenId: string;

  public transactionHash: string;

  public creatorAddress: string;
}

Webhook.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    socketId: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    step: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: WebhookStep.create.toString(),
    },
    promptId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    prompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    extendedPrompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    modelType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    replicatemeGenId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    transactionHash: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    creatorAddress: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

Webhook.belongsTo(Prompt, {
  foreignKey: 'promptId',
});

export default Webhook;
