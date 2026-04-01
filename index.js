const app = require('./src/server');
const sequelize = require('./src/database');

const User = require('./src/models/User');
const News = require('./src/models/News');
const Comment = require('./src/models/Comment');

// Relaciones
User.hasMany(News, { foreignKey: 'userId' });
News.belongsTo(User, { foreignKey: 'userId' });

News.hasMany(Comment, { foreignKey: 'newsId' });
Comment.belongsTo(News, { foreignKey: 'newsId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Autenticación con la base de datos exitosa.');

    // Sincronizar los modelos con sequelize.sync()
    await sequelize.sync({ force: false });
    console.log('Modelos de Sequelize sincronizados correctamente con las relaciones definidas.');

    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
};

start();
