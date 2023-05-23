/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PromptSeeders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prompt: {
        type: Sequelize.TEXT,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      creatorAddress: {
        type: Sequelize.TEXT,
      },
      objectName: {
        type: Sequelize.STRING,
      },
      objectNameIsUnique: {
        type: Sequelize.BOOLEAN,
      },
      showPromptFee: {
        type: Sequelize.FLOAT,
      },
      maximumMint: {
        type: Sequelize.INTEGER,
      },
      mintFee: {
        type: Sequelize.FLOAT,
      },
      ipfsUrl: {
        type: Sequelize.TEXT,
      },
      imageUrlIsUnique: {
        type: Sequelize.BOOLEAN,
      },
      extendedPrompt: {
        type: Sequelize.TEXT,
      },
      modelType: {
        type: Sequelize.STRING,
      },
      deploymentStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('PromptSeeders');
  },
};
