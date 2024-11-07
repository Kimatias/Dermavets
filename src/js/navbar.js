// Archivo: component.js

function createHeaderComponent() {
  // Crear el contenedor principal del header
  const header = document.createElement("header");
  header.className = "header";
  
  // Contenido del header
  header.innerHTML = `
      <div class="up-nav-bar">
          <img id="menu-hamburguer" src="../src/assets/list.svg" alt="">
          <div class="vet-name">
              <img class="logo" src="../src/assets/icons/Logo.svg" alt="logo-Dermavets">
              <h1>DermaVets</h1>
          </div>
          <div class="search">
              <input class="browser-bar" type="text" placeholder="¿Qué buscas para tu mascota?"><img id="lupa" src="../src/assets/search.svg" alt="">
          </div>
          <div class="container-iconos">
              <a href="/public/Login.html"><img id="user" class="icono-header" src="../src/assets/person-fill.svg" alt="icono_de_usuario"></a>
              <img id="carrito" class="icono-header" src="../src/assets/cart-shopping-solid.svg" alt="icono_de_carrito_compras">
          </div>
      </div>
      <nav class="nav-bar">
          <a href="/public/index.html">Inicio</a>
          <a href="/">Productos</a>
          <a href="/">Nosotros</a>
      </nav>
      <div class="mobile-menu inactive">
          <a href="/public/index.html">Inicio</a>
          <a href="/">Productos</a>
          <a href="/">Nosotros</a>
          <a href="/public/Login.html">Log In | Registro</a>
      </div>
  `;

  // Seleccionar el menú hamburguesa y el menú móvil
  const menuBurguer = header.querySelector("#menu-hamburguer");
  const mobileMenu = header.querySelector(".mobile-menu");

  // Función para mostrar y ocultar el menú mobile
  function toggleMobileMenu() {
    mobileMenu.classList.toggle("inactive");
    mobileMenu.classList.toggle("animacion-menu");
  }

  // Evento del menú hamburguesa
  menuBurguer.addEventListener("click", toggleMobileMenu);

  return header;
}

// Uso del componente en el contenedor con id "header-container"
const headerContainer = document.getElementById("navbar-container");
const headerComponent = createHeaderComponent();
headerContainer.appendChild(headerComponent);
