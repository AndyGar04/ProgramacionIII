const express = require('express');
const router = express.Router();
const movimientosController = require('../controllers/movimientos.controller');

router.post('/', movimientosController.registrar);
router.get('/', movimientosController.listar);

module.exports = router;
