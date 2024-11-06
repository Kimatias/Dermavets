const menuBurguer = document.querySelector('#menu-hamburguer');   /*constante para guardar la imagen del menu hamburguesa*/
const mobileMenu = document.querySelector('.mobile-menu');       /*constante para guardar todo el menu de vista mobile*/

menuBurguer.addEventListener('click', toggleMobileMenu);        /*Event listener para que cuando demos click en el menu hamburguesa se despliegue el menu mobile o se oculte*/

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
    mobileMenu.classList.toggle('animacion-menu');
}