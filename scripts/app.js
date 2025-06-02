const products = [
    {
        name: "Remera Compresion",
        description: "Remera 100% neoprene",
        price: 40000,
        image: "img/remera-compresion.png",
        link: "#"
    },
    {
        name: "Calza Negra",
        description: "Calza Negra 100% algodon",
        price: 50000,
        image: "img/calza-mujer.png",
        link: "#"
    },
    {
        name: "Jogging Hombre",
        description: "Joggin Azul 100% algodon",
        price: 50000,
        image: "img/jogging-azul.png",
        link: "#"
    },
    {
        name: "Calza Gris",
        description: "Calza Gris 100% algodon",
        price: 50000,
        image: "/img/calza-gris.png",
        link: "#"
    },
    {
        name: "Short Deportivo Mujer",
        description: "Short gris de algodon",
        price: 50000,
        image: "img/short-deporitvo-mujer-gris.png",
        link: "#"
    },
    {
        name: "Short Hombre",
        description: "Short Azul de algodon",
        price: 50000,
        image: "img/short-deportivo-azul.png",
        link: "#"
    },

    {
        name: "Zapatillas Grises",
        description: "Zapatillas deportivas",
        price: 100000,
        image: "img/zapatillas-grises.png",
        link: "#"
    },
    {
        name: "Zapatillas Negras",
        description: "Zapatillas deportivas Negras",
        price: 100000,
        image: "img/zapatillas-negras.png",
        link: "#"
    },
    {
        name: "Reloj Garmin",
        description: "Reloj Garmin Deportivo",
        price: 200000,
        image: "img/reloj-garmin.png",
        link: "#"
    },
    {
        name: "Guantes Fitness",
        description: "Guantes deportivos Negros ",
        price: 40000,
        image: "img/guantes-fitness.png",
        link: "#"
    },
    {
        name: "Top Derportivo",
        description: "Top deportivo negro",
        price: 80000,
        image: "img/top-deportivo.png",
        link: "#"
    },
    {
        name: "Medias Deportivas",
        description: "Medias Negras",
        price: 10000,
        image: "img/medias.png",
        link: "#"
    },
    {
        name: "Short Negro",
        description: "Short Negro Hombre",
        price: 80000,
        image: "img/short-negro.png",
        link: "#"
    },
    {
        name: "Straps Negros",
        description: "Straps para  agarre",
        price: 20000,
        image: "img/straps.png",
        link: "#"
    },
    {
        name: "Buzo Negro",
        description: "Buzo de algodon Negro",
        price: 80000,
        image: "img/buzo-negro.png",
        link: "#"
    },
    {
        name: "Musculosa Compresion",
        description: "Musculosa compresion gris",
        price: 50000,
        image: "img/musculosa-compresion.png",
        link: "#"
    },
    {
        name: "Musculosa Mujer",
        description: "Musculosa Negra",
        price: 40000,
        image: "img/musculosa-mujer.png",
        link: "#"
    },
    {
        name: "Medias Blancas",
        description: "Medias blancas rayas negras",
        price: 10000,
        image: "img/medias-blancas.png",
        link: "#"
    },
    {
        name: "Buzo Azul",
        description: "Buzo de algodon Azul",
        price: 80000,
        image: "img/buzo-azul.png",
        link: "#"
    },
    {
        name: "Reloj Deportivo Sport",
        description: "Reloj Deportivo Sport",
        price: 150000,
        image: "img/reloj-deportivo.png",
        link: "#"
    },
    {
        name: "Remera Deportiva",
        description: "Remera Deportiva Blanca",
        price: 50000,
        image: "img/remera-blanca.png",
        link: "#"
    },
    {
        name: "Jogging Hombre",
        description: "Jogging 100% algodon",
        price: 50000,
        image: "img/jogging-negro.png",
        link: "#"
    },
    {
        name: "Tiras Nasales",
        description: "Tiras Nasales BRTH",
        price: 30000,
        image: "img/tiras-nasales.png",
        link: "#"
    },
       {
        name: "Zapatillas Blancas",
        description: "Zapatillas Deportivas blancas",
        price: 100000,
        image: "img/zapatilas-blancas.png",
        link: "#",
    }
 ];


 const grid = document.querySelector('.product-grid');

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

 products.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
 });