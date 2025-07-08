const { Categoria } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const categoria = await Categoria.create({ nombre, descripcion });
        res.status(201).json(categoria);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validación fallida',
            detalles: err.errors.map(e => e.message)
        });
        }
        res.status(500).json({ error: 'Error al crear categoría' });
    }
};

exports.update = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        await categoria.update(req.body);
        res.json({ message: 'Categoría actualizada' });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validación fallida',
            detalles: err.errors.map(e => e.message)
        });
        }
        res.status(500).json({ error: 'Error al actualizar categoría' });
    }
};

exports.delete = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        await categoria.destroy();
        res.json({ message: 'Categoría eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
