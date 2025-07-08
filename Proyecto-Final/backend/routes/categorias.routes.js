const express = require('express');
const router = express.Router();
const categoria_controller = require('../controllers/categorias.controller');

router.get('/', categoria_controller.getAll);
router.post('/', categoria_controller.create);
router.put('/:id', categoria_controller.update);
router.delete('/:id', categoria_controller.delete);

module.exports = router;