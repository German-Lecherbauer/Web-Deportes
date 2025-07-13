const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];

const grid = document.querySelector('.product-grid');
const searchInput = document.querySelector('#input-search-products');
const checkboxes = document.querySelectorAll('input[name="categoria"]');
const limpiarBtn = document.querySelector('.btn-limpiar');


if (grid) {

  function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

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
    button.classList.add('btn-buy', 'add-to-cart');
    button.dataset.id = product.id;
    button.dataset.name = product.name;
    button.dataset.price = product.price;

    const link = document.createElement('a');
    link.textContent = 'Ver detalle';
    link.classList.add('btn-buy');
    console.log('Producto al crear link:', product);
    link.href = `detalle.html?id=${(product.id || '').trim()}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);
    card.appendChild(link);

    return card;
  }

  function renderProducts(list) {
    grid.innerHTML = '';
    list.forEach(product => {
      const card = createProductCard(product);
      grid.appendChild(card);
    });
  }

  function filterProducts(text) {
    const lowerText = text.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(lowerText) ||
      product.description.toLowerCase().includes(lowerText) ||
      product.price.toString().includes(lowerText)
    );
    renderProducts(filteredProducts);
    attachAddToCartListeners();
  }

  function applyFilters() {
    const selectedCategories = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const searchText = searchInput ? searchInput.value.toLowerCase() : '';

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
    attachAddToCartListeners();
  }

  // Event listeners con protección
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  if (limpiarBtn) {
    limpiarBtn.addEventListener('click', () => {
      checkboxes.forEach(checkbox => checkbox.checked = false);
      if (searchInput) searchInput.value = '';
      renderProducts(products);
      attachAddToCartListeners();
    });
  }

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
        return;
      }

      const airtableProducts = data.records.map(record => ({
        id: record.id,
        name: record.fields.Nombre || 'Sin nombre',
        description: record.fields.Descripción || '',
        price: record.fields.Precio || 0,
        image: record.fields.Imagen ? record.fields.Imagen[0].url : 'img/placeholder.png',
        category: record.fields.Categoría || '',
        link: `detalle.html?id=${record.id}`
      }));

      renderProducts(airtableProducts);
      products.length = 0;
      products.push(...airtableProducts);
      attachAddToCartListeners();

    } catch (error) {
      console.error('Error al traer productos desde Airtable:', error);
    }
  }

  fetchProductsFromAirtable();
}