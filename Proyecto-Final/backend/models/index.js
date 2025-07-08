const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

// Cargar modelos
const Producto = require('./producto.model')(sequelize, DataTypes);
const Categoria = require('./categoria.model')(sequelize, DataTypes);
const Movimiento = require('./movimiento.model')(sequelize, DataTypes);

// Asociaciones
Categoria.hasMany(Producto, {
  foreignKey: 'categoriaId',
  as: 'productos'
});

Producto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

Producto.hasMany(Movimiento, {
  foreignKey: 'productoId',
  as: 'movimientos'
});

Movimiento.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
});

module.exports = {
  sequelize,
  Producto,
  Categoria,
  Movimiento
};
