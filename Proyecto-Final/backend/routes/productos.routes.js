const express = require('express');
const router = express.Router();
const producto_controler = require('../controllers/productos.controller');

router.get('/', producto_controler.getAll);
router.get('/:id', producto_controler.getOne);
router.post('/', producto_controler.create);
router.put('/:id', producto_controler.update);
router.delete('/:id', producto_controler.delete);

module.exports = router;
