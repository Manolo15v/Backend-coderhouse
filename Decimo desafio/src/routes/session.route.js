import { Router } from 'express'
import sessionController from '../controllers/session.controller.js'
import authSession from '../middlewares/auth.middleware.js';

const router = Router();

const { getLogin, getLogout, postLogin } = sessionController

router.get('/login',authSession, getLogin);

router.get('/logout', getLogout);

router.post('/login', postLogin);
   
export default router