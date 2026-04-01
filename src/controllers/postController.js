const getPosts = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Noticias listadas (pendiente)', data: [] });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    res.status(200).json({ message: `Noticia ${req.params.id} (pendiente)` });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'Noticia creada exitosamente (pendiente)' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost
};
