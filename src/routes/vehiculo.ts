import { Router } from 'express';
import { deleteVehiculo, getVehiculo, insertVehiculo } from '../controllers/vehiculo';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getVehiculo)
router.post('/insert', validateToken, insertVehiculo);
router.post('/eliminar', validateToken, deleteVehiculo);

export default router;