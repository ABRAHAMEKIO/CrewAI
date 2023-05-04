import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

interface UserAttributes {
  id?: number;
  username?: string;
  email?: string;
  interests?: string | null;
  occupation?: string | null;
  usage?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInput = Optional<UserAttributes, 'id'>;
export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;

  public username!: string;

  public email!: string;

  public interests!: string;

  public occupation!: string;

  public usage!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    interests: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    occupation: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    usage: {
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

export default User;