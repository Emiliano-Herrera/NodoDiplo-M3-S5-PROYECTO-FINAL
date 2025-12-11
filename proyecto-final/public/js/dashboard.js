// Eliminar pais
async function confirmarEliminacion(id, nombre) {
    const result = await Swal.fire({
        title: `¿Eliminar a ${nombre}?`,
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
        eliminarPais(id, nombre);
    }
}

async function eliminarPais(id, nombre) {
    try {
        const response = await fetch(`eliminarPais/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await Swal.fire("Eliminado", `Pais ${nombre} eliminado exitosamente`, "success");
            window.location.reload();
        } else {
            await Swal.fire("Error", "No se pudo eliminar el pais", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        await Swal.fire("Error", "Hubo un problema al eliminar el pais", "error");
    }
}


//PAGINACION
let paginaActual = 1;
let itemsPorPagina = 4;
let totalItems = window.paises.length;

function inicializarPaginacion() {
    mostrarPagina(1);
    actualizarBotonesPaginacion();
}

function mostrarPagina(numeroPagina) {
    const tarjetas = document.querySelectorAll('.pais-carta');
    const inicio = (numeroPagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;

    tarjetas.forEach((tarjeta, index) => {
        if (index >= inicio && index < fin) {
            tarjeta.style.display = 'flex';
        } else {
            tarjeta.style.display = 'none';
        }
    });
    
    paginaActual = numeroPagina;
    actualizarInfoPaginacion();
    actualizarBotonesPaginacion();
    generarNumerosPagina();
    
}

function actualizarInfoPaginacion() {
    const inicio = (paginaActual - 1) * itemsPorPagina + 1;
    const fin = Math.min(paginaActual * itemsPorPagina, totalItems);
    
    document.getElementById('paginacion-inicio').textContent = inicio;
    document.getElementById('paginacion-fin').textContent = fin;
    document.getElementById('paginacion-total').textContent = totalItems;
}

function actualizarBotonesPaginacion() {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    
    document.getElementById('btn-primera').disabled = paginaActual === 1;
    document.getElementById('btn-anterior').disabled = paginaActual === 1;
    document.getElementById('btn-siguiente').disabled = paginaActual === totalPaginas;
    document.getElementById('btn-ultima').disabled = paginaActual === totalPaginas;
}

document.getElementById('paginacionNumeros').addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-numero-pagina')) {
        const numero = parseInt(e.target.textContent);
        irAPagina(numero);
    }
});

function generarNumerosPagina() {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    const contenedor = document.getElementById('paginacionNumeros');
    contenedor.innerHTML = '';
    
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, paginaActual + 2);
    
    if (inicio > 1) {
        contenedor.innerHTML += '<span class="paginacion-puntos">...</span>';
    }
    
    for (let i = inicio; i <= fin; i++) {
        const boton = document.createElement('button');
        boton.className = 'boton-numero-pagina' + (i === paginaActual ? ' activo' : '');
        boton.textContent = i;
        contenedor.appendChild(boton);
    }
    
    if (fin < totalPaginas) {
        contenedor.innerHTML += '<span class="paginacion-puntos">...</span>';
    }
}

function cambiarPagina(direccion) {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    const nuevaPagina = paginaActual + direccion;
    
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        mostrarPagina(nuevaPagina);
    }
}

function irAPagina(numeroPagina) {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
        mostrarPagina(numeroPagina);
    }
}

function irAUltimaPagina() {
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    mostrarPagina(totalPaginas);
}

function cambiarItemsPorPagina() {
    const select = document.getElementById('items-por-pagina');
    itemsPorPagina = parseInt(select.value);
    mostrarPagina(1);
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', inicializarPaginacion);