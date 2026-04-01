const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware estático (apunta a la carpeta public en la raíz)
app.use(express.static(path.join(__dirname, '../public')));

// Configurar rutas principales

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Middleware de manejo de errores globales
app.use(errorHandler);

module.exports = app;
