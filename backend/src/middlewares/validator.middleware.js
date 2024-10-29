/**
 * Middleware para validar el cuerpo de la solicitud HTTP usando un esquema de Zod.
 *
 * Este middleware utiliza un esquema definido con Zod para validar los datos enviados en el cuerpo
 * de la solicitud. Si la validación es exitosa, la solicitud se procesa normalmente,
 * de lo contrario, devuelve una respuesta con código de estado 400 y un mensaje descriptivo de los errores.
 *
 * @function
 * @param {z.ZodType} Schema - El esquema Zod utilizado para validar el cuerpo de la solicitud.
 *
 * @returns {import("express").Handler} Middleware de Express que valida el cuerpo de la solicitud.
 *
 * @throws {Object} Si la validación falla, retorna un código de estado 400 con un objeto JSON
 * que contiene detalles sobre los errores de validación.
 *
 *
 */
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
