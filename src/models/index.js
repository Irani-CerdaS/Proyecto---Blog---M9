const sequelize = require('../database');
const User = require('./User');
const Category = require('./Category');
const News = require('./News');
const Comment = require('./Comment');

// Asociaciones

// Un usuario tiene muchas noticias
User.hasMany(News, { foreignKey: 'userId' });
News.belongsTo(User, { foreignKey: 'userId' });

// Una categoría tiene muchas noticias
Category.hasMany(News, { foreignKey: 'categoryId' });
News.belongsTo(Category, { foreignKey: 'categoryId' });

// Una noticia tiene muchos comentarios
News.hasMany(Comment, { foreignKey: 'newsId' });
Comment.belongsTo(News, { foreignKey: 'newsId' });

// Un usuario tiene muchos comentarios
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Category,
  News,
  Comment
};
