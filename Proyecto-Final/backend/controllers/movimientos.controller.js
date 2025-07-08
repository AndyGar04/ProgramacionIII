const { Movimiento, Producto } = require('../models');

module.exports = {
    async registrar(req, res) {
        try {
            const { tipo, cantidad, productoId } = req.body;

            if (!['entrada', 'salida'].includes(tipo)) {
                return res.status(400).json({ error: 'Tipo inválido. Debe ser entrada o salida' });
            }

            if (!Number.isInteger(cantidad) || cantidad <= 0) {
                return res.status(400).json({ error: 'Cantidad debe ser un número mayor que 0' });
            }

            const producto = await Producto.findByPk(productoId);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            if (tipo === 'salida' && producto.stock < cantidad) {
                return res.status(400).json({ error: 'Stock insuficiente para realizar la salida' });
            }

            const movimiento = await Movimiento.create({ tipo, cantidad, productoId });

            // Ajuste de stock
            if (tipo === 'entrada') {
                producto.stock += cantidad;
            } else {
                producto.stock -= cantidad;
            }
            await producto.save();

            res.status(201).json({ message: 'Movimiento registrado con éxito', movimiento });
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                error: 'Validación fallida',
                detalles: err.errors.map(e => e.message)
                });
            }
            res.status(500).json({ error: 'Error al registrar movimiento' });
        }
    },

    async listar(req, res) {
        try {
            const movimientos = await Movimiento.findAll({
                include: { model: Producto, as: 'producto', attributes: ['nombre'] },
                order: [['fecha', 'DESC']]
            });
            res.json(movimientos);
        } catch (err) {
            res.status(500).json({ error: 'Error al listar movimientos' });
        }
    }
};
