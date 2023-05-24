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
        allowNull: true,
        type: Sequelize.TEXT,
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      creatorAddress: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      objectName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      objectNameIsUnique: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      showPromptFee: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      maximumMint: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      mintFee: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      ipfsUrl: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      imageUrlIsUnique: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      extendedPrompt: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      modelType: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deploymentStatus: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      replicatemeGenId: {
        allowNull: true,
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
