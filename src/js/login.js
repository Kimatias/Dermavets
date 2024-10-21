const colores = {
    cereza: '#ec4555',
    verde: '#279ea0',
    verdeClaro: '#008000',
    verdeOscuro: '#2a4a54',
    gray: '#808080'
}

const messages = {
    passwordConfirmValid: '¡La contraseña es la misma!',
    passwordConfirmInalid: '¡La contraseña no es la misma!',
    passwordValid: '¡Contraseña válida!',
    passwordInvalid: 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial (incluyendo - o _).',
    nameValid: '¡Usuario válido!',
    nameInvalid: 'El Usuario no es válido!',
    emailValid: '¡Email válido!',
    emailInvalid: 'El Email no es válido!',
};

const display = document.querySelector('#main__container');
const form = document.querySelector('#form');

const spanTitleImg = document.querySelector('.img-title');
const imgCat = document.querySelector('#img-cat');
const imgDog = document.querySelector('#img-dog');

const elementsRegister = document.querySelectorAll('.form-registrar');
const clearElementes = document.querySelectorAll('.clear');

const iconPassword = document.querySelector('.icon-password');
const iconPasswordConfirm = document.querySelector('.icon-password-confirm');

const btnSubmit = document.querySelector('#register__btn-submit');
eventoBtn(false);

let isOkPassword;
let isOkName;
let isOkEmail;

let isInRegister = true;
let isIconPasswordActive = false;
let isIconPasswordConfirmActive = false;

// CONFIRMA SI TODO FUE DIGITADO CORRECTAMENTE
function isAllGood() {
    const conditions = isInRegister ? isOkPassword && isOkName && isOkEmail : isOkPassword && isOkEmail;
    eventoBtn(conditions);

}

// CONFIRMA SI LAS DOS CONTRASEÑAS SON IGUALES
function isPasswordEqual() {
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
            spanPasswordConfirm.textContent = messages.passwordConfirmValid;
            spanPasswordConfirm.style.color = colores.verdeClaro;

            isPasswordEqual();
        } else {
            spanPasswordConfirm.textContent = messages.passwordConfirmInalid;
            spanPasswordConfirm.style.color = colores.cereza;

            isPasswordEqual();
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
            spanPasword.textContent = messages.passwordValid;
            spanPasword.style.color = colores.verdeClaro;
            passwordConfirmFunction();
        } else {
            spanPasword.textContent = messages.passwordInvalid;
            spanPasword.style.color = colores.cereza;
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
            spanName.textContent = messages.nameValid;
            spanName.style.color = colores.verdeClaro;

            isOkName = true;
            isAllGood();
        } else {
            spanName.textContent = messages.nameInvalid;
            spanName.style.color = colores.cereza;

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
            spanEmail.textContent = messages.emailValid;
            spanEmail.style.color = colores.verdeClaro;

            isOkEmail = true;
            isAllGood();
        } else {
            spanEmail.textContent = messages.emailInvalid;
            spanEmail.style.color = colores.cereza;

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

function colorIcon(bollean, typeOfPassword){
    if (typeOfPassword == 'password'){
        if(bollean){
            iconPassword.classList.remove('bi-eye-slash-fill');
            iconPassword.classList.add('bi-eye-fill');
            iconPassword.style.color = colores.verde;
        }else{
            iconPassword.classList.remove('bi-eye-fill');
            iconPassword.classList.add('bi-eye-slash-fill');
            iconPassword.style.color = colores.cereza;
        }
    }
    if(typeOfPassword == 'password-confirm'){
        if(bollean){
            iconPasswordConfirm.classList.remove('bi-eye-slash-fill');
            iconPasswordConfirm.classList.add('bi-eye-fill');
            iconPasswordConfirm.style.color = colores.verde;
        }else{
            iconPasswordConfirm.classList.remove('bi-eye-fill');
            iconPasswordConfirm.classList.add('bi-eye-slash-fill');
            iconPasswordConfirm.style.color = colores.cereza;
        }
    }

}

function iconFunction(typeOfPassword){
    if (typeOfPassword == 'password'){
        isIconPasswordActive = isIconPasswordActive? false: true;
        if (isIconPasswordActive){
            document.querySelector('#form__password').type = 'text';
            colorIcon(true, 'password');
        } else {
            document.querySelector('#form__password').type = 'password';
            colorIcon(false, 'password');
        }
    }

    if (typeOfPassword == 'passwordConfirm'){
        isIconPasswordConfirmActive = isIconPasswordConfirmActive? false: true;
        if (isIconPasswordConfirmActive){
            document.querySelector('#form__password-confirm').type = 'text';
            colorIcon(true, 'password-confirm');
        } else {
            document.querySelector('#form__password-confirm').type = 'password';
            colorIcon(false, 'password-confirm');
        }
    }
}

function eventoBtn(key) {
    if (key){
        btnSubmit.disabled = false;
        btnSubmit.style.backgroundColor = colores.verde;
        btnSubmit.style.border = colores.verde;

        btnSubmit.addEventListener('mouseover', ()=>{
            btnSubmit.style.backgroundColor = colorVerdeOcuro;
            btnSubmit.style.border = colores.verdeOscuro;
        })

        btnSubmit.addEventListener('mouseout', ()=>{
            btnSubmit.style.backgroundColor = colores.verde;
            btnSubmit.style.border = colores.verde;
        })
    }else {
        btnSubmit.disabled = true;
        btnSubmit.style.backgroundColor = colores.gray;
        btnSubmit.style.border = colores.gray;

        btnSubmit.addEventListener('mouseover', ()=>{
            btnSubmit.style.backgroundColor = colores.gray;
            btnSubmit.style.border = colores.gray;
        })

        btnSubmit.addEventListener('mouseout', ()=>{
            btnSubmit.style.backgroundColor = colores.gray;
            btnSubmit.style.border = colores.gray;
        })
    }
}

// SELECCIÓN DESDE EL DOM Y ADDEVENTLISTENER
document.querySelector('#form__name').addEventListener('input', nameFunction);

document.querySelector('#form__password-confirm').addEventListener('input', passwordConfirmFunction);

document.querySelector('#form__password').addEventListener('input', passwordFunction);

document.querySelector('#form__email').addEventListener('input', emailFunction);

iconPassword.addEventListener('click', () =>{
    iconFunction('password');
});

iconPasswordConfirm.addEventListener('click', () =>{
    iconFunction('passwordConfirm');
});

// CAMBIA LOS ESTILOS DE LA PÁGINA PARA MOSTRAR EL REGISTRO
document.querySelector('.tab--1').addEventListener('click', () => {
    setTimeout(() => {
        display.style.opacity = 0;
    }, 300)
    setTimeout(() => {
        eventoBtn(false);
        display.style.flexDirection = 'row-reverse';

        imgCat.style.display = 'none';
        imgDog.style.display = 'flex';

        imgCat.style.opacity = 0;
        imgDog.style.opacity = 1;

        spanTitleImg.style.color = colores.verde;
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
        isIconPasswordActive = false;
        isIconPasswordConfirmActive = false;

        // RECETEO DE INPUTS
        document.querySelector('#form__password').type = 'password';

        document.querySelector('#form__password-confirm').type = 'password';

        colorIcon(false, 'password');
        colorIcon(false, 'password-confirm');
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

        spanTitleImg.style.color = colores.cereza;
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
        isIconPasswordActive = false;
        isIconPasswordConfirmActive = false;

        document.querySelector('#form__password').type = 'password';

        eventoBtn(false);
        
        colorIcon(false, 'password');
        colorIcon(false, 'password-confirm');
    }, 900)
});

