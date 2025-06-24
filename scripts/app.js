const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


const products = [];


 const grid = document.querySelector('.product-grid');
 const searchInput = document.querySelector('#input-search-products');


 function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card'); // clase de nuestros productos

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.classList.add('btn-buy');      // Para mantener tus estilos
    button.classList.add('add-to-cart');  // Para que funcione el carrito
    button.dataset.id = product.id;
    button.dataset.name = product.name;
    button.dataset.price = product.price;

    const link = document.createElement('a');
    link.textContent = 'Ver detalle';
    link.classList.add('btn-buy');
    link.href = product.link;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    card.appendChild(link);

    return card;
 }


 /* Buscador de productos */

function renderProducts(list) { //recibe un parámetro list (una lista de productos a mostrar en pantalla).
    grid.innerHTML = ''; // Borra el contenido actual del contenedor 
    list.forEach(product => { // Recorre cada producto en la lista recibida
        const card = createProductCard(product); // Crea una "card" de producto llamando a la función createProductCard() y pasando el product.Esto devuelve un article ya armado con imagen, nombre, precio, etc                                          
        grid.appendChild(card); //Agrega esa card al DOM dentro del contenedor grid (o sea, muestra el producto en la página)
    });
}

function filterProducts(text){ //Define la función que se encarga de filtrar productos según el texto ingresado en el buscador.
    const filteredProducts = products.filter(product => { //Crea una nueva lista (filteredProducts) con los productos que coinciden con el texto buscado
        const lowerText = text.toLowerCase(); //onvierte el texto buscado a minúsculas, para hacer una comparación 
        return ( // Devuelve true si alguna de estas 3 condiciones se cumple
            product.name.toLowerCase().includes(lowerText) ||
            product.description.toLowerCase().includes(lowerText) ||
            product.price.toString().includes(lowerText)
        );
    });
    renderProducts(filteredProducts);
    attachAddToCartListeners(); //Llama a renderProducts() con los productos filtrados, para mostrarlos en pantalla.
}

const checkboxes = document.querySelectorAll('input[name="categoria"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        applyFilters();
    });
});

function applyFilters() {
    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const searchText = searchInput.value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesText =
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.price.toString().includes(searchText);

        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);

        return matchesText && matchesCategory;
    });

    renderProducts(filtered);
}

// También actualizá este listener:
searchInput.addEventListener('input', () => {
    applyFilters();
});

//Limpiar filtros

const limpiarBtn = document.querySelector('.btn-limpiar');

limpiarBtn.addEventListener('click', () => {
  checkboxes.forEach(checkbox => checkbox.checked = false);
  searchInput.value = '';
  renderProducts(products);
  attachAddToCartListeners();
});


 //Cargar productos desde air table

async function fetchProductsFromAirtable() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error de la API de Airtable:', data.error);
            return; // Cortá la ejecución para no usar data.records
        }

        const airtableProducts = data.records.map(record => {
            return {
                name: record.fields.Nombre || 'Sin nombre',
                description: record.fields.Descripción || '',
                price: record.fields.Precio || 0,
                image: record.fields.Imagen ? record.fields.Imagen[0].url : 'img/placeholder.png',
                category: record.fields.Categoría || '',
                link: record.fields.Link || '#'
            };
        });

        console.log('Productos procesados:', airtableProducts);

        renderProducts(airtableProducts);

        products.length = 0;
        products.push(...airtableProducts);

    } catch (error) {
        console.error('Error al traer productos desde Airtable:', error);
    }
}

fetchProductsFromAirtable();

