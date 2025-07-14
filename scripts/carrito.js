
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del carrito y variables
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  const btnAbrir = document.getElementById('open-cart');
  const btnCerrar = document.getElementById('close-cart');
  const contenedorItems = document.getElementById('cart-items');
  const totalCarrito = document.getElementById('cart-total');

  // Cargar carrito del localStorage o empezar vacío
  let carrito = JSON.parse(localStorage.getItem('cart')) || [];

  // Mostrar el sidebar del carrito
  function mostrarCarrito() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }

  // Ocultar el sidebar
  function ocultarCarrito() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  // Abrir carrito al click
  if (btnAbrir) btnAbrir.addEventListener('click', e => {
    e.preventDefault();
    mostrarCarrito();
  });

  // Cerrar carrito
  if (btnCerrar) btnCerrar.addEventListener('click', ocultarCarrito);
  if (overlay) overlay.addEventListener('click', ocultarCarrito);

  // Guardar carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }

  // Calcular y mostrar total 
  function actualizarTotal() {
    const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalCarrito.textContent = total.toLocaleString('es-AR');
  }

  // Renderizar los productos en el carrito
  function renderizarCarrito() {
    contenedorItems.innerHTML = '';
    if (carrito.length === 0) {
      contenedorItems.innerHTML = '<p>El carrito está vacío.</p>';
      actualizarTotal();
      return;
    }

    carrito.forEach((item, index) => {
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
      contenedorItems.appendChild(div);
    });


    // Eventos para botones de control
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        carrito.splice(i, 1);
        guardarCarrito();
        renderizarCarrito();
      });
    });

    document.querySelectorAll('.increase-qty').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        carrito[i].quantity++;
        guardarCarrito();
        renderizarCarrito();
      });
    });

    document.querySelectorAll('.decrease-qty').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        if (carrito[i].quantity > 1) {
          carrito[i].quantity--;
        } else {
          carrito.splice(i, 1);
        }
        guardarCarrito();
        renderizarCarrito();
      });
    });

    actualizarTotal();
  }

  // Función para agregar producto al carrito

  window.attachAddToCartListeners = function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const producto = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: parseFloat(button.dataset.price)
        };
        agregarAlCarrito(producto);
      });
    });
  };

  function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
      existente.quantity++;
    } else {
      carrito.push({...producto, quantity: 1});
    }
    guardarCarrito();
    renderizarCarrito();
  }

  // Hacemos global la función para que app.js pueda llamarla 
  window.agregarAlCarrito = agregarAlCarrito;

  // Inicializamos el carrito en pantalla
  renderizarCarrito();
});