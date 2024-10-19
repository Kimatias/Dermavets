const register = document.querySelector('.tab--1');
const login = document.querySelector('.tab--2');

const display = document.querySelector('#main__container');
const form = document.querySelector('#form');
const spanTitleImg = document.querySelector('.img-title');

const imgCat = document.querySelector('#img-cat');
const imgDog = document.querySelector('#img-dog');



register.addEventListener('click', () => {
    setTimeout(()=>{
        display.style.opacity = 0;
    },400)
    setTimeout(()=>{
        display.style.flexDirection = 'row-reverse';

        imgCat.style.opacity = 0;
        imgDog.style.opacity = 1;

        spanTitleImg.style.textAlign = 'end';
        spanTitleImg.style.color = '#279ea0';
        spanTitleImg.style.right = '2%';
        spanTitleImg.innerHTML = 'SIGN UP';

        form.innerHTML = `<label for="form__email" class="fs-2 fw-bold">Correo</label>
                    <input type="email" name="user" class="fs-4" id="form__email"
                        placeholder="Intoduzca su Correo" required>

                    <label for="form__user" class="fs-2 fw-bold">Usuario</label>
                    <input type="text" name="user" class="fs-4" id="form__email" placeholder="Intoduzca su Usuario"
                        required>

                    <label for="form__password" class="fs-2 fw-bold">Contraseña</label>
                    <input type="password" name="password" class="fs-4" id="form__password"
                        placeholder="Introduzca su Contraseña" required>

                    <i class="bi bi-eye-slash-fill"></i>

                    <label for="form__password-confirm" class="fs-2 fw-bold">Confirmar Contraseña</label>
                    <input type="password" name="password" class="fs-4" id="form__password-confirm"
                        placeholder="Confirma su Contraseña" required>

                    <i class="bi bi-eye-slash-fill"></i>

                    <div id="form__container-btn-register" class="d-flex justify-content-start align-items-center">
                        <button type="submit" class="fs-4" id="register__btn-submit">Registrar</button>
                    </div>
        `

        display.style.opacity = 1;
    },800)
});

login.addEventListener('click', () => {
    setTimeout(()=>{
        display.style.opacity = 0;
    },400)
    setTimeout(()=>{
        display.style.flexDirection = 'row';

        imgCat.style.opacity = 1;
        imgDog.style.opacity = 0;

        spanTitleImg.style.textAlign = 'start';
        spanTitleImg.style.color = '#ec4555';
        spanTitleImg.style.right = '-2%';
        spanTitleImg.innerHTML = 'LOGIN';

        form.innerHTML = `<label for="form__user" class="fs-2 fw-bold">Usuario</label>
                    <input type="text" name="user" class="fs-4" id="form__email" placeholder="Intoduzca su Usuario"
                        required>

                    <label for="form__password" class="fs-2 fw-bold">Contraseña</label>
                    <input type="password" name="password" class="fs-4" id="form__password"
                        placeholder="Introduzca su Contraseña" required>

                    <i class="bi bi-eye-slash-fill"></i>

                    <div id="form__container-btn-login" class="d-flex justify-content-end align-items-center">
                        <button type="submit" class="fs-4" id="login__btn-submit">Login</button>
                    </div>
        `

        display.style.opacity = 1;
    },800)
});