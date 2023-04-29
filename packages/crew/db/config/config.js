require('dotenv').config({ path: 'packages/crew/.env' });

module.exports = {
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
