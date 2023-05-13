/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Webhooks', 'msg', 'prompt');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Webhooks', 'prompt', 'msg');
  },
};
