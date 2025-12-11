
import PaisesRepository from "../repositories/PaisRepository.mjs";

export async function obtenerPaisesDesdeApi() {
    return await PaisesRepository.obtenerDesdeApi()
}

export async function insertarPaisDesdeApi(datosPais) {
    return await PaisesRepository.insertarDesdeApi(datosPais)
}

export async function obtenerTodosLosPaises() {
    return await PaisesRepository.obtenerTodos();
}

export async function obtenerPaisPorId(id) {
    return await PaisesRepository.obtenerPorId(id);
}

export async function buscarPaisPorAtributo(atributo, valor) {
    return await PaisesRepository.buscarPorAtributo(atributo, valor)
}

export async function crearPais(datosPais) {
    return await PaisesRepository.crear(datosPais);
}

export async function actualizarPais(id, datosPais){
    return await PaisesRepository.actualizar(id, datosPais);
}

export async function eliminarPaisPorId(id) {
    return await PaisesRepository.eliminar(id);
}
