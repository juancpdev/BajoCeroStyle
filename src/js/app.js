document.addEventListener('DOMContentLoaded', function() {
// Verificar si estamos en el index.html antes de ejecutar las funciones específicas
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    // Ejecutar las funciones específicas para index.html
    dolar();
    
    filtroProductos();
    productos();
}
menuMobile();
});

// año copy
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;

function cerrarLightbox() {
    console.log("asdasd");
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('no-display');
}


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

function filtroProductos() {
    
    let productosFiltrados = stock;
    let filtrados = [];

    // Filtrar Producto por tipo
    const filtros = document.querySelectorAll('.categorias');
    const filtrosHijos = document.querySelectorAll('.categorias p');
    const spinner = document.querySelector(".spinner-contenedor");
    
    filtros.forEach( tipo => {
        tipo.addEventListener('click', filtrarProducto);
    })
    
    function filtrarProducto(e) {
        const filtro = e.target.dataset.tipo;
        
        if (e.target.classList.contains('activo')) {
            return;
        }
        
        filtrosHijos.forEach(tipo => {
            tipo.classList.remove('activo');
        });
        
        // Agregar la clase 'activo' al elemento clicado
        e.target.classList.add('activo');
        
        if(filtro !== "") {
            filtrados = productosFiltrados.filter( producto => producto.tipo === filtro);
        } else {
            filtrados = [];
        }
        mostrarProductos();

    }

    function mostrarProductos() {
        spinner.classList.add("spinner-activo");
        const arrayLenght = filtrados.length ? filtrados : productosFiltrados;
        
        setTimeout(() => {
            spinner.classList.remove("spinner-activo");
            dolar();
            limpiarProductos();
            productos(arrayLenght);
        }, 300);
        
    }
    
    function limpiarProductos() {
        const contenedor = document.querySelector(".contenedor_productos");
    
        while(contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }
}


function productos(filtrado = []) { // Ahora acepta un parámetro opcional filtrado

    let htmlVista = "";

    const productosMostrar = filtrado.length ? filtrado : stock; // Usamos el filtrado si está presente
    
    productosMostrar.forEach((producto, i) => {

        const marcaHTML = producto.marca ? `<p class="producto-marca">${producto.marca}</p>` : '';

        // Convertimos el array de talles en botones
        const botonesTalles = producto.talles.map((talle) => {
            return `<div><button class="boton_talle" data-tipo="${producto.tipo}" data-talle="${talle}">${talle}</button></div>`;
        }).join('');
        htmlVista += `
        <div class="productos">
            <div class="contenedor-dolar">
                <p class="montoUSD">U$D</p>
                <p class="montoUSD preciodolar">${producto.precio}</p>
            </div>
            <div class="contenedor-imagen-producto" onclick="openModal('producto${i+1}')">     
                <img src="${producto.img}" class="imagen_producto" alt="Imagen del producto"/>
                <div class="secondary-images">
                    <img class="img-secu producto${i+1}-image" src="${producto.img}"/>
                    <img class="img-secu producto${i+1}-image" src="${producto.imagenesExtras[0]}"/>
                    <img class="img-secu producto${i+1}-image" src="${producto.imagenesExtras[1]}"/>
                </div>
                ${marcaHTML}
            </div>
            <p class="producto-tipo no-display">${producto.tipo}</p>
            <div class="producto-contenedor-titulo">
                <p class="producto-nombre">${producto.modelo}</p>

                <div class="precio_info">
                    <div class="precio">
                        <p class="monto"></p>
                    </div>            
                </div>
            </div>
            
            <div class="talles-contenedor">
                <p class="titulo">Elige un talle (AR)</p>
                <div class="contenedor-botones-talle">
                    <div class="contenedor-botones-talle-hijo">
                        ${botonesTalles}
                    </div>
                </div>
            </div>
            
            <div class="btn_comprarinfo">
                <a class="boton_comprar" data-id="${producto.id}"><i class="fa-solid fa-bag-shopping"></i> Agregar al carrito</a>                        
            </div>
        </div>`;
    });

    const contenedor = document.getElementById("contenedorProductos");
    if(contenedor) {
        contenedor.innerHTML = htmlVista;
    }

    // Agregamos un event listener para los botones de talle
    const botonesTalle = document.querySelectorAll('.boton_talle');
    botonesTalle.forEach((boton) => {
        boton.addEventListener('click', seleccionarTalle);
    });

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

    // Local Storage
    precioTotal = JSON.parse(localStorage.getItem("total")) || 0;
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
        const numeroWhatsApp = "543854448265";
        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}/?text=${encodeURIComponent(mensajeWpp)}`;
        realizarPedido.href = enlaceWhatsApp;
    }

    function abrirCarrito(e) {
        carritoDeCompras.classList.add("carrito-abierto");
        const fondoOverlay = document.createElement('div');
        const contenedorFondo = document.querySelector(".contenedor-overlay");
        fondoOverlay.classList.add('fondo-overlay');
        
        while(contenedorFondo.firstChild) {
            contenedorFondo.removeChild(contenedorFondo.firstChild);
        }

        contenedorFondo.appendChild(fondoOverlay);
        contenedorFondo.classList.add('no-scroll');

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
                tipo: (producto.querySelector(".producto-tipo").textContent),
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
            const tipoProducto = e.target.getAttribute("data-tipo");
            const productoEliminado = e.target.closest('.carrito-li'); // Buscar el contenedor del producto eliminado
            const cantidadProductoEliminado = parseInt(productoEliminado.querySelector('.cantidad').textContent);
            const precioProductoEliminado = parseFloat(productoEliminado.querySelector(".precio").textContent.replace(/[^\d]/g, ''));

            articulosCarrito = articulosCarrito.filter(articulo => !(articulo.id === productoId && articulo.talle === talleProducto && articulo.tipo === tipoProducto));

            // Restar el precio del producto eliminado multiplicado por la cantidad eliminada del precio total
            precioTotal -= (precioProductoEliminado * cantidadProductoEliminado);
            let precioFormateado = precioTotal.toLocaleString('es-AR');
            precioTotalHTML.textContent = precioFormateado;
            carritoHTML();
            sincronizarStorage();
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
                    <div class="contenedor-precio-cant">
                        <p class="unidad">Unidad</p>
                        <div class="precio">${producto.precio}</div>
                    </div>
                    <i data-id="${producto.id}" data-talle="${producto.talle}" data-tipo="${producto.tipo}" class="eliminar-producto fa-solid fa-trash"></i>
                </div>
            `;

            contenedorProductos.appendChild(li);

            // Agregar el carrito al Storage
            sincronizarStorage();

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
                    sincronizarStorage();
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
                sincronizarStorage();
            });

        });
    }

    function sincronizarStorage() {
        localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
        localStorage.setItem("total", JSON.stringify(precioTotal));
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

        sincronizarStorage();
    }

    function limpiarHTML() {
        while(contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
    }


    function seleccionarTalle(e) {
        // Marcamos el botón de talle seleccionado
        botonesTalle.forEach((boton) => {
            boton.classList.remove('talle_seleccionado');
        });
        const botonSeleccionado = e.target;
        botonSeleccionado.classList.add('talle_seleccionado');
    }

        // Agregar un event listener para los botones de talle
        botonesTalle.forEach((boton) => {
            boton.addEventListener('mouseover', mostrarInfoExtra);
            boton.addEventListener('mouseout', ocultarInfoExtra);
        });
    
        function mostrarInfoExtra(e) {
            const talleSeleccionado = e.target.textContent;
            const tipoSeleccionado = e.target.dataset.tipo;
            const infoExtra = obtenerInfoExtra(talleSeleccionado, tipoSeleccionado);
            // Crear un elemento div para mostrar la información extra
            const infoExtraDiv = document.createElement('div');
            infoExtraDiv.classList.add('info-extra');
            const infoExtraText = document.createElement('p');
            infoExtraText.textContent = infoExtra;
            infoExtraDiv.appendChild(infoExtraText);
            // Agregar el elemento div al DOM, por ejemplo, como hijo del botón de talle
            e.target.parentElement.appendChild(infoExtraDiv);
        }
    
        function ocultarInfoExtra(e) {
            // Remover el elemento div de información extra al salir del botón de talle
            const infoExtraDiv = e.target.parentElement.querySelector('.info-extra');
            if (infoExtraDiv) {
                infoExtraDiv.remove();
            }
        }
    
        function obtenerInfoExtra(talle, tipoSeleccionado) {
            let medidas = {};

            if (tipoSeleccionado === 'zapatilla') {
                medidas = {
                    '39': 'US: 7 \nCM: 25',
                    '40': 'US: 8 \nCM: 26',
                    '41': 'US: 8.5 \nCM: 26.5',
                    '42': 'US: 9.5 \nCM: 27.5',
                    '43': 'US: 10 \nCM: 28',
                    '44': 'US: 11 \nCM: 29',
                };
            } else if (tipoSeleccionado === 'remera') {
                medidas = {
                    'S': 'Largo: 72 cm \nAncho: 62 cm',
                    'M': 'Largo: 74 cm \nAncho: 64 cm',
                    'L': 'Largo: 74 cm \nAncho: 68 cm',
                    'XL': 'Largo: 76 cm \nAncho: 70 cm',
                };
            } else if (tipoSeleccionado === 'buzo') {
                medidas = {
                    'M': 'Largo: 68 cm \nAncho: 61 cm',
                    'L': 'Largo: 71 cm \nAncho: 63 cm',
                    'XL': 'Largo: 74 cm \nAncho: 65 cm',
                    'XXL': 'Largo: 78 cm \nAncho: 64 cm',
                };
            }
            // Obtener las medidas para el talle dado
            return medidas[talle];
        }
        
}

// Galeria proyectos
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modal-image");

let currentProject = "";
let currentImageIndex = 0;

function openModal(project) {
    modal.style.display = "grid";
    currentProject = project;
    currentImageIndex = 0;
    showImage(currentImageIndex);
    document.body.classList.add('no-scroll');
    setTimeout(() => {
        modal.classList.add("mostrar"); // Agregar la clase mostrar después de un breve retraso para que la transición se ejecute correctamente
    }, 100); // Se puede ajustar el tiempo según sea necesario
}

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        modal.classList.remove("mostrar"); // Agregar la clase mostrar después de un breve retraso para que la transición se ejecute correctamente
    }, 100);
}

function plusSlides(n) {
    showImage(currentImageIndex += n);
}

function showImage(n) {
    let images = document.querySelectorAll("." + currentProject + "-image");
    if (images.length === 0) {
        console.error("No se encontraron imágenes asociadas al proyecto: " + currentProject);
        return;
    }
    if (n >= images.length) {
        currentImageIndex = 0; // Vuelve a la primera imagen secundaria
    }
    if (n < 0) {
        currentImageIndex = images.length - 1; // Muestra la última imagen secundaria
    }
    modalImg.src = images[currentImageIndex].src;
}