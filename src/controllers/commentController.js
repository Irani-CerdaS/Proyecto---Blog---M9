const Comment = require('../models/Comment');
const News = require('../models/News');

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: newsId } = req.params;
    const userId = req.user.id; // Extraido del AuthMiddleware

    // Confirmar que la noticia exista
    const newsExists = await News.findByPk(newsId);
    if (!newsExists) {
      return res.status(404).json({ error: 'La noticia a comentar no existe' });
    }

    const comment = await Comment.create({
      text,
      newsId,
      userId
    });

    res.status(201).json({ message: 'Comentario agregado', comment });
  } catch (error) {
    console.error('Error creando comentario:', error);
    res.status(500).json({ error: 'Error del servidor al crear el comentario' });
  }
};

module.exports = {
  createComment
};
