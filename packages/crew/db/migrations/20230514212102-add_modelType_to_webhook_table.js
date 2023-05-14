/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.STRING,
    };
    await queryInterface.addColumn('Webhooks', 'modelType', options);
    await queryInterface.sequelize.query(
      'UPDATE "Webhooks" SET "modelType" = \'midjourney\' WHERE "modelType" IS NULL;'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Webhooks', 'modelType');
  },
};
