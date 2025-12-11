import express from 'express';

import { 
    indexController, dashboardController, mostrarFormularioAgregarController, 
    mostrarFormularioEditarController, insertarPaisesAPIController, actualizarPaisController,
    crearPaisController, eliminarPaisController 
} from '../controllers/PaisController.mjs';
import { validarPais, validarId } from '../validation/validationRules.js';
import { handleValidationErrors } from '../validation/errorMiddleware.js';

const router = express.Router();

router.get('/', indexController);
router.get('/dashboard', dashboardController);
router.get('/pais/nuevo', mostrarFormularioAgregarController);
router.get('/pais/editar/:id', mostrarFormularioEditarController);

router.post('/api-insert', insertarPaisesAPIController);
router.post('/crear-pais',  validarPais(), handleValidationErrors, crearPaisController);

router.put('/actualizarPais/:id', validarId(), validarPais(), handleValidationErrors, actualizarPaisController);
router.delete('/eliminarPais/:id', validarId(), handleValidationErrors, eliminarPaisController);

export default router;