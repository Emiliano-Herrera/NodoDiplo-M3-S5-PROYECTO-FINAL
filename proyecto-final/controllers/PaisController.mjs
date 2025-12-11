import { obtenerPaisesDesdeApi, insertarPaisDesdeApi, obtenerTodosLosPaises, crearPais, actualizarPais, eliminarPaisPorId, buscarPaisPorAtributo, obtenerPaisPorId } from "../services/PaisService.mjs";
import { renderizarPaises, renderizarPais } from '../views/responseView.mjs';

// Controlador para página Index
export async function indexController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        
        // Enviamos todos los superhéroes y hacemos los filtros en el EJS
        res.render('index', {
            title: 'Inicio - App Paises',
            currentPage: 'inicio',
            paises: paises || [] // Aseguramos que siempre sea un array
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar la página Inicio', error: error.message });
    }
}

// Controlador para insertar paises
export async function insertarPaisesAPIController(req, res) {
    try {

        const paises = await obtenerPaisesDesdeApi();

        const paisInsertado = await insertarPaisDesdeApi(paises);

        res.status(201).json({mensaje: 'pais insertado correctamente', paisInsertado})

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al insertar el pais desde la API', error: error.message });
    }
}

// Controlador para página Contacto
export async function dashboardController(req, res) {
    try {

        const paises = await obtenerTodosLosPaises();

        return res.render('dashboard', {
            paises,
            title: 'Listado de paises',
            currentPage: 'dashboard'
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar la página de dashboard', error: error.message });
    }
}

// Controlador para mostrar el formulario de agregar superhéroe
export async function mostrarFormularioAgregarController(req, res) {
    try {
        res.render('addPais', {
            title: 'Agregar pais'
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario para agregar un pais', error: error.message });
    }
}

// Controlador para mostrar el formulario de editar pais
export async function mostrarFormularioEditarController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send({ mensaje: 'pais no encontrado' });
        }

        res.render('editPais', { pais, title: 'editar pais' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario de edición de un pais', error: error.message });
    }
}

// crear un Pais
export async function crearPaisController(req, res) {
    try {
        const { nombreOficial } = req.body;
        const existe = await buscarPaisPorAtributo('nombreOficial', nombreOficial);

        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un pais con ese nombre oficial' });
        }

        const nuevoPais = req.body;
        const paisCreado = await crearPais(nuevoPais);
        const paisFormateado = renderizarPais(paisCreado); 

        res.status(201).json({
            mensaje: 'Pais creado correctamente',
            superheroe: paisFormateado 
        })

    } catch(error) {
        res.status(500).send({ mensaje: 'Error al crear pais y mostrarlo.', error: error.menssage });
    }
}

// actualizar el pais por id
export async function actualizarPaisController(req, res) {
    try {

        const {id} = req.params;
        const datosActualizados = req.body;

        const paisActualizado = await actualizarPais(id, datosActualizados);

        if (!paisActualizado) {
            return res.status(404).send({ mensaje: 'Pais no encontrado para actualizar' });
        }

        const paisFormateado = renderizarPais(paisActualizado);

        res.status(200).json({
            mensaje: 'Pais actualizado exitosamente',
            data: paisFormateado
        });

    } catch(error) {
        if (error.message === 'Pais no encontrado') {
            return res.status(404).send({ mensaje: error.message });
        }
        res.status(400).send({ 
            mensaje: 'Error al actualizar el pais', 
            error: error.message 
        });
    }
}

// eliminar un pais por id
export async function eliminarPaisController(req, res) {
    try {
        
        const {id} = req.params;

        const paisEliminado = await eliminarPaisPorId(id);

        if (!paisEliminado) {
            return res.status(404).send({ mensaje: "Pais no encontrado para eliminar" });
        }

        const paisFormateado = renderizarPais(paisEliminado);

        res.status(200).json({
            mensaje: 'Pais eliminado exitosamente',
            data: paisFormateado
        });

    } catch (error) {

        res.status(500).send({ 
            mensaje: 'Error al eliminar el superhéroe el pais', 
            error: error.message 
        });

    }
}

