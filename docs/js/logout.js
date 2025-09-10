   

  const API_URL_LOGOUT = "http://localhost:3000/api";

  async function logoutUser() {
    try {
        const response = await fetch(`${API_URL_LOGOUT}/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }
  
      window.location.assign("/login"); // Redirecciona tras cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al intentar cerrar sesión. Por favor, inténtalo de nuevo.");
    }
  }
  
  // Asociamos el evento a un botón con el ID "logoutButton" (ajústalo al ID real)
  document.getElementById("logoutButton").addEventListener("click", logoutUser);