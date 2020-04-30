import { Router } from 'express';

import UsuarioController from '../controller/index';
import CheckToken from '../../../config/auth/CheckToken';

const router = new Router();

router.post('/api/auth/token', UsuarioController.getToken);

router.use(CheckToken);

router.get('/api/usuarios', UsuarioController.findAll);
router.get('/api/usuarios/:id', UsuarioController.findById);

export default router;