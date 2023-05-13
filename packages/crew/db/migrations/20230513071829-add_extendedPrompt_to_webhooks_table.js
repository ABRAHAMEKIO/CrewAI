/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.TEXT,
      after: 'promptId',
    };
    await queryInterface.addColumn('Webhooks', 'extendedPrompt', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Webhooks', 'extendedPrompt');
  },
};
