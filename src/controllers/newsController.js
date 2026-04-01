const News = require('../models/News');
const Comment = require('../models/Comment');
const User = require('../models/User');

const createNews = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    const userId = req.user.id; // Extraido del token por el authMiddleware

    const news = await News.create({
      title,
      content,
      category,
      image,
      userId
    });

    res.status(201).json({ message: 'Noticia creada con éxito', news });
  } catch (error) {
    console.error('Error creando noticia:', error);
    res.status(500).json({ error: 'Error del servidor al crear la noticia' });
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [['createdAt', 'DESC']], // Ordenadas desde la última noticia hacia atrás en el tiempo
      include: [{ model: User, attributes: ['username', 'email'] }]
    });
    res.status(200).json(news);
  } catch (error) {
    console.error('Error listando noticias:', error);
    res.status(500).json({ error: 'Error del servidor al listar' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await News.findByPk(id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    if (!newsItem) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error buscando noticia:', error);
    res.status(500).json({ error: 'Error del servidor al buscar' });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById
};
