// Archivo: component.js

function createFooterComponent() {
  // Crear el contenedor principal del footer
  const footer = document.createElement("footer");

  // Contenido del footer
  footer.innerHTML = `
        <div class="container-redes">
            <div class="redes">
                <p>Nos puedes encontrar en</p>
                <div>
                    <a href="https://api.whatsapp.com/send?phone=573171834266" target="_blank">
                        <img src="./assets/Whatsapp.svg" alt="whatsApp">
                    </a>
                    <a href="https://www.instagram.com/dermavets1/" target="_blank">
                        <img src="./assets/Instagram.svg" alt="instagram">
                    </a>
                    <a href="https://web.facebook.com/profile.php?id=100081980144296&_rdc=2&_rdr" target="_blank">
                        <img src="./assets/Facebook.svg" alt="Facebook">
                    </a>
                </div>
            </div>
            <div class="vet-name">
                <img class="logo" src="./assets/Logo.svg" alt="logo-Dermavets">
                <h4>Dermavets</h4>
            </div>
        </div> 
        <p>Copyright © 2024 Dermavets | All rights reserved</p>
    `;

  return footer;
}

// Insertar el footer en el contenedor del footer en el DOM
const footerContainer = document.getElementById("footer-container"); // Cambia el id según tu HTML
const footerComponent = createFooterComponent();
footerContainer.appendChild(footerComponent);
