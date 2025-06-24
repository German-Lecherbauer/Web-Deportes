const API_TOKEN = 'patv3MjOov3yPa9fz.c6d73fc6340fc2cc9f136119de008878ee89d9358cb421b8d4ed4f92b5840bec';
const BASE_ID = 'appQDPTOfv3whdbYR';
const TABLE_NAME = 'Productos-Deportes';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

// Obtener productos y mostrarlos en la tabla
function fetchProducts() {
  fetch(API_URL, { headers })
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#products-table tbody');
      tbody.innerHTML = '';

      data.records.forEach(record => {
        const { Nombre, Precio, Imagen, Categoría } = record.fields;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${Nombre || '-'}</td>
          <td>$${Precio?.toLocaleString() || '0'}</td>
          <td>${Categoría || '-'}</td>
          <td>${Imagen ? `<img src="${Imagen[0].url}" width="60" />` : 'Sin imagen'}</td>
          <td class="action-buttons">
            <button class="edit" onclick="editProductPrompt('${record.id}', '${Nombre}', ${Precio}, '${Categoría}', '${Imagen ? Imagen[0].url : ''}')">Editar</button>
            <button class="delete" onclick="deleteProduct('${record.id}')">Eliminar</button>
          </td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error('Error detalle:', err);
      alert('Error al cargar los productos ❌ Revisa la consola.');
    });
}

// Crear producto desde formulario
const form = document.querySelector('#product-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const price = parseFloat(document.querySelector('#price').value);
  const image = document.querySelector('#image').value.trim();
  const category = document.querySelector('#category').value.trim();

  if (!name || !price || !image || !category) {
    alert('Por favor completá todos los campos.');
    return;
  }

  if (!image.startsWith('http')) {
    alert('La URL de la imagen no es válida.');
    return;
  }

  const newProduct = {
    fields: {
      Nombre: name,
      Precio: price,
      Categoría: category,
      Imagen: [
        { url: image }
      ]
    }
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(newProduct)
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error Airtable:', errorData);
      throw new Error('Error al guardar en Airtable');
    }

    alert('Producto agregado con éxito ✅');
    form.reset();
    fetchProducts();
  } catch (err) {
    console.error('Error detalle:', err);
    alert('Error al guardar el producto ❌ Revisa la consola.');
  }
});

// Eliminar producto
function deleteProduct(id) {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return;

  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      alert('Producto eliminado ✅');
      fetchProducts();
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo eliminar el producto ❌');
    });
}

// Editar producto
function editProductPrompt(id, nombre, precio, categoría, imagenUrl) {
  const newName = prompt('Nuevo nombre:', nombre);
  const newPrice = prompt('Nuevo precio:', precio);
  const newCategory = prompt('Nueva categoría:', categoría);
  const newImage = prompt('Nueva URL de imagen:', imagenUrl);

  if (newName && newPrice && newCategory && newImage) {
    const updatedProduct = {
      fields: {
        Nombre: newName,
        Precio: parseFloat(newPrice),
        Categoría: newCategory,
        Imagen: [
          {
            url: newImage
          }
        ]
      }
    };

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updatedProduct)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar');
        alert('Producto actualizado ✅');
        fetchProducts();
      })
      .catch(err => {
        console.error(err);
        alert('No se pudo actualizar el producto ❌');
      });
  }
}