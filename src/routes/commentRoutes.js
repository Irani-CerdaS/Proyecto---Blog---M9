const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Obtener comentarios de un post específico
router.get('/post/:postId', commentController.getCommentsByPost);

// Todas las rutas debajo de esto requerirán autenticación
router.use(requireAuth);

router.post('/', commentController.createComment);

module.exports = router;
