import { DataTypes, FloatDataType, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

interface PromptAttributes {
  id?: number;
  prompt?: Text | null;
  imageUrl?: Text | null;
  creatorAddress?: Text | null;
  objectName?: string | null;
  objectNameIsUnique?: boolean | null;
  showPromptFee?: FloatDataType | null;
  maximumMint?: number | null;
  mintFee?: FloatDataType | null;
  ipfsUrl?: Text | null;
  imageUrlIsUnique?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PromptInput = Optional<PromptAttributes, 'id'>;
export type PromptOutput = Required<PromptAttributes>;

class Prompt
  extends Model<PromptAttributes, PromptInput>
  implements PromptAttributes
{
  public id!: number;

  public prompt!: Text;

  public imageUrl!: Text;

  public creatorAddress!: Text;

  public objectName!: string;

  public objectNameIsUnique!: boolean;

  public showPromptFee!: FloatDataType;

  public maximumMint!: number;

  public mintFee!: FloatDataType;

  public ipfsUrl!: Text;

  public imageUrlIsUnique!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Prompt.init(
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
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

export default Prompt;
