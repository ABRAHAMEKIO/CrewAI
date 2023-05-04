// @ts-check
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      type: Sequelize.STRING,
      unique: true,
      after: 'usage',
    };
    await queryInterface.addColumn('Users', 'issuer', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'issuer');
  },
};
