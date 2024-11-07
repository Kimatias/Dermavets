
export const validateSchema = (Schema) => (req, res, next) => {
  try {
    // Validamos el cuerpo de la solicitud usando el esquema proporcionado
    Schema.parse(req.body);

    // Si la validación es exitosa, continuamos con el siguiente middleware/controlador
    return next();
  } catch (error) {
    // Registro del error de validación en la consola para fines de depuración
    console.error("❌ Error de validación:", error.errors);

    // En caso de error, devolvemos una respuesta con código 400 y los mensajes de error
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Errores de validación",
      errors: error.errors.map(({ message }) => message), // Extraemos solo los mensajes de error
    });
  }
};
