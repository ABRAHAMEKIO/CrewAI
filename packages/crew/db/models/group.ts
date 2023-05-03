import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelizeConnection from '../config/connection';
import User from './user';

interface GroupAttributes {
  id?: string;
  name?: string;
  prompt?: Text;
  masterKey?: string;
  parametersFormPrompt?: Text;
  userId?: User;

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

  public parametersFormPrompt!: Text;

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
    parametersFormPrompt: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

Group.belongsTo(User, { foreignKey: 'userId' });

export default Group;
