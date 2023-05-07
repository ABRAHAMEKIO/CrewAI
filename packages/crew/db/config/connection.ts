import { Sequelize } from 'sequelize';

const sequelizeConnection = new Sequelize(
  process.env.NX_DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/crew',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelizeConnection;
