document.addEventListener('DOMContentLoaded', function() {
    dolar();
    menuMobile();
    productos();
    carrito();
});

function dolar() {
    // Definir la URL de la API
    const apiUrl = 'https://dolarapi.com/v1/dolares/blue';
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Asumiendo que quieres usar el precio de venta del dólar para la conversión
        const precioDolarVenta = parseFloat(data.venta);
        //Mostrar precio de dolar en pantalla

        let dolarPantalla = document.getElementsByClassName('dolar_pantalla');
        dolarPantalla[0].textContent = `$${precioDolarVenta}`;
        
        // Calcular el precio en dólares y mostrarlo en la página
        let cantidadDeMonto = document.querySelectorAll('p.monto').length;


    for(let i=0; i<cantidadDeMonto; i++){
        // Obtener el precio en moneda local desde tu página web
        let precioDolar = document.getElementsByClassName('preciodolar');
        precioDolar = precioDolar[i].textContent;
        precioDolar = parseInt(precioDolar);

        let precioEnPesos = precioDolar * precioDolarVenta;

        let elementoMonto = document.querySelectorAll('p.monto')[i];

        elementoMonto.textContent = `A$S ${precioEnPesos}`;
    }

    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
}

function menuMobile() {
    const iconoMenu = document.querySelector(".iconoMenu");
    const menu = document.querySelector(".menu-mobile");
    const menuCerrar = document.getElementById("cerrarMenu");
    
    iconoMenu.addEventListener("click", abrirMenu);
    menuCerrar.addEventListener("click", cerrarMenu);

    function abrirMenu() {
        menu.classList.add("menu-abierto");
        const fondoOverlay = document.createElement('div');
        fondoOverlay.classList.add('fondo-overlay');

        document.body.appendChild(fondoOverlay);
        document.body.classList.add('no-scroll');
    }

    function cerrarMenu() {
        menu.classList.remove("menu-abierto");
        const fondoOverlay = document.querySelector('.fondo-overlay');
        if (fondoOverlay) {
            fondoOverlay.remove();
        }
        document.body.classList.remove('no-scroll');
    }
}

function productos() {

    const productos = stock;

    let htmlVista = "";

    productos.forEach((producto) => {
        // Convertimos el array de talles en botones
        const botonesTalles = producto.talles.map((talle) => {
            return `<button class="boton_talle" data-talle="${talle}">${talle}</button>`;
        }).join('');

        htmlVista += `
        <div class="productos">
            <div>     
                <img src="${producto.img}" class="imagen_producto">
            </div>
            <div>
                <h2 class="h2titulo">${producto.modelo}</h2>
            </div>
            <div class="talles-contenedor">
                <p class="titulo">Elige un talle</p>
                ${botonesTalles}
            </div>
            <div class="precio_info">
                <div class="precio">
                    <p class="oferta"></p>
                    <p class="monto"></p>
                    <p class="montoUSD">U$D</p>
                    <p class="montoUSD preciodolar">${producto.precio}</p>
                </div>            
                <div class="btn_comprarinfo">
                    <a class="boton_comprar" data-id="${producto.id}">Comprar</a>                        
                </div>
            </div>
        </div>`;
    });

    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = htmlVista;

    // Agregamos un event listener para los botones de talle
    const botonesTalle = document.querySelectorAll('.boton_talle');
    botonesTalle.forEach((boton) => {
        boton.addEventListener('click', seleccionarTalle);
    });
}

function seleccionarTalle(e) {
    // Marcamos el botón de talle seleccionado
    const botonesTalle = document.querySelectorAll('.boton_talle');
    botonesTalle.forEach((boton) => {
        boton.classList.remove('talle_seleccionado');
    });
    const botonSeleccionado = e.target;
    botonSeleccionado.classList.add('talle_seleccionado');
}

function carrito() {
    const iconoCarrito = document.querySelectorAll(".iconoCarrito");
    const carritoDeCompras = document.querySelector(".carritodecompras");
    const carritoCerrar = document.querySelectorAll(".cerrar-carrito");
    const btnAgregarCarrito = document.querySelectorAll(".boton_comprar");
    const contenedorProductos = document.querySelector(".carrito-ul");
    const vaciar = document.querySelector(".vaciar-carrito");
    const carritoNum = document.getElementById("carro-cantidad-items");
    const carritoVacio = document.querySelector(".carrito-vacio");
    const botonesLi = document.querySelector('.botones-li');

    let articulosCarrito = [];
    
    vaciar.addEventListener("click", vaciarCarrito);

    carritoDeCompras.addEventListener("click", eliminarProducto);

    btnAgregarCarrito.forEach(item => {
        item.addEventListener("click", agregarCarrito);
    })
    
    iconoCarrito.forEach(icono => {
        icono.addEventListener("click", abrirCarrito);
    }); 

    carritoCerrar.forEach(cerrar => {
        cerrar.addEventListener("click", cerrarCarrito);
    }); 
    

    carritoHTML();

    function eliminarProducto(e) {
        if (e.target.classList.contains("eliminar-producto")) {
            const productoId = e.target.getAttribute("data-id");
            const talleProducto = e.target.getAttribute("data-talle");

            // Filtrar los productos del carrito para eliminar solo la variante específica
            articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== productoId || articulo.talle !== talleProducto);
    
            carritoHTML();
        }
    }

    function abrirCarrito() {
        carritoDeCompras.classList.add("carrito-abierto");
        const fondoOverlay = document.createElement('div');
        fondoOverlay.classList.add('fondo-overlay');

        document.body.appendChild(fondoOverlay);
        document.body.classList.add('no-scroll');

        fondoOverlay.addEventListener("click", cerrarCarrito);
    }

    function cerrarCarrito() {
        carritoDeCompras.classList.remove("carrito-abierto");
        const fondoOverlay = document.querySelector('.fondo-overlay');
        if (fondoOverlay) {
            fondoOverlay.remove();
        }
        document.body.classList.remove('no-scroll');
    }

    function agregarCarrito(e) {
        const productoSeleccionado = e.target.closest('.productos');
        leerDatosProductos(productoSeleccionado);

    }

    function leerDatosProductos(producto) {
      
        const btnTalle = producto.querySelector(".talle_seleccionado");
        
        if (!btnTalle) {
            alert("Por favor, selecciona un talle antes de agregar al carrito.");
            const talleSeleccionadoTemporal = document.querySelector(".talle_seleccionado");
            
            if(talleSeleccionadoTemporal) {
                talleSeleccionadoTemporal.classList.remove("talle_seleccionado");
            }

            return;
        }

        const talleSeleccionado = btnTalle.textContent;

        // Comprobar si el producto ya está en el carrito con el mismo talle
        const productoExistente = articulosCarrito.find(item => item.nombre === producto.querySelector(".h2titulo").textContent && item.talle === talleSeleccionado);


        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            const infoProducto = {
                id: producto.querySelector(".boton_comprar").dataset.id,
                imagen: producto.querySelector(".imagen_producto").src,
                nombre: producto.querySelector(".h2titulo").textContent,
                precio: (producto.querySelector(".monto").textContent).split(' ')[1],
                talle: talleSeleccionado,
                cantidad: 1
            }

            // Agrega elementos al arreglo de carrito
            articulosCarrito = [...articulosCarrito, infoProducto];
    
        }
        
        btnTalle.classList.remove("talle_seleccionado");

        carritoHTML();
    }

    function carritoHTML() {

        // Limpiar el HTML
        limpiarHTML();

        const numeroDeProductos = articulosCarrito.length;

        carritoNum.innerHTML = numeroDeProductos;

        // Verificar si el carrito está vacío
        if (numeroDeProductos === 0) {
            carritoVacio.style.display = 'block';
            botonesLi.style.display = 'none';
            
            return; 
        } else {
            carritoVacio.style.display = 'none';
            botonesLi.style.display = 'block';
            
        }

        // Si hay productos en el carrito, mostramos los botones de realizar pedido y vaciar carrito
        
        botonesLi.style.display = 'block';

        articulosCarrito.forEach( producto => {
            
            const li = document.createElement( "li" );
            li.classList.add("carrito-li");

            li.innerHTML = `
                <div class="contenedor-producto-izquierda">
                    <img src="${producto.imagen}" alt="" class="imagen_miniatura"/>
                    <div class="producto-info">
                        <p>${producto.nombre}</p>
                        <p>Talle: ${producto.talle}</p>
                        <div>
                            <button class="boton-restar">-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="boton-sumar">+</button>
                        </div>
                    </div>
                </div>
                <div class="contenedor-producto-derecha">
                    <div class="precio">$${parseFloat(producto.precio)}</div>
                    <i data-id="${producto.id}" data-talle="${producto.talle}" class="eliminar-producto fa-solid fa-trash"></i>
                </div>
            `;

            contenedorProductos.appendChild(li);

            // Obtener elementos de botón de restar y sumar dentro del artículo
            const botonRestar = li.querySelector('.boton-restar');
            const botonSumar = li.querySelector('.boton-sumar');
            const cantidadSpan = li.querySelector('.cantidad');

            // Añadir listeners para cambiar la cantidad
            botonRestar.addEventListener('click', () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                    cantidadSpan.textContent = producto.cantidad;
                }
            });

            botonSumar.addEventListener('click', () => {
                producto.cantidad++;
                cantidadSpan.textContent = producto.cantidad;
            });

        });
    }

    function vaciarCarrito() {
        articulosCarrito = [];
        carritoNum.textContent = 0;
        limpiarHTML();

        carritoHTML();
    }

    function limpiarHTML() {
        while(contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
    }

    
}

