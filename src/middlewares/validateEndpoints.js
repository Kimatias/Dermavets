// Middleware para manejar rutas no encontradas
export const handleNotFound = (req, res, next) => {
  // Registro de la ruta no encontrada en consola
  console.error(`❌ Ruta no encontrada: ${req.originalUrl}`);

  // Respuesta con estado 404 y mensaje
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Endpoint no encontrado",
    requestedUrl: req.originalUrl, // Incluimos la URL solicitada para referencia
  });
};
