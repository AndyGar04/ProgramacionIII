module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'El nombre es obligatorio'
            }
        }
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: { 
                    msg: 'El precio debe ser un número'
                },
                min: {
                    args: [0],
                    msg: 'El precio no puede ser negativo'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: 'El stock no puede ser negativo'
                }
            }
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'productos',
        timestamps: false
    });

    return Producto;
};
