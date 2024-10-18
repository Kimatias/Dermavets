import app from "./app.js";
import { PORT } from "./config.js";

const startServer = () => {
  try {
    app.listen(PORT, () =>
      console.log(`🖥️  Servidor en 🌐 http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error de inicio:", error.message || error);
  }
};


startServer();
