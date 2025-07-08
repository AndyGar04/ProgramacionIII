module.exports = (sequelize, DataTypes) => {
    const Movimiento = sequelize.define('Movimiento', {
        tipo: {
            type: DataTypes.ENUM('entrada', 'salida'),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['entrada', 'salida']],
                    msg: 'El tipo debe sr entrada o salida'
                }
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { 
                min:{ 
                    args:[1],
                    msg: 'La cantidad debe ser mayor que 0'
                }
            }
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'movimientos',
        timestamps: false
    });

    return Movimiento;
};