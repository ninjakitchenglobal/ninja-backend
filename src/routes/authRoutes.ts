import { Router } from 'express';
//IMPOTTING CONTROLLERS
import { getUser, login, register } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/user-register', register);
authRouter.post('/user-login', login);
authRouter.get('/get-user/:userId', getUser);

export default authRouter;
