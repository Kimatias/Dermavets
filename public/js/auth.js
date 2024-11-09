// auth.js

// Función para verificar si el usuario está autenticado
async function isAuthenticated() {
    try {
      // Solicita al backend la verificación del token
      const response = await fetch("http://localhost:3000/api/verifyToken", {
        method: "GET",
        credentials: "include", // Incluye las cookies en la solicitud
      });
  
      // Si la respuesta es exitosa (status 200), el usuario está autenticado
      return response.ok;
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      return false;
    }
  }
  
  // Función para redirigir al usuario si no está autenticado
  async function protectRoute() {
    const authenticated = await isAuthenticated();
  
    if (!authenticated) {
      // Redirige al usuario a la página de login si no está autenticado
      window.location.href = "/login";
    }
  }
  
  // Ejecuta protectRoute cuando la página protegida cargue
  document.addEventListener("DOMContentLoaded", protectRoute);
  