// @ts-check
require('dotenv').config({ path: 'packages/crew/.env' });

module.exports = {
  url: process.env.NX_DATABASE_URL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
