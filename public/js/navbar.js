// URL del backend para la verificación de token y cierre de sesión
const API_URL_NAVBAR = "http://localhost:3000/api";

// Función para verificar si el usuario está autenticado
async function isAuthenticated() {
  try {
    const response = await fetch(`${API_URL_NAVBAR}/verifyToken`, {
      method: "GET",
      credentials: "include",
    });

    return response.ok; // Retorna true si el usuario está autenticado
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    return false;
  }
}

// Función para cerrar sesión del usuario
async function logoutUser() {
  try {
    await fetch(`${API_URL_NAVBAR}/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login"; // Redirecciona tras cerrar sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

// Función para crear el componente del header
async function createHeaderComponent() {
  // Crear el contenedor principal del header
  const header = document.createElement("header");
  header.className = "header";

  // Contenido del header
  header.innerHTML = `
    <div class="up-nav-bar">
        <img id="menu-hamburguer" src="./assets/list.svg" alt="menu">
        <div class="vet-name">
            <img class="logo" src="./assets/Logo.svg" alt="logo-Dermavets">
            <h1>DermaVets</h1>
        </div>
        <div class="search">
            <input class="browser-bar" type="text" placeholder="¿Qué buscas para tu mascota?">
            <img id="lupa" src="./assets/search.svg" alt="search">
        </div>
        <div class="container-iconos" id="container-iconos">
            <a href="/Login.html"><img id="user" class="icono-header" src="./assets/person-fill.svg" alt="usuario"></a>
            <a href="/Login.html"><img id="carrito" class="icono-header" src="./assets/cart-shopping-solid.svg" alt="carrito"></a>
        </div>
    </div>
    <nav class="nav-bar">

        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/nosotros">Nosotros</a>
    </nav>
    <div class="mobile-menu inactive" id="mobile-menu">
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/nosotros">Nosotros</a>
        <a href="/login">Log In | Registro</a>

    </div>
  `;

  // Seleccionar el menú hamburguesa y el menú móvil
  const menuBurguer = header.querySelector("#menu-hamburguer");
  const mobileMenu = header.querySelector(".mobile-menu");

  // Evento para mostrar y ocultar el menú móvil
  menuBurguer.addEventListener("click", () => {
    mobileMenu.classList.toggle("inactive");
    mobileMenu.classList.toggle("animacion-menu");
  });

  // Verificar si el usuario está autenticado y modificar el header si es así
  const isLoggedIn = await isAuthenticated();
  const containerIconos = header.querySelector("#container-iconos");
  const mobileMenulogout = header.querySelector(".mobile-menu");

  if (isLoggedIn) {
    // Cambiar el icono de usuario y agregar un botón de logout
    containerIconos.innerHTML = `
      <a href="/user"><img id="user" class="icono-header" src="./assets/img/usuario/user-1.png" alt="usuario"></a>
      <button id="logout-button" class="icono-header"> <img id="logout" src="./assets/power.svg" alt=""></button>
      <a href="/carrito"><img id="carrito" class="icono-header" src="./assets/cart-shopping-solid.svg" alt="carrito"></a>
    `;

    mobileMenulogout.innerHTML = `
      <a href="/">Inicio</a>
      <a href="/productos">Productos</a>
      <a href="/nosotros">Nosotros</a>
      <a href="/login">Logout</a>
    `;

    // Agregar evento al botón de logout
    const logoutButton = containerIconos.querySelector("#logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", logoutUser);
    }
  }

  return header;
}

// Uso del componente en el contenedor con id "navbar-container"
const headerContainer = document.getElementById("navbar-container");

if (headerContainer) {
  createHeaderComponent()
    .then((headerComponent) => {
      headerContainer.appendChild(headerComponent);
    })
    .catch((error) => {
      console.error("Error al crear el componente del header:", error);
    });
} else {
  console.error("No se encontró el contenedor 'navbar-container'.");
}
