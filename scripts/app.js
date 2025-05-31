/*const products = [
    {   image:"/img/remera-compresion.png",
        name: "Remera de Compresion",
        price: 40.000
    },

    {   image:"/img/zapatilla-airfly.png",
        name: "Zapatillas AirFly",
        price: 120.000
    },

    {   image:"/img/reloj-garmin.png",
        name: "Reloj Garmin",
        price: 300.000
    },

    {   image:"/img/short-deportivo.png",
        name: "Short Deportivo Negro",
        price: 100.000
    },

    {   image:"img/short-deportivo-azul.png",
        name: "Short Deportivo Azul",
        price: 80.000
    },

    {   image:"/img/guantes-fitness.png",
        name: "Guantes Fitness",
        price: 60.000
    },

    {   image:"/img/musculosa-mujer.png",
        name: "Musculosa Deportiva",
        price: 100.000
    },

    {   image:"/img/short-deporitvo-mujer-gris.png",
        name: "Short Deportivo Mujer Gris",
        price: 80.000
    },

    {   image:"img/zapatillas-negras.png",
        name: "Zapatillas Negras",
        price: 140.000
    },

    {   image:"/img/top-deportivo.png",
        name: "Top Deportivo Mujer",
        price: 60.000
    },

    {   image:"/img/jogging-azul.png",
        name: "Jogging Azul",
        price: 120.000
    }

];

const grid = document.querySelector('.product-grid');

function createProductCard(product){
    
    const card = document.createElement('div');
    card.classList.add('col-4');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h4');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Comprar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

 products.forEach( product => {
    const card = createProductCard(product);
    grid.appendChild(card);
 });^

 */

