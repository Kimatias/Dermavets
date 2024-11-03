const menuBurguer = document.querySelector('#menu-hamburguer');
const mobileMenu = document.querySelector('.mobile-menu');

const containerProductsHTML = document.querySelector('.products');
const dogInput = document.querySelector('#dog')
const catInput = document.querySelector('#cat');
const fishInput = document.querySelector('#fish');

const productDog = document.querySelectorAll('.its-for-dog');
const productCat = document.querySelectorAll('.its-for-cat');
const productCatDog = document.querySelectorAll('.its-for-cat-dog');
const productFish = document.querySelectorAll('.its-for-fish');

const btnFilter = document.querySelector('#btn-filter');
const btnReset = document.querySelector('#btn-reset');

const previousBtn = document.querySelector('#previous-page');
const nextBtn = document.querySelector('#next-page');

let addToCartBtn;

let currentPage = 1;
const productsPerPage = 3;

const productsListDB = [
    {
        id: 1,
        name: 'Nutrecan',
        mark: 'nutrecan',
        description: 'Product 1',
        price: 150,
        img: 'nutrecan-croquetas.jpg',
        animals: 'dog'
    },
    {
        id: 2,
        name: 'Donkat',
        mark: 'donkat',
        description: 'Product 2',
        price: 200,
        img: 'donkat-adultos-7000.jpg',
        animals: 'cat'
    },
    {
        id: 3,
        name: 'Q-ida Cat',
        mark: 'q-ida',
        description: 'Product 3',
        price: 100,
        img: 'Q-ida-cat-500.webp',
        animals: 'cat'
    },
    {
        id: 4,
        name: 'Incros',
        mark: 'incros',
        description: 'Product 4',
        price: 250,
        img: 'comida-peces.webp',
        animals: 'fish'
    },
    {
        id: 5,
        name: 'Q-ida dog',
        mark: 'q-ida',
        description: 'Product 5',
        price: 100,
        img: 'Q-ida-can-1000.jpg',
        animals: 'dog'
    }

];

const productsCartDB = [];

let productsFilter = [...productsListDB];

let parametersFilter = [];


menuBurguer.addEventListener('click', toggleMobileMenu);

function filterForAnimal() {

    console.log(dogInput.checked, catInput.checked, fishInput.checked);

    if (catInput.checked && dogInput.checked) {
        productCatDog.forEach(product => product.style.display = 'inline-block');
    } else {
        if (dogInput.checked || catInput.checked) {
            productCatDog.forEach(product => product.style.display = 'inline-block');
        } else {
            productCatDog.forEach(product => product.style.display = 'none');
            productCatDog.forEach(product => product.checked = false);
        }
    }

    if (dogInput.checked) {
        productDog.forEach(product => product.style.display = 'inline-block');
    } else {
        productDog.forEach(product => product.style.display = 'none');
        productDog.forEach(product => product.checked = false);
    }

    if (catInput.checked) {
        productCat.forEach(product => product.style.display = 'inline-block');
    } else {
        productCat.forEach(product => product.style.display = 'none');
        productCat.forEach(product => product.checked = false);
    }

    if (fishInput.checked) {
        productFish.forEach(product => product.style.display = 'inline-block');
    } else {
        productFish.forEach(product => product.style.display = 'none');
        productFish.forEach(product => product.checked = false);
    }

    if (!dogInput.checked && !catInput.checked && !fishInput.checked) {
        productDog.forEach(product => product.style.display = 'inline-block');
        productCat.forEach(product => product.style.display = 'inline-block');
        productFish.forEach(product => product.style.display = 'inline-block');
        productCatDog.forEach(product => product.style.display = 'inline-block');
    }
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
    mobileMenu.classList.toggle('animacion-menu');
}

function applyFilters() {
    parametersFilter = [];
    productsFilter = [];
    currentPage = 1;

    document.getElementById("page-number").textContent = currentPage;

    const selectedCategory = document.querySelectorAll('input[type="checkbox"]:checked');

    selectedCategory.forEach(idProduct => {
        if (idProduct.id != 'dog' && idProduct.id != 'cat' && idProduct.id != 'fish') {
            parametersFilter.push(idProduct.id);
        }
    });

    containerProductsHTML.innerHTML = "";

    parametersFilter.forEach(productFilter => {
        productsListDB.forEach(productDB => {

            if (productDB.mark == productFilter) {
                productsFilter.push(productDB);
            }

        });

    });

    if (productsFilter.length == 0 && selectedCategory.length == 0) {
        productsFilter = [...productsListDB];
        displayProducts(currentPage);
    } else if (productsFilter.length == 0 && selectedCategory.length > 0) {
        containerProductsHTML.innerHTML = "<span> </span> <h2 id='empty-filter'>No hay productos para esta categoría.</h2>";
    } else {
        displayProducts(currentPage);
    }

}

function applyReset() {
    productsFilter = [...productsListDB];
    currentPage = 1;

    const inputCategory = document.querySelectorAll('input[type="checkbox"]');

    inputCategory.forEach(input => {
        input.checked = false;
    });

    displayProducts(currentPage);
}

function displayProducts(page) {
    containerProductsHTML.innerHTML = "";
    addToCartBtn = [];

    // Calcular el índice de inicio y fin de productos en la página actual
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = productsFilter.slice(start, end);

    // Mostrar los productos de la página actual
    paginatedProducts.forEach(product => {
        containerProductsHTML.innerHTML += `
            <articule class="product-card">
                <div class="heart-detail">
                    <img id="heart" src="../src/assets/heart-fill.svg" alt="">
                </div>
                <img src="../src/assets/img/productos/alimento/${product.animals == 'cat' ? 'Gatos' : product.animals == 'dog' ? 'Perros' : 'Peces'}/${product.img}" alt="${product.img}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p id="precio"><span>$</span> ${product.price}</p>
                <div class="container__btn-cart">
                    <button class="btn-add-cart">Añadir al carrito</button>
                </div>
            </articule>
        `;
    });

    addToCartBtn = document.querySelectorAll('.btn-add-cart');
    // AÑADIR AL CARRO
    addToCartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            addToCartFunction(productName);
        });
    });
    console.log(addToCartBtn);
    // Actualizar el número de página
    document.getElementById("page-number").textContent = currentPage;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
}

function nextPage() {
    if (currentPage > 0) {
        if (currentPage * productsPerPage < productsFilter.length) {
            currentPage++;
            displayProducts(currentPage);
        }
    }
}

function addToCartFunction(productName) {
    const product = productsFilter.find(product => product.name === productName);
    console.log("Añadido al carrito:", product.id);
    // Lógica adicional para añadir al carrito
}

// Inicializa mostrando la primera página
displayProducts(currentPage);



//FILTRAR POR SELECCIÓN
btnFilter.addEventListener('click', applyFilters);

// RESETEAR FILTROS
btnReset.addEventListener('click', applyReset);

// FILTAR PRODUCTOS DE PERROS
dogInput.addEventListener('input', filterForAnimal);

// FILTAR PRODUCTOS DE GATOS
catInput.addEventListener('input', filterForAnimal);

// FILTAR PRODUCTOS DE PECES
fishInput.addEventListener('input', filterForAnimal);

// CAMBIAR DE PÁGINA
previousBtn.addEventListener('click', previousPage);
nextBtn.addEventListener('click', nextPage);


// MOSTRAR LISTA DE ANIMALES
document.querySelector('#categories-filter-animal__title').addEventListener('click', () => {
    const listAnimal = document.querySelector('#categories-filter-animal__list');
    listAnimal.classList.toggle('categories-filter-animal__active');
});

// MOSTRAR LISTA DE MARCA
document.querySelector('#categories-filter-marks__title').addEventListener('click', () => {
    const listMarks = document.querySelector('#categories-filter-marks__list');
    listMarks.classList.toggle('categories-filter-marks__active');
});

// MOSTRAR LISTA DE MEDICINA
document.querySelector('#categories-filter-medicine__title').addEventListener('click', () => {
    const listMedicine = document.querySelector('#categories-filter-medicine__list');
    listMedicine.classList.toggle('categories-filter-medicine__active');
});

// MOSTRAR LISTA DE HIGIENE
document.querySelector('#categories-filter-hygiene__title').addEventListener('click', () => {
    const listHygiene = document.querySelector('#categories-filter-hygiene__list');
    listHygiene.classList.toggle('categories-filter-hygiene__active');
});


document.addEventListener('DOMContentLoaded', () => {
    async function requestProducts(e) {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/productsUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const products = await res.json()
            if (res.status === 200) {
                productsListDB = [...products];
                displayProducts(currentPage);
            } else {
                alert(`Error al obtener productos: ${products.msg}`);
            }
        } catch (error) {
            console.error(error)
            alert('Error al obtener productos: ' + error.message);
        }
    }

    document.querySelector('#form__register').addEventListener('submit', requestProducts)
})