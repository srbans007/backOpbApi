import { Router } from 'express';
import { getBuscarGuia, getDatosGuiaRuta, getTroncal, insertTroncal } from '../controllers/cargaTroncal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTroncal)
router.get('/buscar', validateToken, getBuscarGuia);
router.get('/guiaRuta', validateToken, getDatosGuiaRuta);
router.post('/insert', validateToken, insertTroncal);


export default router;