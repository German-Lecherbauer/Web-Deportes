const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Sacamos el id del producto de la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const detalleContenedor = document.getElementById('product-detail');

if (!productId) {
  detalleContenedor.innerHTML = '<p>No se encontró el producto.</p>';
} else {
  fetch(`${API_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      if (data.error) {
        detalleContenedor.innerHTML = `<p>Error: ${data.error.message}</p>`;
        return;
      }

      // Datos a mostrar
      const producto = {
        name: data.fields.Nombre || 'Sin nombre',
        description: data.fields.Descripción || 'Sin descripción',
        price: data.fields.Precio || 'Sin precio',
        image: data.fields.Imagen && data.fields.Imagen.length > 0
          ? data.fields.Imagen[0].url
          : 'img/placeholder.png'
      };

      // Pintamos el detalle en la página
      detalleContenedor.innerHTML = `
        <div class="imagen-producto">
          <img src="${producto.image}" alt="${producto.name}">
        </div>
        <div class="detalle-info">
          <h2>${producto.name}</h2>
          <p class="descripcion">${producto.description}</p>
          <p class="precio"><strong>Precio:</strong> $${producto.price}</p>
          <button>Comprar</button>
          <a href="index.html" class="btn-volver">Volver</a>
        </div>
      `;
    })
    .catch(err => {
      detalleContenedor.innerHTML = '<p>Hubo un problema al cargar el producto.</p>';
      console.error(err);
    });
}