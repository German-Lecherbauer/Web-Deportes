const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const detailContainer = document.getElementById('product-detail');

if (!productId) {
  detailContainer.innerHTML = `<p>No se encontró el ID del producto en la URL.</p>`;
} else {
  fetch(`${API_URL}/${productId}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error en la solicitud: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        detailContainer.innerHTML = `<p>Error al cargar el producto: ${data.error.message}</p>`;
        return;
      }

      // Procesar los datos
      const product = {
        name: data.fields.Nombre || 'Sin nombre',
        description: data.fields.Descripción || 'Sin descripción',
        price: data.fields.Precio || 'Sin precio',
        image: data.fields.Imagen && data.fields.Imagen.length > 0 ? data.fields.Imagen[0].url : 'img/placeholder.png',
      };

      // Renderizar el producto
      detailContainer.innerHTML = `
        <div class="imagen-producto">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="detalle-info">
          <h2>${product.name}</h2>
          <p class="descripcion">${product.description}</p>
          <p class="precio"><strong>Precio:</strong> $${product.price}</p>
          <button>Comprar</button>
          <a href="index.html" class="btn-volver">Volver</a>
        </div>
      `;
    })
    .catch((err) => {
      detailContainer.innerHTML = `<p>Error al conectar con Airtable.</p>`;
      console.error(err);
    });
}