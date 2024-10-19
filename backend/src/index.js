import app from "./app.js";
import { PORT } from "./config.js";
import { verifyDBConnection } from "./database/connection.js";

const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    await verifyDBConnection();

    // Iniciar servidor si la conexión es exitosa
    app.listen(PORT, () =>
      console.log(`🖥️  Servidor en 🌐 http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message || error);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
};

startServer();
