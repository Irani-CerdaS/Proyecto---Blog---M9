const app = require('./src/server');
const sequelize = require('./src/database');

const start = async () => {
  try {
    // Autenticar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Autenticación con la base de datos exitosa.');

    // Sincronizar los modelos
    await sequelize.sync({ force: false });
    console.log('Modelos de Sequelize sincronizados correctamente.');

    // Poner el servidor a escuchar
    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
};

start();
