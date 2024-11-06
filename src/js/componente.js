// Archivo: component.js

function createInfoCard(title, description, buttonText) {
    // Crea el elemento contenedor principal
    const card = document.createElement("div");
    card.className = "info-card";
    card.style.border = "1px solid #ccc";
    card.style.padding = "16px";
    card.style.borderRadius = "8px";
    card.style.width = "200px";
    card.style.marginBottom = "16px";
    card.style.textAlign = "center";
    
    // Crea el título de la tarjeta
    const cardTitle = document.createElement("h3");
    cardTitle.innerText = title;
    card.appendChild(cardTitle);
  
    // Crea la descripción de la tarjeta
    const cardDescription = document.createElement("p");
    cardDescription.innerText = description;
    card.appendChild(cardDescription);
  
    // Crea el botón de la tarjeta
    const cardButton = document.createElement("button");
    cardButton.innerText = buttonText;
    cardButton.style.padding = "8px 12px";
    cardButton.style.borderRadius = "4px";
    cardButton.style.cursor = "pointer";
    
    // Evento del botón
    cardButton.addEventListener("click", () => {
      alert(`Has hecho clic en "${title}"`);
    });
  
    card.appendChild(cardButton);
  
    return card;
  }
  
  // Agrega el componente al DOM
  const app = document.getElementById("app");
  const card1 = createInfoCard("Componente 1", "Esta es la tarjeta número 1", "Ver más");
  const card2 = createInfoCard("Componente 2", "Esta es la tarjeta número 2", "Ver más");
  
  app.appendChild(card1);
  app.appendChild(card2);
  