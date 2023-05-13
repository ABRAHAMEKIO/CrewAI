/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Webhooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      socketId: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      step: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      promptId: {
        allowNull: true,
        defaultValue: null,
        after: 'imageUrlIsUnique',
        type: Sequelize.INTEGER,
      },
      msg: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Webhooks');
  },
};
