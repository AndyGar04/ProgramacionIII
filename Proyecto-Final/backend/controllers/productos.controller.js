const Producto = require('../models/producto.model');

exports.getAll = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await Producto.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Producto.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
