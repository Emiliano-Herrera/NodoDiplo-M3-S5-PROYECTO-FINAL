let contadoresArray = {
    capital: 0,
    lenguajes: 0,
    zonasHorarias: 0,
    paisesVecinos: 0
};


// Agregar items a arrays
function añadirItem(tipo) {
    const contenedor = document.getElementById(`${tipo}Contenedor`);
    const id = contadoresArray[tipo]++;

    const div = document.createElement("div");
    div.className = "array-input-grupo";
    div.id = `${tipo}-${id}`;

    // zonas hoaraias
    if (tipo === "zonasHorarias") {

        // Select + o -
        const selectSigno = `
            <select name="zonaSigno[]" class="select-signo">
                <option value="+">UTC+</option>
                <option value="-">UTC-</option>
            </select>
        `;

        // Select de horas
        const horarios = [
            "00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30",
            "04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30",
            "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
            "12:00","12:30","13:00","13:30","14:00"
        ];

        let opcionesHorarios = horarios.map(h => `<option value="${h}">${h}</option>`).join("");

        const selectHora = `
            <select name="zonaHora[]" class="select-hora">
                ${opcionesHorarios}
            </select>
        `;

        div.innerHTML = `
            ${selectSigno}
            ${selectHora}
            <button type="button" class="boton-remover" onclick="quitarItem('${tipo}', ${id})">
                Eliminar
            </button>
        `;

    } else {
        // arrays normales
        div.innerHTML = `
            <input type="text" name="${tipo}[]">
            <button type="button" class="boton-remover" onclick="quitarItem('${tipo}', ${id})">
                Eliminar
            </button>
        `;
    }

    contenedor.appendChild(div);
}


// Eliminar items de arrays
function quitarItem(tipo, id) {
    const contenedorAux = document.getElementById(`${tipo}Contenedor`);
    const itemsAux = contenedorAux.querySelectorAll('.array-input-grupo');

    if(tipo === 'capital' && itemsAux.length === 1){
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debe existir al menos una capital.',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    if(tipo === 'lenguajes' && itemsAux.length === 1){
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debe existir al menos un lenguaje.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    const element = document.getElementById(`${tipo}-${id}`);

    if (element) {
        element.remove();
    }
}

const errorNombrePais = document.getElementById('error-nombrePais');
const errorNombreOficial = document.getElementById('error-nombreOficial');
const errorCapital = document.getElementById('error-capital');
const errorHabitantes = document.getElementById('error-habitantes');
const errorGini = document.getElementById('error-gini');
const errorRegion = document.getElementById('error-region');
const errorSubregion = document.getElementById('error-subregion');
const errorLenguajes = document.getElementById('error-lenguajes');
const errorLatlng = document.getElementById('error-latlng');
const errorArea = document.getElementById('error-area');
const errorZonasHorarias = document.getElementById('error-zonasHorarias');
const errorPaisesVecinos = document.getElementById('error-paisesVecinos');
const errorCreador = document.getElementById('error-creador');

function validarForm() {
    let esValido = true;

    // Ocultar errores anteriores
    errorNombrePais.style.display = "none";
    errorNombreOficial.style.display = "none";
    errorCapital.style.display = "none";
    errorHabitantes.style.display = "none";
    errorGini.style.display = "none";
    errorRegion.style.display = "none";
    errorSubregion.style.display = "none";
    errorLenguajes.style.display = "none";
    errorLatlng.style.display = "none";
    errorArea.style.display = "none";
    errorZonasHorarias.style.display = "none";
    errorPaisesVecinos.style.display = "none";
    errorCreador.style.display = "none";

    const nombrePais = document.getElementById('nombrePais').value.trim();
    const nombreOficial = document.getElementById('nombreOficial').value.trim();
    const capitales = document.querySelectorAll('input[name="capital[]"]');
    const habitantes = document.getElementById('habitantes').value;
    const gini = document.getElementById('gini').value;
    // const region = document.getElementById('region').value.trim();           //opcionales
    // const subregion = document.getElementById('subregion').value.trim();     //opcionales
    const lenguajes = document.querySelectorAll('input[name="lenguajes[]"]');
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    const area = document.getElementById('area').value;
    // const zonasHorarias = document.querySelectorAll('input[name="zonasHorarias[]"]'); //opcionales
    const paisesVecinos = document.querySelectorAll('input[name="paisesVecinos[]"]');
    // const creador = document.getElementById('creador').value.trim(); //opcionales

    if (!nombrePais) {
        errorNombrePais.textContent = 'El nombre del Pais debe ser válido';
        errorNombrePais.style.display = "block";
        esValido = false;
    } else if (nombrePais.length < 3 || nombrePais.length > 90) {
        errorNombrePais.textContent = 'El nombre del Pais debe tener entre 3 y 90 caracteres';
        errorNombrePais.style.display = "block";
        esValido = false;
    }

    if (!nombreOficial) {
        errorNombreOficial.textContent = 'El nombre oficial debe ser válido';
        errorNombreOficial.style.display = "block";
        esValido = false;
    } else if (nombreOficial.length < 3 || nombreOficial.length > 90) {
        errorNombreOficial.textContent = 'El nombre oficial debe tener entre 3 y 90 caracteres';
        errorNombreOficial.style.display = "block";
        esValido = false;
    }

    if (capitales.length === 0) {
        errorCapital.textContent = 'La capital debe ser válida';
        errorCapital.style.display = "block";
        esValido = false;
    } else {
        capitales.forEach(capital => {
            const valor = capital.value.trim();
            if(valor.length < 3 || valor.length > 90){
                errorCapital.textContent = 'Cada capital debe tener entre 3 y 90 caracteres';
                errorCapital.style.display = "block";
                esValido = false;
            }
        })
    }

    if (!habitantes) {
        errorHabitantes.textContent = 'El valor de habitantes debe ser válido';
        errorHabitantes.style.display = "block";
        esValido = false;
    } else if( habitantes <= 0 || !Number.isInteger(Number(habitantes))){
        errorHabitantes.textContent = 'El valor de habitantes debe ser un número entero positivo';
        errorHabitantes.style.display = "block";
        esValido = false;
    }

    if (gini < 0 || gini > 100){
        errorGini.textContent = 'El valor de Gini debe ser un número entre 0 y 100';
        errorGini.style.display = "block";
        esValido = false;
    }

    if (lenguajes.length === 0) {
        errorLenguajes.textContent = 'El lenguaje debe ser válida';
        errorLenguajes.style.display = "block";
        esValido = false;
    } else {
        lenguajes.forEach(lenguaje => {
            const valor = lenguaje.value.trim();
            if(!isNaN(valor) || valor.length === 0){
                errorLenguajes.textContent = 'Cada lenguaje debe ser un string válido';
                errorLenguajes.style.display = "block";
                esValido = false;
            }
        })
    }

    if (!latitud || !longitud) {
        errorLatlng.textContent = 'La latitud y longitud deben ser válidas';
        errorLatlng.style.display = "block";
        esValido = false;
    } else if (isNaN(latitud) || isNaN(longitud)) {
        errorLatlng.textContent = 'La latitud y longitud deben ser números válidos';
        errorLatlng.style.display = "block";
        esValido = false;
    }

    if (!area) {
        errorArea.textContent = 'El valor de area debe ser válido';
        errorArea.style.display = "block";
        esValido = false;
    } else if( area <= 0){
        errorArea.textContent = 'El valor de area debe ser un número positivo';
        errorArea.style.display = "block";
        esValido = false;
    }

    paisesVecinos.forEach(vecino => {
        const valor = vecino.value.trim();
        if(valor.length !== 3 || valor !== valor.toUpperCase()){
            errorPaisesVecinos.textContent = 'Cada pais vecino debe tener entre 3 caracteres en mayúscula';
            errorPaisesVecinos.style.display = "block";
            esValido = false;
        }
    })
    
    return esValido;
}



// Manejar envío del formulario
document.getElementById('paisForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if(validarForm()){

        const pais = {

            pais: document.getElementById('nombrePais').value.trim(),
            nombreOficial: document.getElementById('nombreOficial').value.trim(),
            capital: [],
            habitantes: parseInt(document.getElementById('habitantes').value),
            gini: parseFloat(document.getElementById('gini').value),
            region: document.getElementById('region').value.trim(),
            subRegion: document.getElementById('subregion').value.trim(),
            lenguajes: [],
            latitudLongitud: [
                parseFloat(document.getElementById('latitud').value),
                parseFloat(document.getElementById('longitud').value)
            ],
            area: parseFloat(document.getElementById('area').value),
            zonasHorarias: [],
            paisesVecinos: [],
            creador: document.getElementById('creador').value.trim(),
        };

        document.querySelectorAll('input[name="capital[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.capital.push(input.value.trim());
            }
        });

        document.querySelectorAll('input[name="lenguajes[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.lenguajes.push(input.value.trim());
            }
        });

        const signos = document.querySelectorAll('select[name="zonaSigno[]"]');
        const horas = document.querySelectorAll('select[name="zonaHora[]"]');

        signos.forEach((select, i) => {
            const signo = select.value;
            const hora = horas[i].value;
            pais.zonasHorarias.push(`UTC${signo}${hora}`);
        });
        
        document.querySelectorAll('input[name="paisesVecinos[]"]').forEach(input => {
            if (input.value.trim()) {
                pais.paisesVecinos.push(input.value.trim());
            }
        });
        
        console.log(pais);
        // deshabilitar boton y cambiar texto
        const enviarBoton = document.querySelector('.boton-agregar');
        enviarBoton.disabled = true;
        enviarBoton.textContent = 'Creando...';
        debugger;
        try {
            const response = await fetch('/api/crear-pais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pais)
            });

            const data = await response.json();

            if (response.ok) {
                
                await Swal.fire({
                    title: '¡Pais creado!',
                    text: `El Pais ${pais.pais} se creó exitosamente.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    timer: 2500,
                    timerProgressBar: true
                });

                window.location.href = '/api/dashboard';

            } else {

                await Swal.fire({
                    title: 'Error',
                    text: data.mensaje || 'Error al crear el pais.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });

                enviarBoton.disabled = false;
                enviarBoton.textContent = 'Crear Pais';

            }
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
                title: 'Error de conexión',
                text: 'Por favor, intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

            enviarBoton.disabled = false;
            enviarBoton.textContent = 'Crear Pais';

        }

        
        
    }else{
        Swal.fire({
            title: 'Formulario inválido',
            text: 'Por favor revisa los campos antes de continuar.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }

});

// Agregar un poder por defecto al cargar
window.addEventListener('DOMContentLoaded', () => {
    añadirItem('capital');
    añadirItem('lenguajes');
});