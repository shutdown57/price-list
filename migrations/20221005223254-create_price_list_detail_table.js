'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'price_list_details',
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        vendor_id: {
          type: Sequelize.BIGINT
        },
        product_id: {
          type: Sequelize.STRING
        },
        price_list_id: {
          type: Sequelize.BIGINT
        },
        price: {
          type: Sequelize.INTEGER
        },
        currency: {
          type: Sequelize.STRING
        },
        quantity: {
          type: Sequelize.INTEGER
        },
        date: {
          type: Sequelize.DATE
        },
        deleted_at: {
          type: Sequelize.DATE
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('price_list_details')
  }
};
