import { Router } from 'express';
import { getBuscarGuia, getDatosGuiaRuta, getTroncal, insertTroncal, updateTroncal, getSeguimientoTroncal } from '../controllers/cargaTroncal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTroncal)
router.get('/buscar', validateToken, getBuscarGuia);
router.get('/guiaRuta', validateToken, getDatosGuiaRuta);
router.get('/seguimiento', validateToken, getSeguimientoTroncal);
router.post('/insert', validateToken, insertTroncal);
router.post('/update', validateToken, updateTroncal);


export default router;