import jwt from 'jsonwebtoken';
import { JWT_SECRET} from '../config.js';

// Middleware para verificar la autenticación del usuario
export const authRequired = (req, res, next) => {
  const { token } = req.cookies; // Extraemos el token de las cookies

  if (!token) {
    return res.status(401).json({ message: 'No se encontró el token, autorización denegada' });
  }

  try {
    // Verificamos el token de forma asíncrona
    const user = jwt.verify(token, JWT_SECRET);

    // Si el token es válido, guardamos la información del usuario en req.user
    req.user = user;

    return next(); // Pasamos el control al siguiente middleware o controlador
  } catch (error) {
    // Manejo de errores
    console.error('❌ Error en la verificación del token:', error); // Registro del error

    // Respuestas según el tipo de error
    switch (error.name) {
      case 'JsonWebTokenError':
        return res.status(403).json({ message: 'Token inválido' });
      case 'TokenExpiredError':
        return res.status(403).json({ message: 'Token expirado' });
      default:
        return res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
  }
};
