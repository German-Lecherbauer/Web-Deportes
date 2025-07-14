// Datos para conectar con Airtable
const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Espera a que el DOM esté listo para cargar los productos
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});

// Función que obtiene la lista de productos desde Airtable y los muestra en la tabla
function cargarProductos() {
  fetch(API_URL, { headers })
    .then(res => res.json()) 
    .then(data => {
      const tbody = document.querySelector('#products-table tbody');
      tbody.innerHTML = ''; 

      data.records.forEach(producto => {
        const { Nombre, Precio, Imagen, Categoría } = producto.fields;

        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${Nombre || '-'}</td>
          <td>$${Precio?.toLocaleString() || '0'}</td>
          <td>${Categoría || '-'}</td>
          <td>${Imagen ? `<img src="${Imagen[0].url}" width="60" />` : 'Sin imagen'}</td>
          <td>
            <button class="edit" onclick="editarProducto('${producto.id}', '${Nombre}', ${Precio}, '${Categoría}', '${Imagen ? Imagen[0].url : ''}')">Editar</button>
            <button class="delete" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
          </td>
        `;

        tbody.appendChild(fila); // agrego la fila a la tabla
      });
    })
    .catch(err => {
      console.error('Error cargando productos:', err);
      alert('Hubo un problema cargando los productos. Revisa la consola.');
    });
}

// Maneja el envío del formulario para crear un producto nuevo
const form = document.querySelector('#product-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const price = parseFloat(document.querySelector('#price').value);
  const image = document.querySelector('#image').value.trim();
  const category = document.querySelector('#category').value.trim();

  if (!name || !price || !image || !category) {
    alert('Por favor completa todos los campos.');
    return;
  }

  if (!image.startsWith('http')) {
    alert('La URL de la imagen no parece válida.');
    return;
  }

  const nuevoProducto = {
    fields: {
      Nombre: name,
      Precio: price,
      Categoría: category,
      Imagen: [{ url: image }]
    }
  };

  try {

    // Envío la petición POST para crear el producto en Airtable
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(nuevoProducto)
    });

  
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error Airtable:', errorData);
      throw new Error('No se pudo guardar el producto');
    }

    alert('Producto agregado con éxito!');
    form.reset();  // limpio el formulario
    cargarProductos();  // vuelvo a cargar la lista actualizada
  } catch (error) {
    console.error('Error guardando producto:', error);
    alert('No se pudo guardar el producto. Mira la consola.');
  }
});

// Función para eliminar un producto 
function eliminarProducto(id) {
  if (!confirm('¿Querés eliminar este producto?')) return;

  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      alert('Producto eliminado correctamente.');
      cargarProductos(); // actualizo la tabla luego de eliminar
    })
    .catch(err => {
      console.error('Error al eliminar:', err);
      alert('No se pudo eliminar el producto.');
    });
}

// Función para editar un producto 
function editarProducto(id, nombre, precio, categoria, imagenUrl) {
  const nuevoNombre = prompt('Nuevo nombre:', nombre);
  const nuevoPrecio = prompt('Nuevo precio:', precio);
  const nuevaCategoria = prompt('Nueva categoría:', categoria);
  const nuevaImagen = prompt('Nueva URL de la imagen:', imagenUrl);

  // Si alguno de los campos queda vacío, cancelo la actualización
  if (!nuevoNombre || !nuevoPrecio || !nuevaCategoria || !nuevaImagen) {
    alert('No se actualizó. Todos los campos son necesarios.');
    return;
  }

  const productoActualizado = {
    fields: {
      Nombre: nuevoNombre,
      Precio: parseFloat(nuevoPrecio),
      Categoría: nuevaCategoria,
      Imagen: [{ url: nuevaImagen }]
    }
  };

  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(productoActualizado)
  })
    .then(res => {
      if (!res.ok) throw new Error('No se pudo actualizar');
      alert('Producto actualizado correctamente.');
      cargarProductos(); // refresco la lista
    })
    .catch(err => {
      console.error('Error al actualizar:', err);
      alert('Error actualizando el producto.');
    });
}