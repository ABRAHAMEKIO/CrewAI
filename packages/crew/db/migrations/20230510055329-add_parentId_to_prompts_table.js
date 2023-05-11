// @ts-check
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: null,
      after: 'imageUrlIsUnique',
    };
    await queryInterface.addColumn('Prompts', 'parentId', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Prompts', 'parentId');
  },
};
