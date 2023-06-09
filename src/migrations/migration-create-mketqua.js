'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ketQuas', {
      maKetqua: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      maLich: {
        type: Sequelize.STRING,
        references: {
          model: 'lichThiDaus',
          key: 'maLich'
        }
      },
      soBanThangDoi1: {
        type: Sequelize.INTEGER
      },
      soBanThangDoi2: {
        type: Sequelize.INTEGER
      },
      soTheVang: {
        type: Sequelize.INTEGER
      },
      soTheDo: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ketQuas');
  }
};