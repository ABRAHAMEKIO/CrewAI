/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.STRING,
    };
    await queryInterface.addColumn('Webhooks', 'replicatemeGenId', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Webhooks', 'replicatemeGenId');
  },
};
