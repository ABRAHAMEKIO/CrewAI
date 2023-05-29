/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      defaultValue: 0,
      allowNull: true,
      type: Sequelize.INTEGER,
    };
    await queryInterface.addColumn('Users', 'credit', options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'credit');
  },
};
