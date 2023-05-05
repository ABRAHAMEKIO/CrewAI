import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import sequelizeConnection from '../config/connection';

interface GroupAttributes {
  id?: string;
  name?: string;
  prompt?: Text;
  masterKey?: string;
  parametersFromPrompt?: Json;
  imageUrl?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type GroupInput = Optional<GroupAttributes, 'id'>;
export type GroupOutput = Required<GroupAttributes>;

class Group
  extends Model<GroupAttributes, GroupInput>
  implements GroupAttributes
{
  public id!: string;

  public name!: string;

  public prompt!: Text;

  public masterKey!: string;

  public parametersFromPrompt!: Json;

  public imageUrl!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Group.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    prompt: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    masterKey: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    parametersFromPrompt: {
      allowNull: true,
      type: DataTypes.JSON,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

export default Group;
