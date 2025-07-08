'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('productos', {
      fields: ['categoriaId'],
      type: 'foreign key',
      name: 'fk_categoria', // nombre de la constraint
      references: {
        table: 'categorias',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('productos', 'fk_categoria');
  }
};
