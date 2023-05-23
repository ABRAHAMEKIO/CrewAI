import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

export const ModelType = {
  midJourney: 'midjourney',
  openJourney: 'openjourney',
};

/**
 * 1. Import dari csv to table promptseeder
 * 2. Generate image from openjourney
 * 3. Upload to s3 by openjourney imageUrl
 * 4. Export to Prompt model
 */
export const DeploymentStatus = {
  created: 'created',
  generating: 'generating',
  uploading: 'uploading',
  fail: 'fail',
  published: 'published',
};

export interface PromptSeederAttributes {
  id?: number;
  prompt?: string | null;
  imageUrl?: string | null;
  creatorAddress?: string | null;
  objectName?: string | null;
  objectNameIsUnique?: boolean | null;
  showPromptFee?: number | null;
  maximumMint?: number | null;
  mintFee?: number | null;
  ipfsUrl?: string | null;
  imageUrlIsUnique?: boolean | null;
  parentId?: number | null;
  extendedPrompt?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  modelType?: string | null;
  deploymentStatus?: string | null;
}

export type PromptSeederInput = Optional<PromptSeederAttributes, 'id'>;
export type PromptSeederOutput = Required<PromptSeederAttributes>;

class PromptSeeder
  extends Model<PromptSeederAttributes, PromptSeederInput>
  implements PromptSeederAttributes
{
  public id!: number;

  public prompt!: string;

  public imageUrl!: string;

  public creatorAddress!: string;

  public objectName!: string;

  public objectNameIsUnique!: boolean;

  public showPromptFee!: number;

  public maximumMint!: number;

  public mintFee!: number;

  public ipfsUrl!: string;

  public imageUrlIsUnique!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public extendedPrompt!: string;

  public modelType!: string;

  public deploymentStatus!: string;
}

PromptSeeder.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    prompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    imageUrl: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    creatorAddress: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    objectName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    objectNameIsUnique: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    showPromptFee: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    maximumMint: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    mintFee: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    ipfsUrl: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    imageUrlIsUnique: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    extendedPrompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    modelType: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    deploymentStatus: {
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

export default PromptSeeder;
