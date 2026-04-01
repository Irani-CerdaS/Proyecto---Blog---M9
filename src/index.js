const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middlewares globales
app.use(cors());
app.use(express.json());

// Configurar rutas principales
app.use('/api', routes);

// Middleware de manejo de errores globales
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
