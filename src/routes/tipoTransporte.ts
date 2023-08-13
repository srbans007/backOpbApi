import { Router } from 'express';
import { deleteTipoTransporte, getTipoTransporte, insertTipoTransporte } from '../controllers/tipoTransporte';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTipoTransporte)
router.post('/insert', validateToken, insertTipoTransporte);
router.post('/eliminar', validateToken, deleteTipoTransporte);

export default router;