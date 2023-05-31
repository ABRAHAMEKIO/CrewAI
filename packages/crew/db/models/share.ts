import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/connection';

import User from './user';
import Prompt from './prompt';

export interface ShareAttributes {
  id?: number;
  code: string;
  creditStatus: string;
  creatorId?: number | null;
  promptId?: number | null;
}

export type ShareInput = Optional<ShareAttributes, 'id'>;

export const CreditStatus = {
  topUp: 'topUp',
  pending: 'pending',
};

class Share
  extends Model<ShareAttributes, ShareInput>
  implements ShareAttributes
{
  public id!: number;

  public code: string;

  public creditStatus: string;

  public creatorId: number;

  public promptId: number;
}

Share.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    creditStatus: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: CreditStatus.pending,
    },
    creatorId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    promptId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

Share.belongsTo(User, {
  foreignKey: 'creatorId',
  as: 'Creator',
});

Share.belongsTo(Prompt, {
  foreignKey: 'promptId',
});

export default Share;
