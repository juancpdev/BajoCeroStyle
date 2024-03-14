
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
                precioDolarConAumento = Math.floor(precioDolarVenta * 1.15);
                let precioEnPesos = precioDolar * precioDolarConAumento;
                let elementoMonto = document.querySelectorAll('p.monto')[i];
                elementoMonto.textContent = `$${precioEnPesos.toLocaleString('es-AR', { minimumFractionDigits: 0 })}`;
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
            <div class="contenedor-dolar">
                <p class="montoUSD">U$D</p>
                <p class="montoUSD preciodolar">${producto.precio}</p>
            </div>
            <div class="contenedor-imagen-producto">     
                <img src="${producto.img}" class="imagen_producto">
                <p class="producto-marca">${producto.marca}</p>
            </div>
            
            <div class="producto-contenedor-titulo">
                <p class="producto-nombre">${producto.modelo}</p>

                <div class="precio_info">
                    <div class="precio">
                        <p class="monto"></p>
                    </div>            
                </div>
            </div>
            
            <div class="talles-contenedor">
                <p class="titulo">Elige un talle</p>
                <div class="contenedor-botones-talle">
                    ${botonesTalles}
                </div>
            </div>
            
            <div class="btn_comprarinfo">
                <a class="boton_comprar" data-id="${producto.id}"><i class="fa-solid fa-bag-shopping"></i> Agregar al carrito</a>                        
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
    const botonesTalle = document.querySelectorAll('.boton_talle');
    // Marcamos el botón de talle seleccionado
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
    const carritoNum = document.querySelectorAll(".carro-compras__items");
    const carritoVacio = document.querySelector(".carrito-vacio");
    const botonesLi = document.querySelector('.botones-li');
    const precioTotalHTML = document.querySelector(".total");
    const realizarPedido = document.querySelector(".realizar-pedido");
    let mensajeWpp = {};

    let precioTotal = 0;
    precioTotalHTML.textContent = precioTotal;
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
    
    // Función para actualizar el mensaje de WhatsApp con los datos del carrito
    function actualizarMensajeWpp() {
        let mensaje = "Hola, me llamo ____ y quiero realizar la siguiente compra:\n\n";
        let precioTotal = 0;
        
        articulosCarrito.forEach(producto => {
            let subtotal = producto.cantidad * parseFloat(producto.precio.replace(/[^\d]/g, ''));
            mensaje += `${producto.nombre} - Talle ${producto.talle} - (${producto.cantidad}) = $${subtotal.toLocaleString('es-AR')}\n`;
            precioTotal += subtotal;
        });

        mensaje += `\nTotal = $${precioTotal.toLocaleString('es-AR')}`;

        mensajeWpp = mensaje;
    }

    // Función para generar el enlace de WhatsApp con el mensaje personalizado
    function generarEnlaceWpp() {
        const numeroWhatsApp = "3517866925";
        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}/?text=${encodeURIComponent(mensajeWpp)}`;
        realizarPedido.href = enlaceWhatsApp;
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
            createToast("error");
            const talleSeleccionadoTemporal = document.querySelector(".talle_seleccionado");
            
            if(talleSeleccionadoTemporal) {
                talleSeleccionadoTemporal.classList.remove("talle_seleccionado");
            }

            return;
        }
        createToast("success");

        let precioString = producto.querySelector(".monto").textContent; // Valor del precio en formato "$118.400"
        let precioNumerico = parseFloat(precioString.replace(/[^\d]/g, ''));

        precioTotal += precioNumerico;
        let precioFormateado = precioTotal.toLocaleString('es-AR');
        precioTotalHTML.textContent = precioFormateado;

        const talleSeleccionado = btnTalle.textContent;

        // Comprobar si el producto ya está en el carrito con el mismo talle
        const productoExistente = articulosCarrito.find(item => item.nombre === producto.querySelector(".producto-nombre").textContent && item.talle === talleSeleccionado);


        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            const infoProducto = {
                id: producto.querySelector(".boton_comprar").dataset.id,
                imagen: producto.querySelector(".imagen_producto").src,
                nombre: producto.querySelector(".producto-nombre").textContent,
                precio: (producto.querySelector(".monto").textContent),
                talle: talleSeleccionado,
                cantidad: 1
            }
            // Agrega elementos al arreglo de carrito
            articulosCarrito = [...articulosCarrito, infoProducto];
        }
        
        btnTalle.classList.remove("talle_seleccionado");

        carritoHTML();

        actualizarMensajeWpp();
        generarEnlaceWpp();
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains("eliminar-producto")) {
            const productoId = e.target.getAttribute("data-id");
            const talleProducto = e.target.getAttribute("data-talle");
            const productoEliminado = e.target.closest('.carrito-li'); // Buscar el contenedor del producto eliminado
            const cantidadProductoEliminado = parseInt(productoEliminado.querySelector('.cantidad').textContent);
            const precioProductoEliminado = parseFloat(productoEliminado.querySelector(".precio").textContent.replace(/[^\d]/g, ''));
            articulosCarrito = articulosCarrito.filter(articulo => !(articulo.id === productoId && articulo.talle === talleProducto));
    
            // Restar el precio del producto eliminado multiplicado por la cantidad eliminada del precio total
            precioTotal -= (precioProductoEliminado * cantidadProductoEliminado);
            let precioFormateado = precioTotal.toLocaleString('es-AR');
            precioTotalHTML.textContent = precioFormateado;
            carritoHTML();

            actualizarMensajeWpp();
            generarEnlaceWpp();
        }
    }

    function carritoHTML() {

        // Limpiar el HTML
        limpiarHTML();

        const numeroDeProductos = articulosCarrito.length;

        carritoNum.forEach(numero => {
            numero.innerHTML = numeroDeProductos;
        });

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
                    <img src="${producto.imagen}" class="imagen_miniatura" alt="Imagen Producto"/>
                    <div class="producto-info">
                        <p class="producto-info__nombre">${producto.nombre}</p>
                        <p class="producto-info__talle">Talle: ${producto.talle}</p>
                        <div class="cantidad-productos">
                            <button class="boton-restar btn-cantidad">-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="boton-sumar btn-cantidad">+</button>
                        </div>
                    </div>
                </div>
                <div class="contenedor-producto-derecha">
                    <div class="precio">${producto.precio}</div>
                    <i data-id="${producto.id}" data-talle="${producto.talle}" class="eliminar-producto fa-solid fa-trash"></i>
                </div>
            `;

            contenedorProductos.appendChild(li);

            // Obtener elementos de botón de restar y sumar dentro del artículo
            const botonRestar = li.querySelector('.boton-restar');
            const botonSumar = li.querySelector('.boton-sumar');
            const cantidadSpan = li.querySelector('.cantidad');

            
            let precioProducto = producto.precio

            // Restar el precio del producto eliminado multiplicado por la cantidad eliminada del precio total
            let precioFormateado = precioTotal.toLocaleString('es-AR');
            precioTotalHTML.textContent = precioFormateado;

            // Añadir listeners para cambiar la cantidad
            botonRestar.addEventListener('click', () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                    cantidadSpan.textContent = producto.cantidad;
                    precioTotal -= parseFloat(precioProducto.replace(/[^\d]/g, ''));
                    let precioFormateado = precioTotal.toLocaleString('es-AR');
                    precioTotalHTML.textContent = precioFormateado;
                    actualizarMensajeWpp();
                    generarEnlaceWpp();
                }
            });

            botonSumar.addEventListener('click', () => {
                producto.cantidad++;
                cantidadSpan.textContent = producto.cantidad;
                precioTotal += parseFloat(precioProducto.replace(/[^\d]/g, ''));
                let precioFormateado = precioTotal.toLocaleString('es-AR');
                precioTotalHTML.textContent = precioFormateado;
                actualizarMensajeWpp();
                generarEnlaceWpp();
            });

        });
    }

    function vaciarCarrito() {
        articulosCarrito = [];
        precioTotal = 0;
        precioTotalHTML.textContent = precioTotal;
        carritoNum.forEach(numero => {
            numero.textContent = 0;
        });
        
        limpiarHTML();

        carritoHTML();
    }

    function limpiarHTML() {
        while(contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
    }

}