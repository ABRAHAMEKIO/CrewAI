/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'prompt',
    };
    await queryInterface.addColumn('Prompts', 'modelType', options);
    await queryInterface.sequelize.query(
      'UPDATE "Prompts" SET "modelType" = \'midjourney\' WHERE "modelType" IS NULL;'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Prompts', 'modelType');
  },
};
