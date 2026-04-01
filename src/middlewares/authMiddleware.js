const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proveído o formato inválido' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adjuntar la información del usuario al request
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { requireAuth };
