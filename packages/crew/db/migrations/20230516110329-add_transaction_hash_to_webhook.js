/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.STRING,
    };
    await queryInterface.addColumn('Webhooks', 'transactionHash', options);
    await queryInterface.addColumn('Webhooks', 'creatorAddress', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Webhooks', 'transactionHash');
    await queryInterface.removeColumn('Webhooks', 'creatorAddress');
  },
};
