const colores = {
  pink: "#ec4555",
  green: "#279ea0",
  greenLight: "#008000",
  greenDark: "#2a4a54",
  gray: "#808080",
  white: "#ffffff",
};

const messages = {
  passwordConfirmValid: "¡La contraseña es la misma!",
  passwordConfirmInalid: "¡La contraseña no es la misma!",
  passwordValid: "¡Contraseña válida!",
  passwordInvalid:
    "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.",
  nameValid: "¡Usuario válido!",
  nameInvalid: "El Usuario no es válido!",
  emailValid: "¡Email válido!",
  emailInvalid: "El Email no es válido!",
};

const display = document.querySelector("#main__container");
const formRegister = document.querySelector("#form__register");
const formLogin = document.querySelector("#form__login");

const spanTitleImg = document.querySelector(".img-title");
const imgCat = document.querySelector("#img-cat");
const imgDog = document.querySelector("#img-dog");

const iconPasswordRegister = document.querySelector("#register__icon-password");
const iconPasswordConfirmRegister = document.querySelector(
  "#register__icon-password-confirm"
);
const btnSubmitRegister = document.querySelector("#register__btn-submit");

const iconPasswordLogin = document.querySelector("#login__icon-password");
const btnSubmitLogin = document.querySelector("#login__btn-submit");
eventoBtn(false, "register");
eventoBtn(false, "login");

const clearSpan = document.querySelectorAll(".clear-span");
const clearInput = document.querySelectorAll(".clear-input");

let isOkPasswordRegister;
let isOkNameRegister;
let isOkEmailRegister;

let isOkPasswordLogin;
let isOkEmailLogin;

let isInRegister = true;
let isIconPasswordReActive = false;
let isIconPasswordConfirmReActive = false;
let isIconPasswordLoActive = false;

// CONFIRMA SI TODO FUE DIGITADO CORRECTAMENTE
function isAllGood(typeOfForm) {
  if (typeOfForm === "register") {
    eventoBtn(
      isInRegister
        ? isOkPasswordRegister && isOkNameRegister && isOkEmailRegister
        : isOkPasswordRegister && isOkEmailRegister,
      typeOfForm
    );
  } else if (typeOfForm === "login") {
    eventoBtn(isOkPasswordLogin && isOkEmailLogin, typeOfForm);
  }
}

// CONFIRMA SI LAS DOS CONTRASEÑAS SON IGUALES
function isPasswordEqual() {
  if (isInRegister) {
    const passwordConfirm = document.querySelector(
      "#register__password-confirm"
    ).value;

    const password = document.querySelector("#register__password").value;

    if (password == passwordConfirm) {
      isOkPasswordRegister = true;
      isAllGood("register");
    } else {
      isOkPasswordRegister = false;
      isAllGood("register");
    }
  }
}

// CONFIRMA EN TIEMPO REAL SI LA CONTRASEÑA DE CONFIRMACIÓN ES IGUAL A LA DIGITADA.
function passwordConfirmFunction() {
  if (isInRegister) {
    const passwordConfirm = document.querySelector(
      "#register__password-confirm"
    ).value;
    const password = document.querySelector("#register__password").value;
    const spanPasswordConfirm = document.querySelector(
      "#register__span-password-confirm"
    );

    if (password === passwordConfirm) {
      spanPasswordConfirm.textContent = messages.passwordConfirmValid;
      spanPasswordConfirm.style.color = colores.greenLight;

      isPasswordEqual();
    } else {
      spanPasswordConfirm.textContent = messages.passwordConfirmInalid;
      spanPasswordConfirm.style.color = colores.pink;

      isPasswordEqual();
    }
  }
}

// CONFIRMA EN TIEMPO REAL SI LA CONTRASEÑA CUMPLE CON PARAMETROS
function passwordFunction(typeOfForm) {
  if (typeOfForm === "register") {
    const password = document.querySelector("#register__password").value;
    const spanPasword = document.querySelector("#register__span-password");

    if (isInRegister) {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,}$/;

      if (passwordPattern.test(password)) {
        spanPasword.textContent = messages.passwordValid;
        spanPasword.style.color = colores.greenLight;
        passwordConfirmFunction();
      } else {
        spanPasword.textContent = messages.passwordInvalid;
        spanPasword.style.color = colores.pink;
        passwordConfirmFunction();
      }
    } else {
      if (password) {
        isOkPasswordRegister = true;
        isAllGood("register");
      } else {
        isOkPasswordRegister = false;
        isAllGood("register");
      }
    }
  }

  if (typeOfForm === "login") {
    const password = document.querySelector("#login__password").value;

    if (password.length >= 8) {
      isOkPasswordLogin = true;
      isAllGood("login");
    } else {
      isOkPasswordLogin = false;
      isAllGood("login");
    }
  }
}

// CONFIRMA EN TIEMPO REAL SI EL NOMBRE CUMPLE CON PARAMETROS
function nameFunction() {
  if (isInRegister) {
    const name = document.querySelector("#register__name").value;
    const namePattern = /^[a-zA-Z\s]{3,}$/;

    const spanName = document.querySelector("#register__span-name");

    if (namePattern.test(name)) {
      spanName.textContent = messages.nameValid;
      spanName.style.color = colores.greenLight;

      isOkNameRegister = true;
      isAllGood("register");
    } else {
      spanName.textContent = messages.nameInvalid;
      spanName.style.color = colores.pink;

      isOkNameRegister = false;
      isAllGood("register");
    }
  }
}

// CONFIRMA EN TIEMPO REAL SI EL EMAIL CUMPLE CON PARAMETROS
function emailFunction(typeOfForm) {
  if (typeOfForm === "register") {
    const email = document.querySelector("#register__email").value;
    if (isInRegister) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const spanEmail = document.querySelector("#register__span-email");

      if (emailPattern.test(email)) {
        spanEmail.textContent = messages.emailValid;
        spanEmail.style.color = colores.greenLight;

        isOkEmailRegister = true;
        isAllGood("register");
      } else {
        spanEmail.textContent = messages.emailInvalid;
        spanEmail.style.color = colores.pink;

        isOkEmailRegister = false;
        isAllGood("register");
      }
    } else {
      if (email) {
        isOkEmailRegister = true;
        isAllGood("register");
      } else {
        isOkEmailRegister = false;
        isAllGood("register");
      }
    }
  }

  if (typeOfForm === "login") {
    const email = document.querySelector("#login__email").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      isOkEmailLogin = true;
      isAllGood("login");
    } else {
      isOkEmailLogin = false;
      isAllGood("login");
    }
  }
}

function colorIconInput(bollean, typeOfPassword) {
  if (typeOfPassword == "password-register") {
    if (bollean) {
      iconPasswordRegister.classList.remove("bi-eye-slash-fill");
      iconPasswordRegister.classList.add("bi-eye-fill");
      iconPasswordRegister.style.color = colores.green;
    } else {
      iconPasswordRegister.classList.remove("bi-eye-fill");
      iconPasswordRegister.classList.add("bi-eye-slash-fill");
      iconPasswordRegister.style.color = colores.pink;
    }
  }
  if (typeOfPassword == "password-confirm-register") {
    if (bollean) {
      iconPasswordConfirmRegister.classList.remove("bi-eye-slash-fill");
      iconPasswordConfirmRegister.classList.add("bi-eye-fill");
      iconPasswordConfirmRegister.style.color = colores.green;
    } else {
      iconPasswordConfirmRegister.classList.remove("bi-eye-fill");
      iconPasswordConfirmRegister.classList.add("bi-eye-slash-fill");
      iconPasswordConfirmRegister.style.color = colores.pink;
    }
  }
  if (typeOfPassword == "password-login") {
    if (bollean) {
      iconPasswordLogin.classList.remove("bi-eye-slash-fill");
      iconPasswordLogin.classList.add("bi-eye-fill");
      iconPasswordLogin.style.color = colores.green;
    } else {
      iconPasswordLogin.classList.remove("bi-eye-fill");
      iconPasswordLogin.classList.add("bi-eye-slash-fill");
      iconPasswordLogin.style.color = colores.pink;
    }
  }
}

function iconActiveFunction(typeOfPassword) {
  if (typeOfPassword == "passwordRegister") {
    isIconPasswordReActive = isIconPasswordReActive ? false : true;
    if (isIconPasswordReActive) {
      document.querySelector("#register__password").type = "text";
      colorIconInput(true, "password-register");
    } else {
      document.querySelector("#register__password").type = "password";
      colorIconInput(false, "password-register");
    }
  }

  if (typeOfPassword == "passwordConfirmRegister") {
    isIconPasswordConfirmReActive = isIconPasswordConfirmReActive
      ? false
      : true;
    if (isIconPasswordConfirmReActive) {
      document.querySelector("#register__password-confirm").type = "text";
      colorIconInput(true, "password-confirm-register");
    } else {
      document.querySelector("#register__password-confirm").type = "password";
      colorIconInput(false, "password-confirm-register");
    }
  }

  if (typeOfPassword == "passwordLogin") {
    isIconPasswordLoActive = isIconPasswordLoActive ? false : true;
    if (isIconPasswordLoActive) {
      document.querySelector("#login__password").type = "text";
      colorIconInput(true, "password-login");
    } else {
      document.querySelector("#login__password").type = "password";
      colorIconInput(false, "password-login");
    }
  }
}

function eventoBtn(bollean, typeOfForm) {
  // REGISTER
  if (typeOfForm == "register") {
    if (bollean) {
      btnSubmitRegister.disabled = false;
      btnSubmitRegister.style.backgroundColor = colores.green;
      btnSubmitRegister.style.border = colores.green;

      btnSubmitRegister.addEventListener("mouseover", () => {
        btnSubmitRegister.style.backgroundColor = colores.greenDark;
        btnSubmitRegister.style.border = colores.greenDark;
      });

      btnSubmitRegister.addEventListener("mouseout", () => {
        btnSubmitRegister.style.backgroundColor = colores.green;
        btnSubmitRegister.style.border = colores.green;
      });
    } else {
      btnSubmitRegister.disabled = true;
      btnSubmitRegister.style.backgroundColor = colores.gray;
      btnSubmitRegister.style.border = colores.gray;

      btnSubmitRegister.addEventListener("mouseover", () => {
        btnSubmitRegister.style.backgroundColor = colores.gray;
        btnSubmitRegister.style.border = colores.gray;
      });

      btnSubmitRegister.addEventListener("mouseout", () => {
        btnSubmitRegister.style.backgroundColor = colores.gray;
        btnSubmitRegister.style.border = colores.gray;
      });
    }
  }
  // LOGIN
  if (typeOfForm == "login") {
    if (bollean) {
      btnSubmitLogin.disabled = false;
      btnSubmitLogin.style.backgroundColor = colores.green;
      btnSubmitLogin.style.border = colores.green;

      btnSubmitLogin.addEventListener("mouseover", () => {
        btnSubmitLogin.style.backgroundColor = colores.greenDark;
        btnSubmitLogin.style.border = colores.greenDark;
      });

      btnSubmitLogin.addEventListener("mouseout", () => {
        btnSubmitLogin.style.backgroundColor = colores.green;
        btnSubmitLogin.style.border = colores.green;
      });
    } else {
      btnSubmitLogin.disabled = true;
      btnSubmitLogin.style.backgroundColor = colores.gray;
      btnSubmitLogin.style.border = colores.gray;

      btnSubmitLogin.addEventListener("mouseover", () => {
        btnSubmitLogin.style.backgroundColor = colores.gray;
        btnSubmitLogin.style.border = colores.gray;
      });
    }
  }
}

function reseatElements() {
  display.style.opacity = 1;

  isOkPasswordRegister = false;
  isOkEmailRegister = false;
  isOkNameRegister = false;

  isOkPasswordLogin = false;
  isOkEmailLogin = false;

  isIconPasswordReActive = false;
  isIconPasswordConfirmReActive = false;
  isIconPasswordLoActive = false;

  document.querySelector("#login__password").type = "password";

  eventoBtn(false);

  colorIconInput(false, "password-register");
  colorIconInput(false, "password-confirm-register");
  colorIconInput(false, "password-login");

  window.scrollTo(0, 0);
}

// SELECCIÓN DESDE EL DOM Y ADDEVENTLISTENER
document.querySelector("#register__email").addEventListener("input", () => {
  emailFunction("register");
});
document.querySelector("#register__password").addEventListener("input", () => {
  passwordFunction("register");
});

document
  .querySelector("#register__name")
  .addEventListener("input", nameFunction);
document
  .querySelector("#register__password-confirm")
  .addEventListener("input", passwordConfirmFunction);

document.querySelector("#login__email").addEventListener("input", () => {
  emailFunction("login");
});
document.querySelector("#login__password").addEventListener("input", () => {
  passwordFunction("login");
});

iconPasswordRegister.addEventListener("click", () => {
  iconActiveFunction("passwordRegister");
});

iconPasswordConfirmRegister.addEventListener("click", () => {
  iconActiveFunction("passwordConfirmRegister");
});

iconPasswordLogin.addEventListener("click", () => {
  iconActiveFunction("passwordLogin");
});

// CAMBIA LOS ESTILOS DE LA PÁGINA PARA MOSTRAR EL REGISTRO
document.querySelector(".tab--1").addEventListener("click", () => {
  if (!isInRegister) {
    setTimeout(() => {
      display.style.opacity = 0;
      document.body.style.background =
        "linear-gradient(45deg, #279ea077, #ec455577)";
    }, 300);
    setTimeout(() => {
      eventoBtn(false);
      document.body.style.background =
        "linear-gradient(45deg, #279ea077, #ffffff)";
      display.style.flexDirection = "row-reverse";

      imgCat.style.display = "none";
      imgDog.style.display = "flex";

      imgCat.style.opacity = 0;
      imgDog.style.opacity = 1;

      spanTitleImg.style.color = colores.green;
      spanTitleImg.style.left = "unset";
      spanTitleImg.style.right = "5px";
      spanTitleImg.innerHTML = "SIGN UP";

      formRegister.classList.remove("hidden-form");
      formLogin.classList.add("hidden-form");

      clearSpan.forEach((element) => {
        element.innerHTML = "";
      });
      clearInput.forEach((element) => {
        element.value = "";
      });

      // SETEO DE VALORES
      isInRegister = true;
      reseatElements();
    }, 900);
  }
});

// CAMBIA LOS ESTILOS DE LA PÁGINA PARA MOSTRAR EL LOGIN
document.querySelector(".tab--2").addEventListener("click", () => {
  if (isInRegister) {
    setTimeout(() => {
      display.style.opacity = 0;
      document.body.style.background =
        "linear-gradient(220deg, #ec455577, #279ea077)";
    }, 300);
    setTimeout(() => {
      document.body.style.background =
        "linear-gradient(220deg, #ec455577, #ffffff)";
      display.style.flexDirection = "row";

      imgDog.style.display = "none";
      imgCat.style.display = "flex";

      imgCat.style.opacity = 1;
      imgDog.style.opacity = 0;

      spanTitleImg.style.color = colores.pink;
      spanTitleImg.style.left = "5px";
      spanTitleImg.style.right = "unset";
      spanTitleImg.innerHTML = "LOGIN";

      formLogin.classList.remove("hidden-form");
      formRegister.classList.add("hidden-form");

      clearSpan.forEach((element) => {
        element.innerHTML = "";
      });
      clearInput.forEach((element) => {
        element.value = "";
      });

      // SETEO DE VALORES
      isInRegister = false;
      reseatElements();
    }, 900);
  }
});

// SUBMIT FORMULARIOS

document.addEventListener("DOMContentLoaded", () => {
  async function handleRegister(e) {
    e.preventDefault();

    // Obtener y limpiar los valores de los inputs
    const username = document.querySelector("#register__name").value.trim();
    const email = document.querySelector("#register__email").value.trim();
    const password = document.querySelector("#register__password").value;
    const confirmPassword = document.querySelector(
      "#register__password-confirm"
    ).value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
        credentials: "include", // Esto permite enviar la cookie
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: errorData|| "Ocurrió un error inesperado",
        });
        return;
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: data.message || "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 2000, // Duración del mensaje en ms
      }).then(() => {
        // Redirigir a index.html después del mensaje
        window.location.href = "index.html";
      });
    } catch (error) {
      console.error("Error de conexión o servidor:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Intenta más tarde.",
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
  
    const email = document.querySelector("#login__email").value.trim();
    const password = document.querySelector("#login__password").value;
  
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Esto permite enviar la cookie
      });
  
      // Manejo de errores en la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: errorData.message || "Ocurrió un error inesperado",
        });
        return;
      }
  
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: data.message || "Bienvenido de nuevo",
        showConfirmButton: false,
        timer: 2000, // Duración del mensaje en ms
      }).then(() => {
        // Redirigir a index.html después del mensaje
        window.location.href = "index.html";
      });
  
    } catch (error) {
      console.error("Error de conexión o servidor:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Intenta más tarde.",
      });
    }
  }
  

  document
    .querySelector("#form__register")
    .addEventListener("submit", handleRegister);
  document
    .querySelector("#form__login")
    .addEventListener("submit", handleLogin);
});
