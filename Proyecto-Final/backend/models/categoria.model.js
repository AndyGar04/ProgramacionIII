module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: 'El nombre de la categoría es obligatorio'}
            }
        },
        descripcion: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'categorias',
        timestamps: true
    });

    return Categoria;
};
