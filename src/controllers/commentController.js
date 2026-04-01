const getCommentsByPost = async (req, res, next) => {
  try {
    res.status(200).json({ message: `Comentarios de la noticia ${req.params.postId} (pendiente)`, data: [] });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'Comentario creado (pendiente)' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsByPost,
  createComment
};
