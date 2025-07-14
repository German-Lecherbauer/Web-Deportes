// Configuración Airtable
const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Variables para productos y elementos DOM
const productos = [];
const contenedorProductos = document.querySelector('.product-grid');
const inputBusqueda = document.querySelector('#input-search-products');
const checkboxesCategoria = document.querySelectorAll('input[name="categoria"]');
const botonLimpiar = document.querySelector('.btn-limpiar');

// Función para crear la tarjeta HTML de un producto
function crearTarjeta(producto) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('product-card');

  tarjeta.innerHTML = `
    <img src="${producto.image}" alt="${producto.name}">
    <h3>${producto.name}</h3>
    <p>${producto.description}</p>
    <p>$${producto.price}</p>
    <button class="btn-buy add-to-cart"
      data-id="${producto.id}"
      data-name="${producto.name}"
      data-price="${producto.price}">
      Agregar al carrito
    </button>
    <a href="detalle.html?id=${producto.id}" class="btn-buy">Ver detalle</a>
  `;

  return tarjeta;
}

// Función para mostrar la lista de productos en pantalla
function mostrarProductos(lista) {
  contenedorProductos.innerHTML = '';
  lista.forEach(producto => {
    const tarjeta = crearTarjeta(producto);
    contenedorProductos.appendChild(tarjeta);
  });
  if (typeof attachAddToCartListeners === 'function') {
    attachAddToCartListeners();
  }
}

// Función para aplicar filtros de búsqueda y categorías
function aplicarFiltros() {
  const texto = inputBusqueda.value.toLowerCase();
  const categoriasSeleccionadas = Array.from(checkboxesCategoria)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const filtrados = productos.filter(prod => {
    const coincideTexto = 
      prod.name.toLowerCase().includes(texto) ||
      prod.description.toLowerCase().includes(texto) ||
      prod.price.toString().includes(texto);
    const coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(prod.category);

    return coincideTexto && coincideCategoria;
  });

  mostrarProductos(filtrados);
}

// Limpiar filtros
function limpiarFiltros() {
  checkboxesCategoria.forEach(cb => cb.checked = false);
  inputBusqueda.value = '';
  mostrarProductos(productos);
}

// Traer productos desde Airtable y cargarlos
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    const data = await respuesta.json();
    if (data.error) {
      console.error('Error Airtable:', data.error);
      return;
    }
    const lista = data.records.map(record => ({
      id: record.id,
      name: record.fields.Nombre || 'Sin nombre',
      description: record.fields.Descripción || '',
      price: record.fields.Precio || 0,
      image: record.fields.Imagen ? record.fields.Imagen[0].url : 'img/placeholder.png',
      category: record.fields.Categoría || ''
    }));
    productos.length = 0;
    productos.push(...lista);
    mostrarProductos(productos);
  } catch (error) {
    console.error('Error cargando productos:', error);
    contenedorProductos.innerHTML = '<p>Error al cargar productos.</p>';
  }
}

// Configurar eventos
if (contenedorProductos) {
  inputBusqueda.addEventListener('input', aplicarFiltros);
  checkboxesCategoria.forEach(cb => cb.addEventListener('change', aplicarFiltros));
  botonLimpiar.addEventListener('click', limpiarFiltros);

  // Cargar productos al inicio
  cargarProductos();
}