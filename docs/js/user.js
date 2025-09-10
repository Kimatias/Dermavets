// URL de la API
const API_URL_PROFILE = "http://localhost:3000/api/profile";

// Función para obtener datos de usuario
async function fetchUserProfile() {
  try {
    // Realizar la solicitud GET
    const response = await fetch(API_URL_PROFILE, {
      method: "GET",
      credentials: "include" // Incluye cookies de autenticación si es necesario
    });
    
    // Verificar que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error("Error al obtener el perfil de usuario");
    }
    
    // Convertir la respuesta a JSON
    const data = await response.json();
    
    // Extraer los datos necesarios
    const user = data.user[0];
    const nombreUsuario = user.usuario; // Suponiendo que este dato no viene en la respuesta, como lo especificaste
    const correo = user.correo_electronico;
    
    // Seleccionar el contenedor y mostrar los datos
    const contenedorUsuario = document.querySelector(".datos_usuario");
    if (contenedorUsuario) {
      contenedorUsuario.innerHTML = `
        <h1>${nombreUsuario}</h1>
        <p>${correo}</p>
      `;
    }
  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
  }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchUserProfile);
