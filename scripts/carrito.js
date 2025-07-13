// Función para agregar eventos a botones "Agregar al carrito"
function attachAddToCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price)
      };
      addToCart(product);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec'; 
  const BASE_ID = 'appQDPTOfv3whdbYR';
  const TABLE_NAME = 'Productos-Deportes';
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  const productsContainer = document.querySelector('.product-grid');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
  }

  if (openCartBtn) openCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });

  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  function updateCartCount() {
    // Si querés mostrar la cantidad total en algún lugar, implementalo aquí
  }

  function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toLocaleString('es-AR');
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
      updateCartCount();
      updateCartTotal();
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} - $${item.price.toLocaleString('es-AR')} x ${item.quantity}</span>
        <div class="cart-item-controls">
          <button class="decrease-qty" data-index="${index}">-</button>
          <button class="increase-qty" data-index="${index}">+</button>
          <button class="remove-item" data-index="${index}">Eliminar</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll('.increase-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart[index].quantity++;
        saveCart();
        renderCart();
      });
    });

    document.querySelectorAll('.decrease-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        saveCart();
        renderCart();
      });
    });

    updateCartCount();
    updateCartTotal();
  }

  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
  }

  fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`
    }
  })
    .then(res => res.json())
    .then(data => {
      productsContainer.innerHTML = ''; // limpiar productos viejos

      data.records.forEach(record => {
        const id = record.id;
        const name = record.fields.Nombre;
        const price = record.fields.Precio;
        const imageUrl = record.fields.Imagen?.[0]?.url || 'img/placeholder.png';

        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
          <img src="${imageUrl}" alt="${name}" />
          <h3>${name}</h3>
          <p>$${price.toLocaleString('es-AR')}</p>
          <button 
            class="add-to-cart btn-buy"
            data-id="${id}"
            data-name="${name}"
            data-price="${price}">
            Agregar al carrito
          </button>
          <a href="${record.fields.Link || `detalle.html?id=${id}`}" class="btn-buy ver-detalle">Ver detalle</a>
        `;

        productsContainer.appendChild(productCard);
      });

      attachAddToCartListeners();
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
      productsContainer.innerHTML = '<p>Error al cargar productos.</p>';
    });

  renderCart();
});