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
            <a href="/login"><img id="user" class="icono-header" src="./assets/person-fill.svg" alt="usuario"></a>
            <a href="/login"><img id="carrito" class="icono-header" src="./assets/cart-shopping-solid.svg" alt="carrito"></a>
        </div>
    </div>
    <nav class="nav-bar">
        <a href="/">Inicio</a>
        <a href="/public/products.html">Productos</a>
        <a href="/public/Nosotros.html">Nosotros</a>
    </nav>
    <div class="mobile-menu inactive">
        <a href="/public/index.html">Inicio</a>
        <a href="/public/products.html">Productos</a>
        <a href="/public/Nosotros.html">Nosotros</a>
        <a href="/login">Log In | Registro</a>
    </div>
  `;

  // Seleccionar el menú hamburguesa y el menú móvil
  const menuBurguer = header.querySelector("#menu-hamburguer");
  const mobileMenu = header.querySelector(".mobile-menu");

  // Evento para mostrar y ocultar el menú mobile
  menuBurguer.addEventListener("click", () => {
    mobileMenu.classList.toggle("inactive");
    mobileMenu.classList.toggle("animacion-menu");
  });

  // Verificar si el usuario está autenticado y modificar el header si es así
  const isLoggedIn = await isAuthenticated();
  const containerIconos = header.querySelector("#container-iconos");

  if (isLoggedIn) {
    // Cambiar el icono de usuario y agregar un botón de logout
    containerIconos.innerHTML = `
      <a href="/user"><img id="user" class="icono-header" src="./assets/img/usuario/user-1.png" alt="usuario"></a>
      <a href="/carrito"><img id="carrito" class="icono-header" src="./assets/cart-shopping-solid.svg" alt="carrito"></a>
    `;

  }

  return header;
}

// Uso del componente en el contenedor con id "navbar-container"
const headerContainer = document.getElementById("navbar-container");
createHeaderComponent().then((headerComponent) => {
  if (headerContainer) {
    headerContainer.appendChild(headerComponent);
  } else {
    console.error("No se encontró el contenedor 'navbar-container'.");
  }
});