const display = document.querySelector('#main__container');
const form = document.querySelector('#form');

const spanTitleImg = document.querySelector('.img-title');
const imgCat = document.querySelector('#img-cat');
const imgDog = document.querySelector('#img-dog');

const elementsRegister = document.querySelectorAll('.form-registrar');
const clearElementes = document.querySelectorAll('.clear');


let isOkPassword;
let isOkName;
let isOkEmail;

let isInRegister = true;

const btnSubmit = document.querySelector('#register__btn-submit');
btnSubmit.disabled = true;
btnSubmit.style.backgroundColor = 'grey';

// CONFIRMA SI TODO FUE DIGITADO CORRECTAMENTE
function isAllGood() {
    if (isInRegister) {
        if (isOkPassword && isOkName && isOkEmail) {
            btnSubmit.disabled = false;
            btnSubmit.style.backgroundColor = '#279ea0';
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.backgroundColor = 'grey';
        }
    } else {
        if (isOkPassword && isOkEmail) {
            btnSubmit.disabled = false;
            btnSubmit.style.backgroundColor = '#279ea0';
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.backgroundColor = 'grey';
        }
    }

}

// CONFIRMA SI LAS DOS CONTRASEÑAS SON IGUALES
function isPasswordIqual() {
    if (isInRegister) {
        const passwordConfirm = document.querySelector('#form__password-confirm').value;

        const password = document.querySelector('#form__password').value;

        if (password == passwordConfirm) {
            isOkPassword = true;
            isAllGood();
        } else {
            isOkPassword = false;
            isAllGood();
        }
    }
}

// CONFIRMA EN TIEMPO REAL SI LA CONTRASEÑA DE CONFIRMACIÓN ES IGUAL A LA DIGITADA.
function passwordConfirmFunction() {
    if (isInRegister) {
        const passwordConfirm = document.querySelector('#form__password-confirm').value;
        const password = document.querySelector('#form__password').value;
        const spanPasswordConfirm = document.querySelector('#span-password-confirm');


        if (password === passwordConfirm) {
            spanPasswordConfirm.textContent = 'La contraseña es la misma!';
            spanPasswordConfirm.style.color = 'green';

            isPasswordIqual();
        } else {
            spanPasswordConfirm.textContent = 'La contraseña no es la misma!';
            spanPasswordConfirm.style.color = 'red';

            isPasswordIqual();
        }
    }
}

// CONFIRMA EN TIEMPO REAL SI LA CONTRASEÑA CUMPLE CON PARAMETROS
function passwordFunction() {
    const password = document.querySelector('#form__password').value;
    const spanPasword = document.querySelector('#span-password');

    if (isInRegister) {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,}$/;

        if (passwordPattern.test(password)) {
            spanPasword.textContent = '¡Contraseña válida!';
            spanPasword.style.color = 'green';
            passwordConfirmFunction();
        } else {
            spanPasword.textContent = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial (incluyendo - o _).';
            spanPasword.style.color = 'red';
            passwordConfirmFunction();
        }
    } else {
        if (password) {
            isOkPassword = true;
            isAllGood();
        } else {
            isOkPassword = false;
            isAllGood();
        }
    }
}

// CONFIRMA EN TIEMPO REAL SI EL NOMBRE CUMPLE CON PARAMETROS
function nameFunction() {
    if (isInRegister) {
        const name = document.querySelector('#form__name').value;
        const namePattern = /^[a-zA-Z\s]{3,}$/;

        const spanName = document.querySelector('#span-name');

        if (namePattern.test(name)) {
            spanName.textContent = '¡Usuario válido!';
            spanName.style.color = 'green';

            isOkName = true;
            isAllGood();
        } else {
            spanName.textContent = 'El Usuario no es válido!';
            spanName.style.color = 'red';

            isOkName = false;
            isAllGood();
        }
    }
}

// CONFIRMA EN TIEMPO REAL SI EL EMAIL CUMPLE CON PARAMETROS
function emailFunction() {
    const email = document.querySelector('#form__email').value;
    if (isInRegister) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const spanEmail = document.querySelector('#span-email');

        if (emailPattern.test(email)) {
            spanEmail.textContent = '¡Email válido!';
            spanEmail.style.color = 'green';

            isOkEmail = true;
            isAllGood();
        } else {
            spanEmail.textContent = 'El Email no es válido!';
            spanEmail.style.color = 'red';

            isOkEmail = false;
            isAllGood();
        }
    } else {
        if (email) {
            isOkEmail = true;
            isAllGood();
        } else {
            isOkEmail = false;
            isAllGood();
        }
    }
}

document.querySelector('#form__name').addEventListener('input', nameFunction);

document.querySelector('#form__password-confirm').addEventListener('input', passwordConfirmFunction);

document.querySelector('#form__password').addEventListener('input', passwordFunction);

document.querySelector('#form__email').addEventListener('input', emailFunction);

// CAMBIA LOS ESTILOS DE LA PÁGINA PARA MOSTRAR EL REGISTRO
document.querySelector('.tab--1').addEventListener('click', () => {
    setTimeout(() => {
        display.style.opacity = 0;
    }, 300)
    setTimeout(() => {

        display.style.flexDirection = 'row-reverse';

        imgCat.style.display = 'none';
        imgDog.style.display = 'flex';

        imgCat.style.opacity = 0;
        imgDog.style.opacity = 1;

        spanTitleImg.style.color = '#279ea0';
        spanTitleImg.style.left = 'unset';
        spanTitleImg.style.right = '5px';
        spanTitleImg.innerHTML = 'SIGN UP';

        elementsRegister.forEach(element => {
            element.style.display = 'flex';
        })

        clearElementes.forEach(element => {
            element.innerHTML = '';
            element.value = '';
        })

        btnSubmit.innerHTML = 'Registrar';
        btnSubmit.value = 'register';

        document.querySelector('#form__container-btn-register').style.justifyContent = 'start';

        display.style.opacity = 1;

        isInRegister = true;
        isOkPassword = false;
        isOkEmail = false;
        isOkName = false;
    }, 900)
});

// CAMBIA LOS ESTILOS DE LA PÁGINA PARA MOSTRAR EL LOGIN
document.querySelector('.tab--2').addEventListener('click', () => {
    setTimeout(() => {
        display.style.opacity = 0;
    }, 300)
    setTimeout(() => {
        display.style.flexDirection = 'row';

        imgDog.style.display = 'none';
        imgCat.style.display = 'flex';


        imgCat.style.opacity = 1;
        imgDog.style.opacity = 0;

        spanTitleImg.style.color = '#ec4555';
        spanTitleImg.style.left = '5px';
        spanTitleImg.style.right = 'unset';
        spanTitleImg.innerHTML = 'LOGIN';

        elementsRegister.forEach(element => {
            element.style.display = 'none';
        })

        clearElementes.forEach(element => {
            element.innerHTML = '';
            element.value = '';
        })

        btnSubmit.innerHTML = 'Login';
        btnSubmit.value = 'login';

        document.querySelector('#form__container-btn-register').style.justifyContent = 'end';

        display.style.opacity = 1;

        isInRegister = false;
        isOkPassword = false;
        isOkEmail = false;
        isOkName = false;
    }, 900)
});

