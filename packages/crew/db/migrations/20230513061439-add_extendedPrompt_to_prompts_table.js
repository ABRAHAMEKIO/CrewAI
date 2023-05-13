/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.TEXT,
      after: 'parentId',
    };
    await queryInterface.addColumn('Prompts', 'extendedPrompt', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Prompts', 'extendedPrompt');
  },
};
