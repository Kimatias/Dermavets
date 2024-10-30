import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { FRONTEND_PORT } from "./config.js";

const app = express();
// Configuración avanzada de CORS
app.use(
    cors({
      origin: [FRONTEND_PORT], // Permite múltiples orígenes
      methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
      credentials: true, // Permitir cookies y headers de autenticación en las peticiones
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
        "Origin",
      ], // Lista completa de encabezados permitidos
      optionsSuccessStatus: 200, // Para manejar correctamente navegadores antiguos como IE
    })
  );
  
  app.disable("x-powered-by");
  
  // Middleware de registro de peticiones HTTP
  app.use(morgan("dev"));
  
  // Middleware para interpretar JSON en las peticiones
  app.use(express.json());
  
  // Middleware para manejar 

// Rutas de autenticación y tareas
app.use("/api", authRoutes);

export default app;
