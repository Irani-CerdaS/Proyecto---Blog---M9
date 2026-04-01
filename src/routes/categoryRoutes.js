const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Ruta principal para listar categorías
router.get('/', categoryController.getCategories);

module.exports = router;
