import { DataTypes, FloatDataType, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

export interface SubPromptsAttributes {
  id?: number;
  prompt?: string | null;
  imageUrl?: string | null;
  creatorAddress?: string | null;
  objectName?: string | null;
  objectNameIsUnique?: boolean | null;
  showPromptFee?: FloatDataType | null;
  maximumMint?: number | null;
  mintFee?: FloatDataType | null;
  ipfsUrl?: string | null;
  imageUrlIsUnique?: boolean | null;
  parentId?: number | null;
  extendedPrompt?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PromptAttributes {
  id?: number;
  prompt?: string | null;
  imageUrl?: string | null;
  creatorAddress?: string | null;
  objectName?: string | null;
  objectNameIsUnique?: boolean | null;
  showPromptFee?: FloatDataType | null;
  maximumMint?: number | null;
  mintFee?: FloatDataType | null;
  ipfsUrl?: string | null;
  imageUrlIsUnique?: boolean | null;
  parentId?: number | null;
  extendedPrompt?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  SubPrompts?: SubPromptsAttributes[];
}

export type PromptInput = Optional<PromptAttributes, 'id'>;
export type PromptOutput = Required<PromptAttributes>;

class Prompt
  extends Model<PromptAttributes, PromptInput>
  implements PromptAttributes
{
  public id!: number;

  public prompt!: string;

  public imageUrl!: string;

  public creatorAddress!: string;

  public objectName!: string;

  public objectNameIsUnique!: boolean;

  public showPromptFee!: FloatDataType;

  public maximumMint!: number;

  public mintFee!: FloatDataType;

  public ipfsUrl!: string;

  public imageUrlIsUnique!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public parentId: number;

  public extendedPrompt!: string;

  public readonly SubPrompts: SubPromptsAttributes[];
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
    parentId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    extendedPrompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

// include: [{ model: Prompt, as: 'SubPrompts' }],
Prompt.hasMany(Prompt, {
  sourceKey: 'id',
  foreignKey: 'parentId',
  as: 'SubPrompts',
});

export default Prompt;
