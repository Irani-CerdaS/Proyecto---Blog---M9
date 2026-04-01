const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas Públicas de Noticias
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Rutas Protegidas de Noticias
router.post('/', authMiddleware, newsController.createNews);

// Rutas Protegidas de Comentarios (anidadas en la noticia)
router.post('/:id/comments', authMiddleware, commentController.createComment);

module.exports = router;
