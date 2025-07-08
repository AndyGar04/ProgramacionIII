const {Producto, Categoria} = require('../models');

exports.getAll = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: {model: Categoria, as: 'categoria', attributes: ['id','nombre']}
        });
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoriaId } = req.body;
        // 🔍 Verificar que la categoría exista
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(400).json({ error: 'Categoría no existente' });
        }

        const producto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
            categoriaId
        });
        res.status(201).json(producto);

    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validación fallida',
                detalles: err.errors.map(e => e.message)
            });
        }
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

exports.update = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await Producto.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validación fallida',
                detalles: err.errors.map(e => e.message)
            });
        }
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

exports.delete = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await Producto.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id, {
        include: [{ model: Categoria, as: 'categoria' }],
        });

        if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};