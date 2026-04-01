const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Sacar el token de la cabecera Authorization (Bearer <token>)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta token de autorización o formato incorrecto (Bearer token).' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'secretKeyFallback');
    req.user = decodificado; // Se inyecta info del usuario (id, username) en cada petición
    next();
  } catch (error) {
    console.error('Error verificando JWT:', error);
    return res.status(401).json({ error: 'Token inválido o ha expirado.' });
  }
};

module.exports = authMiddleware;
