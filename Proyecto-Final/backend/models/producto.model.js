const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
    },
    }, {
    tableName: 'productos',
    timestamps: false,
});

module.exports = Producto;
