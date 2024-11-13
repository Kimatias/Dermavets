const bcrypt = require('bcrypt');

async function restablecerContrasena(token, nuevaContrasena) {
    // Verificar token en la base de datos y obtener el usuario
    const usuario = await obtenerUsuarioPorToken(token);
    if (!usuario) throw new Error("Token no válido o expirado");

    // Hashear la nueva contraseña y actualizarla
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    usuario.password = hashedPassword;
    await usuario.save();

    // Eliminar o invalidar el token
    await eliminarToken(token);
}