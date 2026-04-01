// const userModel = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
  try {
    // Lógica de registro pendiente de implementar
    res.status(201).json({ message: 'Usuario registrado exitosamente (pendiente)' });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // Lógica de login pendiente de implementar
    res.status(200).json({ message: 'Login exitoso (pendiente)' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
