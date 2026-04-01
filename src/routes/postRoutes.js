const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Rutas protegidas
router.post('/', requireAuth, postController.createPost);

module.exports = router;
