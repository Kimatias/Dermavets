import express from "express";
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import { handleNotFound } from "./src/middlewares/validateEndpoints.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable("x-powered-by");

app.use(cors({
  origin: "http://localhost:3000", // Dominio del frontend
  credentials: true, // Permitir credenciales (cookies)
}));

// Middleware para analizar cookies
app.use(cookieParser());

// Middleware de registro de peticiones HTTP
app.use(morgan("dev"));

// Middleware para interpretar JSON en las peticiones
app.use(express.json());

// Unificar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Login.html"));
});
app.get("/cita", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cita.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Carrito.html"));
});
app.get("/nosotros", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Nosotros.html"));
});
app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});
app.get("/recordarContraseña", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recoverPassword.html"));
});
app.get("/actualizarContraseña", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recoverPassword.html"));
});
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});


// Rutas de autenticación y tareas
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use(handleNotFound);

export default app;
