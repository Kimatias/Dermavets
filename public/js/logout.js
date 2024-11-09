  // Agregar evento al botón de logout
  const logoutButton = containerIconos.querySelector("#logout-button");
  logoutButton.addEventListener("click", async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
  });