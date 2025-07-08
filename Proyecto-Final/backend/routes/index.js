const express = require('express');
const router = express.Router();

const movimientosRoutes = require('./movimientos.routes');
router.use('/movimientos', movimientosRoutes);

const productosRoutes = require('./productos.routes');
router.use('/productos', productosRoutes);

const categoriasRoutes = require('./categorias.routes');
router.use('/categorias', categoriasRoutes);


// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});


module.exports = router;
