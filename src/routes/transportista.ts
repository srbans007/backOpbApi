import { Router } from 'express';
import { deleteTransportista, getTransportista, insertTransportista } from '../controllers/transportista';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTransportista)
router.post('/insert', validateToken, insertTransportista);
router.post('/eliminar', validateToken, deleteTransportista);

export default router;