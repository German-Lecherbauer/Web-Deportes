const products = [
    {
        name: "Remera Compresion",
        description: "Remera 100% neoprene",
        price: 40000,
        image: "img/remera-compresion.png",
        link: "#",
        category: "remeras"
    },
    {
        name: "Calza Negra",
        description: "Calza Negra 100% algodon",
        price: 50000,
        image: "img/calza-mujer.png",
        link: "#",
        category: "calzas"
    },
    {
        name: "Jogging Hombre",
        description: "Joggin Azul 100% algodon",
        price: 50000,
        image: "img/jogging-azul.png",
        link: "#",
        category: "joggins"
    },
    {
        name: "Calza Gris",
        description: "Calza Gris 100% algodon",
        price: 50000,
        image: "/img/calza-gris.png",
        link: "#",
        category: "calzas"
    },
    {
        name: "Short Deportivo Mujer",
        description: "Short gris de algodon",
        price: 50000,
        image: "img/short-deporitvo-mujer-gris.png",
        link: "#",
        category: "shorts"
    },
    {
        name: "Short Hombre",
        description: "Short Azul de algodon",
        price: 50000,
        image: "img/short-deportivo-azul.png",
        link: "#",
        category: "shorts"
    },

    {
        name: "Zapatillas Grises",
        description: "Zapatillas deportivas",
        price: 100000,
        image: "img/zapatillas-grises.png",
        link: "#",
        category: "zapatillas"
    },
    {
        name: "Zapatillas Negras",
        description: "Zapatillas deportivas Negras",
        price: 100000,
        image: "img/zapatillas-negras.png",
        link: "#",
        category: "zapatillas"
    },
    {
        name: "Reloj Garmin",
        description: "Reloj Garmin Deportivo",
        price: 200000,
        image: "img/reloj-garmin.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Guantes Fitness",
        description: "Guantes deportivos Negros ",
        price: 40000,
        image: "img/guantes-fitness.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Top Deportivo",
        description: "Top deportivo negro",
        price: 80000,
        image: "img/top-deportivo.png",
        link: "#",
        category: "remeras"
    },
    {
        name: "Medias Deportivas",
        description: "Medias Negras",
        price: 10000,
        image: "img/medias.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Short Negro",
        description: "Short Negro Hombre",
        price: 80000,
        image: "img/short-negro.png",
        link: "#",
        category: "shorts"
    },
    {
        name: "Straps Negros",
        description: "Straps para  agarre",
        price: 20000,
        image: "img/straps.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Buzo Negro",
        description: "Buzo de algodon Negro",
        price: 80000,
        image: "img/buzo-negro.png",
        link: "#",
        category: "buzos"
    },
    {
        name: "Musculosa Compresion",
        description: "Musculosa compresion gris",
        price: 50000,
        image: "img/musculosa-compresion.png",
        link: "#",
        category: "musculosas"
    },
    {
        name: "Musculosa Mujer",
        description: "Musculosa Negra",
        price: 40000,
        image: "img/musculosa-mujer.png",
        link: "#",
        category: "musculosas"
    },
    {
        name: "Medias Blancas",
        description: "Medias blancas rayas negras",
        price: 10000,
        image: "img/medias-blancas.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Buzo Azul",
        description: "Buzo de algodon Azul",
        price: 80000,
        image: "img/buzo-azul.png",
        link: "#",
        category: "buzos"
    },
    {
        name: "Reloj Deportivo Sport",
        description: "Reloj Deportivo Sport",
        price: 150000,
        image: "img/reloj-deportivo.png",
        link: "#",
        category: "accesorios"
    },
    {
        name: "Remera Deportiva",
        description: "Remera Deportiva Blanca",
        price: 50000,
        image: "img/remera-blanca.png",
        link: "#",
        category: "remeras"
    },
    {
        name: "Jogging Hombre",
        description: "Jogging 100% algodon",
        price: 50000,
        image: "img/jogging-negro.png",
        link: "#",
        category: "joggins"
    },
    {
        name: "Tiras Nasales",
        description: "Tiras Nasales BRTH",
        price: 30000,
        image: "img/tiras-nasales.png",
        link: "#",
        category: "accesorios"
    },
       {
        name: "Zapatillas Blancas",
        description: "Zapatillas Deportivas blancas",
        price: 100000,
        image: "img/zapatilas-blancas.png",
        link: "#",
        category: "zapatillas"
    }
 ];


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
    button.textContent = 'Comprar';
    button.classList.add('btn-buy');

    const link = document.createElement('a');
    link.textContent = 'Ver detalle';
    link.classList.add('btn-buy');

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
    renderProducts(filteredProducts); //Llama a renderProducts() con los productos filtrados, para mostrarlos en pantalla.
}
 searchInput.addEventListener('input', (e) => { //Escucha cuando el usuario escribe en el campo de búsqueda 
    filterProducts(e.target.value); //Cuando se escribe algo, se llama a filterProducts con el texto ingresado (e.target.value).
 });

 renderProducts(products); //cuando se carga la página por primera vez, se muestran todos los productos.

 /* Filtros Checkbok */

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
 