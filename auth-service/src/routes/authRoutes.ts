import { checkAuth } from '@services/checkAuth'
import { getAuthUsers } from '@services/getAuthUsers'
import { login } from '@services/login'
import { logout } from '@services/logout'
import { register } from '@services/register'
import { authMiddleware } from '@src/middlewares/authMiddleware'
import { Router } from 'express'

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', checkAuth);
router.get('/authUsers', authMiddleware, getAuthUsers);
router.post('/logout', logout);

export default router;
