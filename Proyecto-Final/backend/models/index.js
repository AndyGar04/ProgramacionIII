const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.DEBUG === 'true' ? console.log : false,
  }
);

// Prueba de conexión
sequelize.authenticate()
  .then(() => console.log('🔗 Conectado a PostgreSQL con Sequelize'))
  .catch((err) => console.error('❌ Error de conexión:', err));

module.exports = { sequelize };
