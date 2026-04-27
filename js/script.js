const modal = document.querySelector('#modal-galeria');
const imgModal = document.querySelector('#img-modal');
const btnCerrar = document.querySelector('.cerrar-modal');
const cards = document.querySelectorAll('.img-card img');

// 1. CARGAR LA MOCHILA (LocalStorage)
// Intentamos traer lo guardado. Si no hay nada, empezamos con lista vacía []
let carrito = JSON.parse(localStorage.getItem('carrito-vivero')) || [];

// 2. FUNCIÓN PARA AGREGAR (Se usa en galeria.html)
const botonesAgregar = document.querySelectorAll('.btn-add');
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseInt(e.target.getAttribute('data-precio'));
        
        carrito.push({ nombre, precio });
        localStorage.setItem('carrito-vivero', JSON.stringify(carrito));
        
        alert(nombre + " agregado al carrito");
    });
});

// 3. FUNCIÓN PARA MOSTRAR LOS PRODUCTOS (Se usa en carrito.html)
function actualizarInterfaz() {
    const listaCarrito = document.querySelector('#items-carrito');
    const totalElemento = document.querySelector('#precio-total');

    // Si no encontramos 'items-carrito', es porque no estamos en la página del carrito
    if (!listaCarrito) return; 

    listaCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            const div = document.createElement('div');
            div.classList.add('item-en-carrito');
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center; border-bottom:1px solid #eee; padding:10px;">
                    <span>${item.nombre}</span>
                    <strong>$${item.precio}</strong>
                    <button onclick="eliminarDelCarrito(${index})" style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">X</button>
                </div>
            `;
            listaCarrito.appendChild(div);
        });
    }

    if (totalElemento) {
        totalElemento.innerText = total;
    }
}

// 4. FUNCIÓN PARA ELIMINAR (Global)
window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito-vivero', JSON.stringify(carrito));
    actualizarInterfaz();
};

// 5. FINALIZAR COMPRA
const btnFinalizar = document.getElementById('btn-finalizar');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (carrito.length === 0) return alert("Aún no tienes productos");
        
        let texto = "Hola Vivero Libra! Quiero encargar:%0A";
        carrito.forEach(p => texto += `- ${p.nombre} ($${p.precio})%0A`);
        texto += "%0ATotal: $" + document.getElementById('precio-total').innerText;
        
        window.open("https://wa.me/5493794000000?text=" + texto);
    });
}

// --- EL TRUCO FINAL ---
// Esta línea obliga al navegador a leer la mochila y mostrar los datos apenas carga la página
window.onload = actualizarInterfaz;