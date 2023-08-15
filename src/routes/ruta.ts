import { Router } from 'express';
import { deleteRuta, getRuta, insertRuta, updateRuta } from '../controllers/ruta';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getRuta)
router.post('/insert', validateToken, insertRuta);
router.post('/eliminar', validateToken, deleteRuta);
router.post('/update', validateToken, updateRuta);

export default router;