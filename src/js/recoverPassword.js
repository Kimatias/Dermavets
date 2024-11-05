// const nodemailer = require('nodemailer');

const message = document.querySelector('#container-message');
const btnGoBack = document.querySelector('#btn-go-back');


const messageOk = `<div id="box-message">
                    <img id="message__img" src="../src/assets/dog-animado1.svg" alt="img de perro">
                    <h1 id="message__title">Correo enviado</h1>
                    <p id="message__paragraph">Verifica en tu bandeja de mensajes, recuerda revisar en mensajes no deseados o spam.</p>
                    <div id="container-btn-message">
                        <button type="button" id="message__btn-submit" class='message-ok'>Ok</button>
                    </div>
                </div>`;

const messageError = `<div id="box-message">
                    <img id="message__img" src="../src/assets/dog-animado1.svg" alt="img de perro">
                    <h1 id="message__title">Correo No enviado</h1>
                    <p id="message__paragraph">Verifica tu correo electrónico</p>
                    <div id="container-btn-message">
                        <button type="button" id="message__btn-submit" class='message-error'>Ok</button>
                    </div>
                </div>`

const messageErrorServidor = `<div id="box-message">
                <img id="message__img" src="../src/assets/dog-animado1.svg" alt="img de perro">
                <h1 id="message__title">Correo No enviado</h1>
                <p id="message__paragraph">Hubo un error con el Servidor, intenta más tarde. Gracias!</p>
                <div id="container-btn-message">
                    <button type="button" id="message__btn-submit" class='message-error'>Ok</button>
                </div>
            </div>`

btnGoBack.addEventListener('click', () => {
    window.location.href = './login.html';
});
async function enviarCorreoDeRecuperacion(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // O el servicio de tu preferencia
        auth: {
            user: email,
            pass: 'tu_contraseña',
        },
    });

    const link = `https://tuapp.com/restablecer-contraseña?token=${token}`;
    const mensaje = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${link}`,
    };

    await transporter.sendMail(mensaje);
}

async function requestToken() {

    try {
        //PETICION DEL TOKEN PARA PODER ENVIAR AL CORREO
        const res = await fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = await res.json()
        if (res.status === 200) {
            return token;
        } else {
            alert(`Error al obtener token: ${token.msg}`);
        }
    } catch (error) {
        console.error(error)
        alert('Error al obtener token: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    async function recoverFunction(e) {
        e.preventDefault();

        const email = document.querySelector('#email').value;

        try {
            //ENVIO EL CORREO PARA BUSCAR EL TOKEN O CONTRASEÑA
            const res = await fetch('http://localhost:5000/api/auth/recoverPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json()
            console.log({ data })
            if (res.status === 200) {
                token = requestToken(email);
                enviarCorreoDeRecuperacion(email, token);
                message.style.display = 'flex';
                message.innerHTML = messageOk;
                const btnOk = document.querySelector('.message-ok');

                btnOk.addEventListener('click', () => {
                    window.location.href = './login.js';

                });
            } else {
                message.style.display = 'flex';
                message.innerHTML = messageError;
                const btnError = document.querySelector('.message-error');

                btnError.addEventListener('click', () => {
                    window.location.reload();
                });
            }
        } catch (error) {
            message.style.display = 'flex';
            message.innerHTML = messageErrorServidor;
            const btnError = document.querySelector('.message-error');

            btnError.addEventListener('click', () => {
                window.location.reload();
            });
        }
    }
    document.querySelector('#form-recover').addEventListener('submit', recoverFunction)

})
